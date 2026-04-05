"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  Globe,
  Smartphone,
  Cloud,
  Palette,
  BarChart3,
  Cpu,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    number: "01",
    title: "Web Development",
    desc: "High-performance web applications built with modern frameworks, optimized for speed, SEO, and global scale. We architect systems that handle millions of requests without breaking a sweat.",
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
    metric: "3×",
    metricLabel: "faster load times",
    stat1: { value: "150+", label: "Apps shipped" },
    stat2: { value: "99ms", label: "Avg. response" },
  },
  {
    icon: Smartphone,
    number: "02",
    title: "Mobile Applications",
    desc: "Native and cross-platform mobile apps for iOS and Android that deliver seamless user experiences — from onboarding to daily engagement loops that keep users coming back.",
    tags: ["Flutter", "React Native", "Swift", "Kotlin"],
    metric: "4.9★",
    metricLabel: "avg. store rating",
    stat1: { value: "80+", label: "Apps launched" },
    stat2: { value: "2M+", label: "Active users" },
  },
  {
    icon: Cloud,
    number: "03",
    title: "Cloud & DevOps",
    desc: "Scalable cloud infrastructure, CI/CD pipelines, and DevOps practices for reliable, zero-downtime deployments. Your stack, monitored 24/7 and auto-scaling with demand.",
    tags: ["AWS", "Docker", "Kubernetes", "Terraform"],
    metric: "99.9%",
    metricLabel: "uptime SLA",
    stat1: { value: "500+", label: "Pipelines built" },
    stat2: { value: "0", label: "Missed SLAs" },
  },
  {
    icon: Palette,
    number: "04",
    title: "UI/UX Design",
    desc: "Research-driven design systems and interfaces that convert visitors into loyal customers. Every pixel is intentional, every flow is validated with real users before a line of code is written.",
    tags: ["Figma", "Design Systems", "Prototyping", "Research"],
    metric: "+62%",
    metricLabel: "conversion lift",
    stat1: { value: "40+", label: "Design systems" },
    stat2: { value: "3.2×", label: "Avg. ROI" },
  },
  {
    icon: BarChart3,
    number: "05",
    title: "ERP & Business Systems",
    desc: "End-to-end enterprise resource planning systems tailored to your business workflows. From billing to inventory to HR — unified, automated, and built to scale with your team.",
    tags: ["Custom ERP", "CRM", "Analytics", "Dashboards"],
    metric: "40%",
    metricLabel: "cost reduction",
    stat1: { value: "25+", label: "ERPs deployed" },
    stat2: { value: "60%", label: "Less admin time" },
  },
  {
    icon: Cpu,
    number: "06",
    title: "AI & Automation",
    desc: "Intelligent automation, machine learning integrations, and AI-powered features that give you a measurable edge. From document parsing to predictive analytics — we ship AI that actually works.",
    tags: ["Python", "TensorFlow", "OpenAI", "Automation"],
    metric: "10×",
    metricLabel: "productivity gain",
    stat1: { value: "30+", label: "AI tools built" },
    stat2: { value: "85%", label: "Task automation" },
  },
];

/* ── Cursor-tracked spotlight ── */
function Spotlight({ active }: { active: boolean }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el || !active) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [active]);

  return (
    <div
      ref={panelRef}
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-r-2xl"
      style={{
        background: active
          ? `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(9,186,207,0.07) 0%, transparent 70%)`
          : "none",
        transition: "background 0.1s",
      }}
    />
  );
}

/* ── Animated progress ring ── */
function Ring({ value, label }: { value: string; label: string }) {
  const circumference = 2 * Math.PI * 26;
  const pct =
    parseFloat(value.replace(/[^0-9.]/g, "")) /
    (value.includes("%") ? 100 : value.includes("★") ? 5 : 10);
  const offset = circumference * (1 - Math.min(pct, 1));

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="26" fill="none" stroke="#f0f0ee" strokeWidth="3" />
          <motion.circle
            cx="30"
            cy="30"
            r="26"
            fill="none"
            stroke="#09BACF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-black text-gray-900 leading-none">{value}</span>
        </div>
      </div>
      <span className="text-[11px] text-gray-400 text-center leading-tight max-w-[72px]">{label}</span>
    </div>
  );
}

