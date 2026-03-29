import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true, margin: '-80px' });

	return (
		<section ref={ref} className="py-16 sm:py-24 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.7 }}
					className="relative bg-[#241678] rounded-2xl sm:rounded-3xl p-8 sm:p-14 lg:p-20 overflow-hidden text-center"
				>
					{/* Animated cyan glow */}
					<motion.div
						animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
						transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
						className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-80 h-80 bg-[#09BACF] rounded-full blur-[80px] pointer-events-none"
					/>
					{/* Grid overlay */}
					<div
						className="absolute inset-0 opacity-[0.03] pointer-events-none"
						style={{
							backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
							backgroundSize: '48px 48px',
						}}
					/>

					<div className="relative z-10">
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={inView ? { opacity: 1, scale: 1 } : {}}
							transition={{ delay: 0.1 }}
							className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#09BACF]/30 rounded-full mb-8"
						>
							<span className="w-1.5 h-1.5 bg-[#09BACF] rounded-full animate-pulse" />
							<span className="text-[#09BACF] text-xs font-medium uppercase tracking-[0.15em]">Ready to Build?</span>
						</motion.div>

						<motion.h2
							initial={{ opacity: 0, y: 30 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.2 }}
							className="font-display text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight mb-6"
						>
							Your next big product
							<br className="hidden sm:block" />
							<span className="text-[#09BACF]"> starts here.</span>
						</motion.h2>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.3 }}
							className="text-gray-500 text-base sm:text-lg max-w-lg mx-auto mb-10"
						>
							Tell us about your project. We'll get back to you within 24 hours with a tailored proposal.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.4 }}
							className="flex flex-col sm:flex-row gap-3 justify-center"
						>
							<Link
								to="/contact"
								className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#09BACF] text-gray-950 font-bold rounded-full hover:bg-[#34cee0] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#09BACF]/30 text-sm"
							>
								Start a Project
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</Link>
							<Link
								to="/work"
								className="inline-flex items-center justify-center px-8 py-4 border border-white/10 text-white font-medium rounded-full hover:border-white/30 transition-all duration-300 text-sm"
							>
								See Our Work
							</Link>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default CTASection;