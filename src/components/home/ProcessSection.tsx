import { useState,useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    detail: "1–2 weeks",
    desc: "We deep-dive into your business, users, and goals to define a clear product vision and technical roadmap that sets the foundation for everything ahead.",
    deliverables: [
      "Stakeholder interviews",
      "User research synthesis",
      "Technical feasibility report",
      "Product vision document",
    ],
  },
  {
    number: "02",
    title: "Design",
    detail: "2–3 weeks",
    desc: "Our designers craft pixel-perfect interfaces grounded in user research, brand identity, and conversion principles — tested and refined before a line of code is written.",
    deliverables: [
      "Wireframes & user flows",
      "High-fidelity UI mockups",
      "Prototype & usability testing",
      "Design system & component library",
    ],
  },
  {
    number: "03",
    title: "Build",
    detail: "4–8 weeks",
    desc: "Agile development with weekly demos, rigorous testing, and transparent communication at every sprint — so you always know exactly where things stand.",
    deliverables: [
      "Weekly sprint demos",
      "QA & automated testing",
      "API integration & backend",
      "Staging environment handoff",
    ],
  },
  {
    number: "04",
    title: "Launch & Scale",
    detail: "Ongoing",
    desc: "We deploy, monitor, and continuously improve your product — ensuring it grows with your business, handles real traffic, and evolves with your users.",
    deliverables: [
      "Production deployment",
      "Performance monitoring",
      "Iterative improvements",
      "Dedicated support SLA",
    ],
  },
];

const ProcessSection = () => {
  const [current, setCurrent] = useState(0);
const [isPaused, setIsPaused] = useState(false); 
  const goTo = (i: number) => setCurrent(i);
  const navigate = (dir: number) => {
    const next = current + dir;
    if (next >= 0 && next < steps.length) setCurrent(next);
  };

  useEffect(() => {
  if (isPaused) return;

  const interval = setInterval(() => {
    setCurrent((prev) => (prev + 1) % steps.length);
  }, 4000);

  return () => clearInterval(interval);
}, [isPaused]);

  const active = steps[current];

  return (
    <section 
    onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}
    className="relative bg-white py-20 sm:py-28 px-6 sm:px-12 lg:px-20 overflow-hidden">

      {/* Giant ghost background number */}
      <AnimatePresence mode="wait">
        <motion.span
          key={active.number}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none select-none absolute -top-6 right-0 text-[220px] sm:text-[280px] font-black leading-none text-gray-100"
        >
          {active.number}
        </motion.span>
      </AnimatePresence>

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 4, ease: "linear" }}
          className="text-[#09BACF] text-xs font-bold uppercase tracking-[0.2em] mb-4"
        >
          How We Work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-5xl sm:text-6xl font-black text-gray-950 leading-[0.95] tracking-tight mb-16"
        >
          Our
          <br />
          <span className="text-gray-300">Process</span>
        </motion.h2>

        {/* Step tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 mb-12">
          {steps.map((step, i) => (
            <button
              key={step.number}
              onClick={() => goTo(i)}
              className="relative text-left pt-5 pb-2 pr-6 focus:outline-none group"
            >
              {/* Top border track */}
              <div className="absolute top-0 left-0 right-6 h-0.5 bg-gray-200 overflow-hidden">
                <motion.div
                  className="h-full bg-[#09BACF] origin-left"
                  initial={false}
                  animate={{ scaleX: i === current ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Dot */}
              <motion.div
                className="absolute -top-[5px] left-0 w-2.5 h-2.5 rounded-full"
                animate={{
                  backgroundColor: i === current ? "#09BACF" : "#e2e2de",
                  scale: i === current ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Step number */}
              <motion.p
                animate={{ color: i === current ? "#09BACF" : "#c0c0bc" }}
                transition={{ duration: 0.3 }}
                className="text-[11px] font-bold tracking-[0.15em] uppercase mb-2"
              >
                {step.number}
              </motion.p>

              {/* Step title */}
              <motion.p
                animate={{ color: i === current ? "#0a0a0a" : "#2a2a28" }}
                transition={{ duration: 0.3 }}
                className="font-black text-lg sm:text-xl group-hover:text-[#09BACF] transition-colors duration-200"
              >
                {step.title}
              </motion.p>
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className="min-h-[280px] sm:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16 items-start"
            >
              {/* Description */}
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                {active.desc}
              </p>

              {/* Meta: duration + deliverables */}
              <div className="flex flex-col gap-5">
                {/* Duration badge */}
                <div className="inline-flex items-center gap-2 self-start bg-gray-50 rounded-full px-5 py-2.5 text-sm font-bold text-[#09BACF]">
                  <Clock className="w-4 h-4" />
                  {active.detail}
                </div>

                {/* Deliverables list */}
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  {active.deliverables.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.06,
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-500 border-b border-gray-50 last:border-b-0"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#09BACF] flex-shrink-0" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="mt-12 h-0.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#09BACF] rounded-full"
            animate={{ width: `${((current + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Nav row */}
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={() => navigate(-1)}
            disabled={current === 0}
            className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#09BACF] disabled:opacity-30 disabled:cursor-default transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <span className="text-xs font-bold text-gray-300 tracking-widest">
            0{current + 1}&nbsp;/&nbsp;0{steps.length}
          </span>

          <button
            onClick={() => navigate(1)}
            disabled={current === steps.length - 1}
            className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#09BACF] disabled:opacity-30 disabled:cursor-default transition-colors duration-200"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;