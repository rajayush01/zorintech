import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
{
number: '01',
title: 'Discovery',
desc: 'We deep-dive into your business, users, and goals to define a clear product vision and technical roadmap.',
detail: '12 weeks',
},
{
number: '02',
title: 'Design',
desc: 'Our designers craft pixel-perfect interfaces grounded in user research, brand identity, and conversion principles.',
detail: '23 weeks',
},
{
number: '03',
title: 'Build',
desc: 'Agile development with weekly demos, rigorous testing, and transparent communication at every sprint.',
detail: '4–8 weeks',
},
{
number: '04',
title: 'Launch & Scale',
desc: 'We deploy, monitor, and continuously improve your product  ensuring it grows with your business.',
detail: 'Ongoing',
},
];

const ProcessSection = () => {
const ref = useRef(null);
const inView = useInView(ref, { once: true, margin: '-80px' });

return (
<section ref={ref} className="py-24 sm:py-32 bg-gray-950 overflow-hidden">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
{/* Header */}
<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20">
<div>
<motion.p
initial={{ opacity: 0, y: 20 }}
animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4"
>
How We Work
</motion.p>
<motion.h2
initial={{ opacity: 0, y: 30 }}
animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
className="font-display text-5xl sm:text-6xl font-black text-white leading-[0.95] tracking-tight"
>
Our
<br />
<span className="text-gray-600">Process</span>
</motion.h2>
</div>
<motion.p
initial={{ opacity: 0, y: 20 }}
animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
className="text-gray-500 text-sm max-w-xs leading-relaxed"
>
A structured, transparent approach that keeps you informed at every milestone.
</motion.p>
</div>

{/* Steps */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
{steps.map((step, i) => (
<motion.div
key={step.number}
initial={{ opacity: 0, y: 40 }}
animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
className="relative group"
>
{/* Connector line */}
{i < steps.length - 1 && (
<div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] right-0 h-px overflow-hidden">
<motion.div
initial={{ scaleX: 0 }}
animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 + 0.5 }}
className="w-full h-full bg-gradient-to-r from-amber-400/40 to-gray-700 origin-left"
/>
</div>
)}

<div className="p-6 sm:p-8 border border-gray-800 hover:border-amber-400/30 transition-colors duration-500 h-full group-hover:bg-gray-900/60">
{/* Number circle */}
<motion.div
initial={{ scale: 0.5, opacity: 0 }}
animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 + 0.15 }}
className="w-14 h-14 border border-amber-400/30 rounded-full flex items-center justify-center mb-6 group-hover:border-amber-400 group-hover:bg-amber-400/5 transition-all duration-500"
>
<span className="font-black text-lg text-amber-400">{step.number}</span>
</motion.div>

<div className="inline-block px-2 py-0.5 bg-white/5 text-gray-500 text-[10px] uppercase tracking-widest rounded-full mb-4">
{step.detail}
</div>

<h3 className="font-display font-black text-xl text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
{step.title}
</h3>
<p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
{step.desc}
</p>
</div>
</motion.div>
))}
</div>
</div>
</section>
);
};

export default ProcessSection;
