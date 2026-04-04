"use client";
import { useEffect, useRef, useState } from "react";
import {
  Color,
  Scene,
  Fog,
  PerspectiveCamera,
  Vector3,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  PointLight,
} from "three";
import ThreeGlobe from "three-globe";
import countries from "../data/globe.json";

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

export function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr: number[] = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (!arr.includes(r)) arr.push(r);
  }
  return arr;
}

export function World({ globeConfig, data }: WorldProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const globeRef = useRef<ThreeGlobe | null>(null);
  const frameIdRef = useRef<number>(0);
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    autoRotate: true,
    autoRotateSpeed: 1,
    ambientLight: "#ffffff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    ...globeConfig,
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new Scene();
    scene.fog = new Fog(0xffffff, 400, 2000);

    // Camera
    const camera = new PerspectiveCamera(50, width / height, 180, 1800);
    camera.position.z = cameraZ;

    // Renderer
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new AmbientLight(
      new Color(defaultProps.ambientLight),
      0.6
    );
    scene.add(ambientLight);

    const dirLeft = new DirectionalLight(
      new Color(defaultProps.directionalLeftLight),
      1
    );
    dirLeft.position.copy(new Vector3(-400, 100, 400));
    scene.add(dirLeft);

    const dirTop = new DirectionalLight(
      new Color(defaultProps.directionalTopLight),
      1
    );
    dirTop.position.copy(new Vector3(-200, 500, 200));
    scene.add(dirTop);

    const ptLight = new PointLight(new Color(defaultProps.pointLight), 0.8);
    ptLight.position.copy(new Vector3(-200, 500, 200));
    scene.add(ptLight);

    // Globe
    const globe = new ThreeGlobe();
    globeRef.current = globe;
    scene.add(globe);

    // Material
    const globeMaterial = globe.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    globeMaterial.color = new Color(defaultProps.globeColor);
    globeMaterial.emissive = new Color(defaultProps.emissive);
    globeMaterial.emissiveIntensity = defaultProps.emissiveIntensity;
    globeMaterial.shininess = defaultProps.shininess;

    // Data
    const arcs = data;
    const points: {
      size: number;
      order: number;
      color: string;
      lat: number;
      lng: number;
    }[] = [];

    for (const arc of arcs) {
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex(
          (v2) => v2.lat === v.lat && v2.lng === v.lng
        ) === i
    );

    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    globe
      .arcsData(data)
      .arcStartLat((d) => (d as Position).startLat)
      .arcStartLng((d) => (d as Position).startLng)
      .arcEndLat((d) => (d as Position).endLat)
      .arcEndLng((d) => (d as Position).endLng)
      .arcColor((e: any) => (e as Position).color)
      .arcAltitude((e) => (e as Position).arcAlt)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e) => (e as Position).order)
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    globe
      .pointsData(filteredPoints)
      .pointColor((e) => (e as { color: string }).color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    globe
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings
      );

    // Rings interval
    const ringsInterval = setInterval(() => {
      if (!globeRef.current) return;
      const newNumbers = genRandomNumbers(
        0,
        data.length,
        Math.floor((data.length * 4) / 5)
      );
      const ringsData = data
        .filter((_, i) => newNumbers.includes(i))
        .map((d) => ({ lat: d.startLat, lng: d.startLng, color: d.color }));
      globeRef.current.ringsData(ringsData);
    }, 2000);

    // Auto-rotate state
    let rotationSpeed = ((defaultProps.autoRotateSpeed ?? 1) * 0.01 * Math.PI) / 180;
    let phi = Math.PI / 2; // polar angle (latitude: equator)
    let theta = 0; // azimuthal angle (longitude)

    // Orbit controls (manual implementation)
    const minPolarAngle = Math.PI / 3.5;
    const maxPolarAngle = Math.PI - Math.PI / 3;

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - previousMouse.current.x;
      const dy = e.clientY - previousMouse.current.y;
      theta -= dx * 0.005;
      phi -= dy * 0.005;
      phi = Math.max(minPolarAngle, Math.min(maxPolarAngle, phi));
      previousMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      isDragging.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const dx = e.touches[0].clientX - previousMouse.current.x;
      const dy = e.touches[0].clientY - previousMouse.current.y;
      theta -= dx * 0.005;
      phi -= dy * 0.005;
      phi = Math.max(minPolarAngle, Math.min(maxPolarAngle, phi));
      previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging.current = false;
    };

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    renderer.domElement.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    // Resize handler
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (defaultProps.autoRotate && !isDragging.current) {
        theta += rotationSpeed;
      }

      camera.position.x = cameraZ * Math.sin(phi) * Math.sin(theta);
      camera.position.y = cameraZ * Math.cos(phi);
      camera.position.z = cameraZ * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      clearInterval(ringsInterval);
      cancelAnimationFrame(frameIdRef.current);
      renderer.domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      renderer.domElement.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      globeRef.current = null;
      rendererRef.current = null;
    };
  }, [data, globeConfig]);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}

// Keep World as an alias for drop-in compatibility
export { World as default };