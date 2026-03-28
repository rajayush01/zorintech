import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
	{
		quote: "ZorinTech transformed our entire digital infrastructure. The team's technical depth and attention to detail is unmatched. Our platform now handles 10× the traffic with zero downtime.",
		name: 'Sarah Mitchell',
		role: 'CTO',
		company: 'FinTrack Global',
		country: 'United States',
		result: '10× traffic',
	},
	{
		quote: 'Working with ZorinTech felt like having a world-class engineering team in-house. They delivered our mobile app 2 weeks ahead of schedule and the quality exceeded every expectation.',
		name: 'Luca Bianchi',
		role: 'Founder',
		company: 'MobiCommerce',
		country: 'Italy',
		result: '2 wks early',
	},
	{
		quote: 'The ERP system ZorinTech built for us reduced our operational costs by 40%. Their understanding of complex business workflows is exceptional.',
		name: 'Aisha Al-Rashid',
		role: 'Operations Director',
		company: 'MediCore',
		country: 'UAE',
		result: '−40% costs',
	},
	{
		quote: 'From design to deployment, ZorinTech was a true partner. The website they built for us has driven a 3× increase in qualified leads since launch.',
		name: 'James Okonkwo',
		role: 'CEO',
		company: 'LogiFlow Africa',
		country: 'Nigeria',
		result: '3× leads',
	},
];

const TestimonialsSection = () => {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true, margin: '-80px' });
	const [current, setCurrent] = useState(0);
	const [dir, setDir] = useState(1);

	const prev = () => { setDir(-1); setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length); };
	const next = () => { setDir(1); setCurrent((c) => (c + 1) % testimonials.length); };

	// Auto-advance
	useEffect(() => {
		const id = setInterval(() => { setDir(1); setCurrent((c) => (c + 1) % testimonials.length); }, 5000);
		return () => clearInterval(id);
	}, []);

	const t = testimonials[current];

	return (
		<section ref={ref} className="py-24 sm:py-32 bg-white overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
					<div>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							className="text-amber-500 text-xs font-semibold uppercase tracking-[0.2em] mb-4"
						>
							Client Stories
						</motion.p>
						<motion.h2
							initial={{ opacity: 0, y: 30 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.1 }}
							className="font-display text-5xl sm:text-6xl font-black text-gray-950 leading-[0.95] tracking-tight"
						>
							Trusted by teams
							<br />
							<span className="text-gray-300">worldwide.</span>
						</motion.h2>
					</div>

					{/* Nav */}
					<div className="flex gap-3 flex-shrink-0">
						<button
							onClick={prev}
							className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:border-gray-950 hover:text-gray-950 hover:bg-gray-950 hover:text-white transition-all duration-200 group"
						>
							<ChevronLeft className="w-5 h-5" />
						</button>
						<button
							onClick={next}
							className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:border-gray-950 hover:bg-gray-950 hover:text-white transition-all duration-200"
						>
							<ChevronRight className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* Card + sidebar */}
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
					{/* Main card */}
					<AnimatePresence mode="wait" custom={dir}>
						<motion.div
							key={current}
							custom={dir}
							initial={{ opacity: 0, x: dir * 80 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: dir * -80 }}
							transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
							className="bg-gray-950 rounded-2xl p-8 sm:p-12 relative overflow-hidden"
						>
							{/* Decorative quote mark */}
							<div className="absolute top-6 right-8 text-[8rem] leading-none text-white/5 font-serif select-none pointer-events-none">
								"
							</div>

							{/* Result badge */}
							<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-400 rounded-full mb-8">
								<span className="text-gray-950 font-black text-sm">{t.result}</span>
							</div>

							<p className="text-white text-xl sm:text-2xl lg:text-3xl leading-relaxed font-light mb-10 max-w-2xl">
								"{t.quote}"
							</p>

							<div className="flex items-center gap-4">
								<div className="w-11 h-11 bg-amber-400 rounded-full flex items-center justify-center text-gray-950 font-black text-lg flex-shrink-0">
									{t.name[0]}
								</div>
								<div>
									<p className="text-white font-semibold text-sm">{t.name}</p>
									<p className="text-gray-500 text-xs">{t.role}, {t.company} · {t.country}</p>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>

					{/* Sidebar list */}
					<div className="flex flex-col gap-3">
						{testimonials.map((item, i) => (
							<motion.button
								key={i}
								initial={{ opacity: 0, x: 20 }}
								animate={inView ? { opacity: 1, x: 0 } : {}}
								transition={{ delay: i * 0.07 + 0.3 }}
								onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
								className={`text-left p-4 rounded-xl border transition-all duration-300 ${
									i === current
										? 'border-amber-300 bg-amber-50'
										: 'border-gray-100 hover:border-gray-200 bg-white'
								}`}
							>
								<div className="flex items-center gap-3">
									<div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 ${i === current ? 'bg-amber-400 text-gray-950' : 'bg-gray-100 text-gray-400'}`}>
										{item.name[0]}
									</div>
									<div className="min-w-0">
										<p className={`font-semibold text-xs truncate ${i === current ? 'text-gray-950' : 'text-gray-500'}`}>{item.name}</p>
										<p className="text-gray-400 text-[10px] truncate">{item.company}</p>
									</div>
									{i === current && (
										<span className="ml-auto text-amber-500 text-[10px] font-bold uppercase tracking-widest flex-shrink-0">Active</span>
									)}
								</div>
							</motion.button>
						))}
					</div>
				</div>

				{/* Progress dots */}
				<div className="flex gap-2 mt-6">
					{testimonials.map((_, i) => (
						<button
							key={i}
							onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
							className={`h-1 rounded-full transition-all duration-400 ${i === current ? 'w-8 bg-amber-400' : 'w-3 bg-gray-200 hover:bg-gray-300'}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default TestimonialsSection;