/* ── Section ── */
export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const current = services[active];
  const Icon = current.icon;

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[#09BACF] text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            >
              What We Do
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl font-black text-gray-950 leading-[0.95] tracking-tight"
            >
              Services built
              <br />
              <span className="text-gray-300">for the world.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-xs leading-relaxed text-sm lg:text-right"
          >
            From concept to deployment, we cover every layer of the digital
            stack with precision and craft.
          </motion.p>
        </div>

        {/* ── Main split layout ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="flex flex-col lg:flex-row border border-gray-100 rounded-2xl overflow-hidden min-h-[560px]"
        >

          {/* LEFT — accordion list */}
          <div className="lg:w-[42%] border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col">
            {services.map((s, i) => {
              const SIcon = s.icon;
              const isActive = active === i;
              return (
                <motion.button
                  key={s.number}
                  onClick={() => setActive(i)}
                  className={`relative flex items-center gap-4 px-6 py-5 text-left transition-colors duration-300 border-b border-gray-50 last:border-b-0 focus:outline-none group ${
                    isActive ? "bg-gray-950" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {/* Active left bar */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#09BACF] rounded-r-full"
                    initial={false}
                    animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon bubble */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      isActive
                        ? "bg-[#09BACF]/20"
                        : "bg-gray-100 group-hover:bg-[#09BACF]/10"
                    }`}
                  >
                    <SIcon
                      className={`w-4 h-4 transition-colors duration-300 ${
                        isActive ? "text-[#09BACF]" : "text-gray-400 group-hover:text-[#09BACF]"
                      }`}
                    />
                  </div>

                  {/* Title + number */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-[11px] font-bold tracking-widest uppercase mb-0.5 transition-colors duration-300 ${
                        isActive ? "text-[#09BACF]" : "text-gray-300"
                      }`}
                    >
                      {s.number}
                    </p>
                    <p
                      className={`font-black text-base leading-tight transition-colors duration-300 ${
                        isActive ? "text-white" : "text-gray-800 group-hover:text-gray-950"
                      }`}
                    >
                      {s.title}
                    </p>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    animate={{ x: isActive ? 2 : 0, opacity: isActive ? 1 : 0.3 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronRight
                      className={`w-4 h-4 flex-shrink-0 transition-colors duration-300 ${
                        isActive ? "text-[#09BACF]" : "text-gray-300"
                      }`}
                    />
                  </motion.div>
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT — spotlight detail panel */}
          <div className="relative lg:flex-1 overflow-hidden">
            <Spotlight active={true} />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 h-full flex flex-col p-8 sm:p-10"
              >
                {/* Top: icon + metric */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="w-14 h-14 rounded-2xl bg-[#09BACF]/10 flex items-center justify-center"
                    >
                      <Icon className="w-6 h-6 text-[#09BACF]" />
                    </motion.div>
                    <div>
                      <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-1">
                        {current.number}
                      </p>
                      <h3 className="font-black text-2xl sm:text-3xl text-gray-950 leading-tight">
                        {current.title}
                      </h3>
                    </div>
                  </div>

                  {/* Big metric */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="text-right flex-shrink-0"
                  >
                    <p className="font-black text-4xl sm:text-5xl text-gray-950 leading-none">
                      {current.metric}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{current.metricLabel}</p>
                  </motion.div>
                </div>

                {/* Desc */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.18 }}
                  className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 max-w-lg"
                >
                  {current.desc}
                </motion.p>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.22 }}
                  className="flex flex-wrap gap-2 mb-10"
                >
                  {current.tags.map((tag, ti) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.22 + ti * 0.05, duration: 0.3 }}
                      className="px-3 py-1.5 text-xs font-semibold rounded-full border border-gray-100 bg-gray-50 text-gray-500"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Bottom: stats + CTA */}
                <div className="mt-auto flex items-end justify-between gap-6 flex-wrap">
                  {/* Stat pair with rings */}
                  <div className="flex items-center gap-6">
                    <Ring value={current.stat1.value} label={current.stat1.label} />
                    <div className="w-px h-12 bg-gray-100" />
                    <Ring value={current.stat2.value} label={current.stat2.label} />
                  </div>

                  {/* CTA */}
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.04, backgroundColor: "#09BACF" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gray-950 text-white text-sm font-bold whitespace-nowrap"
                  >
                    Start a project
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.a>
                </div>

                {/* Decorative step dots */}
                <div className="flex items-center gap-2 mt-8">
                  {services.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className="focus:outline-none"
                    >
                      <motion.div
                        animate={{
                          width: active === i ? 24 : 6,
                          backgroundColor: active === i ? "#09BACF" : "#e5e5e2",
                        }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="h-1.5 rounded-full"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-gray-100"
        >
          <p className="text-gray-400 text-sm max-w-sm text-center sm:text-left leading-relaxed">
            Not sure what you need?{" "}
            <span className="text-gray-700 font-semibold">
              Book a free discovery call
            </span>{" "}
            and we'll map out the right solution together.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, backgroundColor: "#09BACF" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-950 text-white text-sm font-bold transition-colors duration-300 whitespace-nowrap"
          >
            Let's talk
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}