import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as THREE from "three";

// ============================================================================
// Utility
// ============================================================================

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ============================================================================
// Types
// ============================================================================

export interface GlobeMarker {
  lat: number;
  lng: number;
  src: string;
  label?: string;
  size?: number;
}

export interface Globe3DConfig {
  radius?: number;
  globeColor?: string;
  textureUrl?: string;
  bumpMapUrl?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereIntensity?: number;
  atmosphereBlur?: number;
  bumpScale?: number;
  autoRotateSpeed?: number;
  enableZoom?: boolean;
  enablePan?: boolean;
  minDistance?: number;
  maxDistance?: number;
  initialRotation?: { x: number; y: number };
  markerSize?: number;
  showWireframe?: boolean;
  wireframeColor?: string;
  ambientIntensity?: number;
  pointLightIntensity?: number;
  backgroundColor?: string | null;
}

interface Globe3DProps {
  markers?: GlobeMarker[];
  config?: Globe3DConfig;
  className?: string;
  onMarkerClick?: (marker: GlobeMarker) => void;
  onMarkerHover?: (marker: GlobeMarker | null) => void;
}

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_EARTH_TEXTURE =
  "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg";
const DEFAULT_BUMP_TEXTURE =
  "https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png";

const defaultConfig: Required<Globe3DConfig> = {
  radius: 2,
  globeColor: "#1a1a2e",
  textureUrl: DEFAULT_EARTH_TEXTURE,
  bumpMapUrl: DEFAULT_BUMP_TEXTURE,
  showAtmosphere: false,
  atmosphereColor: "#4da6ff",
  atmosphereIntensity: 0.5,
  atmosphereBlur: 2,
  bumpScale: 1,
  autoRotateSpeed: 0.3,
  enableZoom: false,
  enablePan: false,
  minDistance: 5,
  maxDistance: 15,
  initialRotation: { x: 0, y: 0 },
  markerSize: 0.06,
  showWireframe: false,
  wireframeColor: "#4a9eff",
  ambientIntensity: 0.6,
  pointLightIntensity: 1.5,
  backgroundColor: null,
};

