import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const projects = [
  {
    number: "01",
    title: "Nymara",
    category: "E-Commerce Platform",
    description: "React · Node.js · MongoDB",
    year: "2024",
    src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
    ctaText: "View Project",
    ctaLink: "#",
    tags: ["React", "Node.js", "MongoDB"],
    content: () => (
      <p>
        A luxury lab-grown diamond e-commerce platform with seamless checkout,
        product discovery, and a premium shopping experience. Built to handle
        high-traffic product browsing with real-time inventory sync.
        <br />
        <br />
        The platform features an immersive 3D diamond viewer, AI-powered
        recommendation engine, and a bespoke CMS for collection management —
        all wrapped in an ultra-refined visual language that matches the luxury
        market.
      </p>
    ),
  },
  {
    number: "02",
    title: "FinTrack Pro",
    category: "FinTech Dashboard",
    description: "Next.js · Python · AWS",
    year: "2024",
    src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
    ctaText: "View Project",
    ctaLink: "#",
    tags: ["Next.js", "Python", "AWS"],
    content: () => (
      <p>
        Real-time financial analytics dashboard serving 50,000+ users across 12
        countries with live data visualization. Handles millions of transactions
        per day with sub-100ms query response times.
        <br />
        <br />
        Features include multi-currency support, predictive cash flow modeling,
        and role-based access across enterprise teams — all delivered through
        a clean, data-dense interface designed for power users.
      </p>
    ),
  },
  {
    number: "03",
    title: "MediCore ERP",
    category: "Healthcare System",
    description: "React · PostgreSQL · Docker",
    year: "2023",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
    ctaText: "View Project",
    ctaLink: "#",
    tags: ["React", "PostgreSQL", "Docker"],
    content: () => (
      <p>
        End-to-end hospital management ERP handling patient records, billing,
        inventory, and staff scheduling across a network of 14 clinics. Fully
        HIPAA-compliant with role-based access control and audit logging.
        <br />
        <br />
        Reduced administrative overhead by 40% and virtually eliminated
        billing errors through smart validation workflows and integrated
        insurance claim automation.
      </p>
    ),
  },
  {
    number: "04",
    title: "LogiFlow",
    category: "Logistics Platform",
    description: "Flutter · Python · Kubernetes",
    year: "2023",
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
    ctaText: "View Project",
    ctaLink: "#",
    tags: ["Flutter", "Python", "Kubernetes"],
    content: () => (
      <p>
        AI-powered logistics optimization platform reducing delivery costs by
        35% for a global supply chain company operating across 6 continents.
        Routes are dynamically recalculated using live traffic, weather, and
        capacity data.
        <br />
        <br />
        The mobile-first driver app (Flutter) integrates directly with the
        dispatch engine, enabling real-time re-routing and seamless proof-of-
        delivery capture — all offline-capable.
      </p>
    ),
  },
];

export const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-black"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);

function useOutsideClick(
  ref: React.RefObject<HTMLDivElement | null>,
  callback: () => void
) {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      callback();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
}

export function WorkSection() {
  const [active, setActive] = useState<(typeof projects)[number] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[#09BACF] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Our Work
            </p>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-950 leading-[0.95] tracking-tight">
              Projects that
              <br />
              <span className="text-gray-300 dark:text-neutral-600">speak for us.</span>
            </h2>
          </div>
          <a
            href="/work"
            className="group inline-flex items-center gap-2 text-gray-950 font-semibold hover:text-[#09BACF] transition-colors text-sm flex-shrink-0"
          >
            View all projects
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>

        {/* Overlay backdrop */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 h-full w-full z-10"
            />
          )}
        </AnimatePresence>

        {/* Expanded card modal */}
        <AnimatePresence>
          {active && (
            <div className="fixed inset-0 grid place-items-center z-[100]">
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-white rounded-full h-8 w-8 shadow"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>

              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-[540px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white sm:rounded-3xl overflow-hidden shadow-2xl"
              >
                {/* Image */}
                <motion.div layoutId={`image-${active.title}-${id}`}>
                  <img
                    src={active.src}
                    alt={active.title}
                    className="w-full h-72 object-cover object-center"
                  />
                </motion.div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <motion.span
                          layoutId={`number-${active.title}-${id}`}
                          className="text-[#09BACF] font-black text-4xl leading-none"
                        >
                          {active.number}
                        </motion.span>
                        <motion.h3
                          layoutId={`title-${active.title}-${id}`}
                          className="font-black text-2xl text-gray-950"
                        >
                          {active.title}
                        </motion.h3>
                      </div>
                      <motion.p
                        layoutId={`category-${active.title}-${id}`}
                        className="text-xs font-medium text-gray-400 uppercase tracking-widest"
                      >
                        {active.category}
                      </motion.p>
                    </div>

                    <motion.a
                      layoutId={`button-${active.title}-${id}`}
                      href={active.ctaLink}
                      target="_blank"
                      className="px-4 py-2 text-sm rounded-full font-bold bg-[#09BACF] text-white hover:bg-[#07a8bc] transition-colors whitespace-nowrap"
                    >
                      {active.ctaText}
                    </motion.a>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {active.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-400 text-xs rounded-full font-mono">
                      {active.year}
                    </span>
                  </div>

                  {/* Description */}
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-sm leading-relaxed h-40 md:h-fit pb-4 overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Project list */}
        <ul className="w-full divide-y divide-gray-100">
          {projects.map((project) => (
            <motion.div
              layoutId={`card-${project.title}-${id}`}
              key={`card-${project.title}-${id}`}
              onClick={() => setActive(project)}
              className="group flex flex-col md:flex-row md:items-center gap-4 py-8 cursor-pointer hover:bg-neutral-50 rounded-2xl px-4 -mx-4 transition-colors duration-200"
            >
              {/* Number + Image */}
              <div className="flex items-center gap-5 flex-shrink-0">
                <motion.span
                  layoutId={`number-${project.title}-${id}`}
                  className="font-black text-4xl sm:text-5xl leading-none text-gray-200 group-hover:text-[#09BACF] transition-colors duration-300 w-14 text-right"
                >
                  {project.number}
                </motion.span>
                <motion.div layoutId={`image-${project.title}-${id}`}>
                  <img
                    src={project.src}
                    alt={project.title}
                    className="h-14 w-14 rounded-xl object-cover object-center flex-shrink-0"
                  />
                </motion.div>
              </div>

              {/* Title + category */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-3 mb-1">
                  <motion.h3
                    layoutId={`title-${project.title}-${id}`}
                    className="font-black text-2xl sm:text-3xl text-gray-950 leading-tight"
                  >
                    {project.title}
                  </motion.h3>
                  <motion.span
                    layoutId={`category-${project.title}-${id}`}
                    className="text-xs font-medium text-gray-400 uppercase tracking-widest border border-gray-200 rounded-full px-2.5 py-0.5"
                  >
                    {project.category}
                  </motion.span>
                </div>
                <p className="text-sm text-gray-400">{project.description}</p>
              </div>

              {/* Tags */}
              <div className="hidden lg:flex flex-wrap gap-1.5 w-44 flex-shrink-0">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Year + CTA button */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="text-gray-300 text-sm font-mono hidden sm:block">{project.year}</span>
                <motion.button
                  layoutId={`button-${project.title}-${id}`}
                  className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-[#09BACF] hover:text-white text-gray-600 transition-colors duration-200"
                >
                  {project.ctaText}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default WorkSection;