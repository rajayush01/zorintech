import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Shield, Globe2, Clock, Users, TrendingUp } from 'lucide-react';

const reasons = [
	{ icon: Globe2, title: 'Global Delivery', desc: 'Teams across 3 continents ensuring round-the-clock development and support.' },
	{ icon: Zap, title: 'Fast Execution', desc: 'Agile sprints with weekly demos. Most MVPs delivered in 6–10 weeks.' },
	{ icon: Shield, title: 'Enterprise Security', desc: 'SOC2-aligned practices, encrypted data, and role-based access built in from day one.' },
	{ icon: Clock, title: 'On-Time Delivery', desc: '95% of our projects ship on or before the committed deadline.' },
	{ icon: Users, title: 'Dedicated Teams', desc: 'You get a dedicated pod, not a rotating cast of freelancers.' },
	{ icon: TrendingUp, title: 'Measurable Results', desc: 'We track KPIs from day one and optimize for business outcomes, not just code.' },
];

// Animated counter hook
const useCounter = (target: number, duration = 1500, inView = false) => {
	const [value, setValue] = useState(0);
	useEffect(() => {
		if (!inView) return;
		const start = Date.now();
		const tick = () => {
			const elapsed = Date.now() - start;
			const progress = Math.min(elapsed / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			setValue(Math.round(eased * target));
			if (progress < 1) requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	}, [target, duration, inView]);
	return value;
};

const WhyUsSection = () => {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true, margin: '-80px' });
	const count = useCounter(98, 1800, inView);

	return (
		<section ref={ref} className="py-24 sm:py-32 bg-[#FAFAFA]">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
					{/* Left */}
					<div>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							className="text-amber-500 text-xs font-semibold uppercase tracking-[0.2em] mb-4"
						>
							Why ZorinTech
						</motion.p>
						<motion.h2
							initial={{ opacity: 0, y: 30 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.1 }}
							className="font-display text-5xl sm:text-6xl font-black text-gray-950 leading-[0.95] tracking-tight mb-8"
						>
							The standard
							<br />
							<span className="text-gray-300">others aim for.</span>
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.2 }}
							className="text-gray-400 leading-relaxed mb-12 text-sm max-w-sm"
						>
							We do not just write code. We build products that scale, perform, and create real business
							value. Our international team brings diverse expertise and a relentless focus on quality.
						</motion.p>

						{/* Big stat */}
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={inView ? { opacity: 1, scale: 1 } : {}}
							transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
							className="relative inline-block"
						>
							{/* Decorative ring */}
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
								className="absolute -inset-4 border border-dashed border-amber-200 rounded-full pointer-events-none"
							/>
							<div className="flex items-end gap-2 bg-white border border-gray-100 rounded-2xl px-8 py-6 shadow-sm">
								<span className="font-display text-8xl font-black text-gray-950 leading-none tabular-nums">
									{count}
								</span>
								<div className="mb-2">
									<span className="font-black text-4xl text-amber-400">%</span>
									<p className="text-gray-400 text-xs mt-1 uppercase tracking-widest">Client retention</p>
								</div>
							</div>
						</motion.div>
					</div>

					{/* Right grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						{reasons.map((reason, i) => {
							const Icon = reason.icon;
							return (
								<motion.div
									key={reason.title}
									initial={{ opacity: 0, y: 24 }}
									animate={inView ? { opacity: 1, y: 0 } : {}}
									transition={{ duration: 0.5, delay: i * 0.07 + 0.2 }}
									className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-50 transition-all duration-400 cursor-default"
								>
									<div className="w-10 h-10 bg-gray-50 group-hover:bg-amber-400 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-gray-950 mb-4 transition-all duration-300">
										<Icon className="w-4 h-4" />
									</div>
									<h4 className="font-bold text-gray-950 mb-1.5 text-sm group-hover:text-gray-950 transition-colors">
										{reason.title}
									</h4>
									<p className="text-gray-400 text-xs leading-relaxed">{reason.desc}</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};

export default WhyUsSection;