// ============================================================================
// Helpers
// ============================================================================

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function buildAtmosphereMaterial(
  color: string,
  intensity: number,
  blur: number,
): THREE.ShaderMaterial {
  const fresnelPower = Math.max(0.5, 5 - blur);
  return new THREE.ShaderMaterial({
    uniforms: {
      atmosphereColor: { value: new THREE.Color(color) },
      intensity: { value: intensity },
      fresnelPower: { value: fresnelPower },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 atmosphereColor;
      uniform float intensity;
      uniform float fresnelPower;
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        float fresnel = pow(1.0 - abs(dot(vNormal, normalize(-vPosition))), fresnelPower);
        gl_FragColor = vec4(atmosphereColor, fresnel * intensity);
      }
    `,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
  });
}

// ============================================================================
// Minimal Orbit Controls (no dependency)
// ============================================================================

class SimpleOrbitControls {
  private camera: THREE.PerspectiveCamera;
  private domElement: HTMLElement;
  enableZoom: boolean;
  enablePan: boolean;
  minDistance: number;
  maxDistance: number;
  rotateSpeed: number;
  autoRotate: boolean;
  autoRotateSpeed: number;
  dampingFactor: number;

  private spherical: THREE.Spherical;
  private sphericalDelta: THREE.Spherical;
  private scale = 1;
  private isDragging = false;
  private prevMouse = { x: 0, y: 0 };
  private touchPrev: { x: number; y: number } | null = null;
  private target = new THREE.Vector3();

  constructor(
    camera: THREE.PerspectiveCamera,
    domElement: HTMLElement,
    opts: {
      enableZoom?: boolean;
      enablePan?: boolean;
      minDistance?: number;
      maxDistance?: number;
      autoRotate?: boolean;
      autoRotateSpeed?: number;
    } = {},
  ) {
    this.camera = camera;
    this.domElement = domElement;
    this.enableZoom = opts.enableZoom ?? true;
    this.enablePan = opts.enablePan ?? false;
    this.minDistance = opts.minDistance ?? 3;
    this.maxDistance = opts.maxDistance ?? 20;
    this.autoRotate = opts.autoRotate ?? false;
    this.autoRotateSpeed = opts.autoRotateSpeed ?? 0.3;
    this.rotateSpeed = 0.4;
    this.dampingFactor = 0.1;

    this.spherical = new THREE.Spherical().setFromVector3(camera.position);
    this.sphericalDelta = new THREE.Spherical(0, 0, 0);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);

    domElement.addEventListener("mousedown", this.onMouseDown);
    domElement.addEventListener("mousemove", this.onMouseMove);
    domElement.addEventListener("mouseup", this.onMouseUp);
    domElement.addEventListener("mouseleave", this.onMouseUp);
    domElement.addEventListener("wheel", this.onWheel, { passive: false });
    domElement.addEventListener("touchstart", this.onTouchStart, { passive: false });
    domElement.addEventListener("touchmove", this.onTouchMove, { passive: false });
    domElement.addEventListener("touchend", this.onTouchEnd);
  }

  private onMouseDown(e: MouseEvent) {
    this.isDragging = true;
    this.prevMouse = { x: e.clientX, y: e.clientY };
  }

  private onMouseMove(e: MouseEvent) {
    if (!this.isDragging) return;
    const dx = e.clientX - this.prevMouse.x;
    const dy = e.clientY - this.prevMouse.y;
    this.prevMouse = { x: e.clientX, y: e.clientY };
    this.sphericalDelta.theta -=
      (2 * Math.PI * dx * this.rotateSpeed) / this.domElement.clientWidth;
    this.sphericalDelta.phi -=
      (2 * Math.PI * dy * this.rotateSpeed) / this.domElement.clientHeight;
  }

  private onMouseUp() {
    this.isDragging = false;
  }

  private onWheel(e: WheelEvent) {
    if (!this.enableZoom) return;
    e.preventDefault();
    this.scale *= e.deltaY > 0 ? 1.1 : 1 / 1.1;
  }

  private onTouchStart(e: TouchEvent) {
    if (e.touches.length === 1) {
      this.isDragging = true;
      this.touchPrev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }

  private onTouchMove(e: TouchEvent) {
    e.preventDefault();
    if (!this.isDragging || e.touches.length !== 1 || !this.touchPrev) return;
    const dx = e.touches[0].clientX - this.touchPrev.x;
    const dy = e.touches[0].clientY - this.touchPrev.y;
    this.touchPrev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    this.sphericalDelta.theta -=
      (2 * Math.PI * dx * this.rotateSpeed) / this.domElement.clientWidth;
    this.sphericalDelta.phi -=
      (2 * Math.PI * dy * this.rotateSpeed) / this.domElement.clientHeight;
  }

  private onTouchEnd() {
    this.isDragging = false;
    this.touchPrev = null;
  }

  update() {
    if (this.autoRotate && !this.isDragging) {
      // Convert autoRotateSpeed (degrees/sec-ish) to radians per frame at ~60fps
      this.sphericalDelta.theta -= (2 * Math.PI * this.autoRotateSpeed * 0.01) / 60;
    }

    this.spherical.theta += this.sphericalDelta.theta * this.dampingFactor * 10;
    this.spherical.phi += this.sphericalDelta.phi * this.dampingFactor * 10;
    this.spherical.phi = Math.max(0.05, Math.min(Math.PI - 0.05, this.spherical.phi));
    this.spherical.radius *= this.scale;
    this.spherical.radius = Math.max(
      this.minDistance,
      Math.min(this.maxDistance, this.spherical.radius),
    );

    this.sphericalDelta.theta *= 1 - this.dampingFactor;
    this.sphericalDelta.phi *= 1 - this.dampingFactor;
    this.scale = 1;

    this.camera.position.setFromSpherical(this.spherical).add(this.target);
    this.camera.lookAt(this.target);
  }

  dispose() {
    this.domElement.removeEventListener("mousedown", this.onMouseDown);
    this.domElement.removeEventListener("mousemove", this.onMouseMove);
    this.domElement.removeEventListener("mouseup", this.onMouseUp);
    this.domElement.removeEventListener("mouseleave", this.onMouseUp);
    this.domElement.removeEventListener("wheel", this.onWheel);
    this.domElement.removeEventListener("touchstart", this.onTouchStart);
    this.domElement.removeEventListener("touchmove", this.onTouchMove);
    this.domElement.removeEventListener("touchend", this.onTouchEnd);
  }
}

// ============================================================================
// Overlay state type
// ============================================================================

interface MarkerOverlayState {
  marker: GlobeMarker;
  x: number;
  y: number;
  visible: boolean;
  hovered: boolean;
}

// ============================================================================
// Main Globe3D Component
// ============================================================================

export function Globe3D({
  markers = [],
  config = {},
  className,
  onMarkerClick,
  onMarkerHover,
}: Globe3DProps) {
  const cfg = useMemo(() => ({ ...defaultConfig, ...config }), [config]);

  const mountRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const hoveredIndexRef = useRef<number | null>(null);
  const mouseRef = useRef(new THREE.Vector2());

  const [overlays, setOverlays] = useState<MarkerOverlayState[]>([]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    mount.appendChild(renderer.domElement);

    // ── Scene ─────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    if (cfg.backgroundColor) scene.background = new THREE.Color(cfg.backgroundColor);

    // ── Camera ────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, cfg.radius * 3.5);
    camera.lookAt(0, 0, 0);

    // ── Lights ────────────────────────────────────────────────────────────
    // Intentionally lower intensities — ACESFilmic tone mapping + sRGB output
    // means the original defaultConfig values (0.6 ambient, 1.5 dir) blow out the texture
    scene.add(new THREE.AmbientLight(0xffffff, cfg.ambientIntensity * 0.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, cfg.pointLightIntensity * 0.6);
    dirLight.position.set(cfg.radius * 5, cfg.radius * 2, cfg.radius * 5);
    scene.add(dirLight);
    const fillLight = new THREE.DirectionalLight(0x88ccff, cfg.pointLightIntensity * 0.15);
    fillLight.position.set(-cfg.radius * 3, cfg.radius, -cfg.radius * 2);
    scene.add(fillLight);

    // ── Globe group (markers rotate with it) ──────────────────────────────
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Globe mesh
    const sphereGeo = new THREE.SphereGeometry(cfg.radius, 64, 64);
    // MeshPhongMaterial renders the NASA Blue Marble diffuse color faithfully
    // without PBR energy conservation that tends to darken/desaturate at low metalness
    const globeMat = new THREE.MeshPhongMaterial({ shininess: 5 });
    globeGroup.add(new THREE.Mesh(sphereGeo, globeMat));

    const texLoader = new THREE.TextureLoader();
    texLoader.load(cfg.textureUrl, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 16;
      globeMat.map = tex;
      globeMat.needsUpdate = true;
    });
    texLoader.load(cfg.bumpMapUrl, (tex) => {
      tex.anisotropy = 8;
      globeMat.bumpMap = tex;
      globeMat.bumpScale = cfg.bumpScale * 0.05;
      globeMat.needsUpdate = true;
    });

    // Wireframe
    if (cfg.showWireframe) {
      const wfGeo = new THREE.SphereGeometry(cfg.radius * 1.002, 32, 16);
      const wfMat = new THREE.MeshBasicMaterial({
        color: cfg.wireframeColor,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      });
      globeGroup.add(new THREE.Mesh(wfGeo, wfMat));
    }

    // Atmosphere (not inside globeGroup — stays static)
    if (cfg.showAtmosphere) {
      const atmMesh = new THREE.Mesh(
        new THREE.SphereGeometry(cfg.radius, 64, 32),
        buildAtmosphereMaterial(cfg.atmosphereColor, cfg.atmosphereIntensity, cfg.atmosphereBlur),
      );
      atmMesh.scale.setScalar(1.12);
      scene.add(atmMesh);
    }

    // ── Markers ───────────────────────────────────────────────────────────
    type MarkerMats = { line: THREE.MeshBasicMaterial; cone: THREE.MeshBasicMaterial };
    const markerMats: MarkerMats[] = [];
    const hitSpheres: THREE.Mesh[] = [];

    markers.forEach((marker) => {
      const surfacePos = latLngToVector3(marker.lat, marker.lng, cfg.radius * 1.001);
      const topPos = latLngToVector3(marker.lat, marker.lng, cfg.radius * 1.18);

      const direction = topPos.clone().sub(surfacePos).normalize();
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction,
      );
      const lineCenter = surfacePos.clone().lerp(topPos, 0.5);
      const lineHeight = topPos.distanceTo(surfacePos);

      // Cylinder (pin line)
      const lineMat = new THREE.MeshBasicMaterial({
        color: "#94a3b8",
        transparent: true,
        opacity: 0.6,
      });
      const lineMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.003, 0.003, lineHeight, 8),
        lineMat,
      );
      lineMesh.position.copy(lineCenter);
      lineMesh.setRotationFromQuaternion(quaternion);
      globeGroup.add(lineMesh);

      // Cone (pin head)
      const coneMat = new THREE.MeshBasicMaterial({ color: "#ef4444" });
      const coneMesh = new THREE.Mesh(new THREE.ConeGeometry(0.015, 0.04, 8), coneMat);
      coneMesh.position.copy(surfacePos);
      coneMesh.setRotationFromQuaternion(quaternion);
      globeGroup.add(coneMesh);

      markerMats.push({ line: lineMat, cone: coneMat });

      // Invisible hit sphere at top (for raycasting)
      const hitMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 8, 8),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      hitMesh.position.copy(topPos);
      hitMesh.userData.markerIndex = hitSpheres.length;
      globeGroup.add(hitMesh);
      hitSpheres.push(hitMesh);
    });

    // ── Orbit Controls ────────────────────────────────────────────────────
    const controls = new SimpleOrbitControls(camera, renderer.domElement, {
      enableZoom: cfg.enableZoom,
      enablePan: cfg.enablePan,
      minDistance: cfg.minDistance,
      maxDistance: cfg.maxDistance,
      autoRotate: cfg.autoRotateSpeed > 0,
      autoRotateSpeed: cfg.autoRotateSpeed,
    });

    // ── Mouse tracking ────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();

    const onMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const cx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const cy = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(new THREE.Vector2(cx, cy), camera);
      const hits = raycaster.intersectObjects(hitSpheres);
      if (hits.length > 0) {
        const idx = hits[0].object.userData.markerIndex as number;
        onMarkerClick?.(markers[idx]);
      }
    };

    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("click", onClick);

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // ── Animation loop ────────────────────────────────────────────────────
    const tmpWorld = new THREE.Vector3();
    const tmpProj = new THREE.Vector3();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);

      const w = renderer.domElement.clientWidth;
      const h = renderer.domElement.clientHeight;

      // Raycaster hover
      raycaster.setFromCamera(mouseRef.current, camera);
      const hoverHits = raycaster.intersectObjects(hitSpheres);
      const newHoverIdx =
        hoverHits.length > 0 ? (hoverHits[0].object.userData.markerIndex as number) : null;
      if (newHoverIdx !== hoveredIndexRef.current) {
        hoveredIndexRef.current = newHoverIdx;
        onMarkerHover?.(newHoverIdx !== null ? markers[newHoverIdx] : null);
      }

      // Project markers to screen + update materials
      const next: MarkerOverlayState[] = markers.map((marker, i) => {
        hitSpheres[i].getWorldPosition(tmpWorld);

        // Visibility: is this side facing the camera?
        const markerDir = tmpWorld.clone().normalize();
        const cameraDir = camera.position.clone().normalize();
        const visible = markerDir.dot(cameraDir) > 0.1;

        // Screen projection
        tmpProj.copy(tmpWorld).project(camera);
        const x = ((tmpProj.x + 1) / 2) * w;
        const y = ((-tmpProj.y + 1) / 2) * h;

        const hovered = hoveredIndexRef.current === i;

        // Update 3D pin materials for hover
        markerMats[i].line.color.set(hovered ? "#ffffff" : "#94a3b8");
        markerMats[i].line.opacity = hovered ? 0.9 : 0.6;
        markerMats[i].cone.color.set(hovered ? "#f97316" : "#ef4444");

        return { marker, x, y, visible, hovered };
      });

      setOverlays(next);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      controls.dispose();
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("click", onClick);
      ro.disconnect();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cfg, markers]);

  return (
    <div className={cn("relative h-[500px] w-full overflow-hidden", className)}>
      {/* Three.js WebGL canvas */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* HTML marker overlays — projected each frame */}
      {overlays.map((o, i) => (
        <div
          key={`overlay-${i}`}
          className="pointer-events-none absolute"
          style={{
            left: o.x,
            top: o.y,
            transform: "translate(-50%, -50%)",
            opacity: o.visible ? 1 : 0,
            transition: "opacity 0.15s ease-out",
            pointerEvents: o.visible ? "auto" : "none",
          }}
        >
          <div
            className={cn(
              "cursor-pointer overflow-hidden rounded-full bg-neutral-900 shadow-lg transition-transform duration-200",
              o.hovered ? "scale-125 shadow-xl ring-1 ring-white/50" : undefined,
            )}
            style={{ width: "8px", height: "8px" }}
            onMouseEnter={() => {
              hoveredIndexRef.current = i;
              onMarkerHover?.(o.marker);
            }}
            onMouseLeave={() => {
              hoveredIndexRef.current = null;
              onMarkerHover?.(null);
            }}
            onClick={() => onMarkerClick?.(o.marker)}
          >
            <img
              src={o.marker.src}
              alt={o.marker.label || "Marker"}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Globe3D;