import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = ['All', 'Web', 'Mobile', 'ERP', 'AI', 'Design'];

const projects = [
	{
		number: '01',
		title: 'Nymara',
		category: 'Web',
		type: 'E-Commerce Platform',
		desc: 'A luxury lab-grown diamond e-commerce platform with seamless checkout, product discovery, and a premium shopping experience built for global scale.',
		tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
		year: '2024',
		result: '3× revenue',
		resultLabel: 'in 6 months',
		size: 'large',
	},
	{
		number: '02',
		title: 'FinTrack Pro',
		category: 'Web',
		type: 'FinTech Dashboard',
		desc: 'Real-time financial analytics dashboard serving 50,000+ users across 12 countries with live data visualization and predictive insights.',
		tags: ['Next.js', 'Python', 'AWS', 'WebSockets'],
		year: '2024',
		result: '50K+',
		resultLabel: 'active users',
		size: 'small',
	},
	{
		number: '03',
		title: 'MediCore ERP',
		category: 'ERP',
		type: 'Healthcare System',
		desc: 'End-to-end hospital management ERP handling patient records, billing, inventory, and staff scheduling for a 500-bed hospital network.',
		tags: ['React', 'PostgreSQL', 'Docker', 'HL7'],
		year: '2023',
		result: '−40%',
		resultLabel: 'operational costs',
		size: 'small',
	},
	{
		number: '04',
		title: 'LogiFlow',
		category: 'AI',
		type: 'Logistics Platform',
		desc: 'AI-powered logistics optimization platform reducing delivery costs by 35% for a global supply chain company operating across 20 countries.',
		tags: ['Flutter', 'Python', 'Kubernetes', 'TensorFlow'],
		year: '2023',
		result: '−35%',
		resultLabel: 'delivery costs',
		size: 'large',
	},
	{
		number: '05',
		title: 'PulseApp',
		category: 'Mobile',
		type: 'Health & Fitness App',
		desc: 'Cross-platform fitness tracking app with AI-powered workout recommendations, nutrition logging, and social challenges. 4.9★ on both stores.',
		tags: ['Flutter', 'Firebase', 'OpenAI', 'Swift'],
		year: '2024',
		result: '4.9★',
		resultLabel: 'app store rating',
		size: 'small',
	},
	{
		number: '06',
		title: 'Archetype Studio',
		category: 'Design',
		type: 'Brand & Design System',
		desc: 'Complete brand identity and design system for a Series B SaaS startup — from logo to component library, deployed across 4 products.',
		tags: ['Figma', 'Design Tokens', 'Storybook', 'React'],
		year: '2023',
		result: '+62%',
		resultLabel: 'conversion rate',
		size: 'small',
	},
	{
		number: '07',
		title: 'MediCore ERP',
		category: 'ERP',
		type: 'Healthcare System',
		desc: 'End-to-end hospital management ERP handling patient records, billing, inventory, and staff scheduling for a 500-bed hospital network.',
		tags: ['React', 'PostgreSQL', 'Docker', 'HL7'],
		year: '2023',
		result: '−40%',
		resultLabel: 'operational costs',
		size: 'small',
	},
];

const ProjectCard = ({ project, index, inView }: { project: (typeof projects)[0]; index: number; inView: boolean }) => {
	const [hovered, setHovered] = useState(false);

	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 40 }}
			animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
			onHoverStart={() => setHovered(true)}
			onHoverEnd={() => setHovered(false)}
			className={`group relative border border-gray-100 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-[#e8f9fb]/80 hover:border-[#9fe9f2] ${
				project.size === 'large' ? 'sm:col-span-2' : ''
			}`}
		>
			{/* Background hover fill sweeps up */}
			<motion.div
				initial={false}
				animate={{ scaleY: hovered ? 1 : 0 }}
				transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
				className="absolute inset-0 bg-[#241678] origin-bottom z-0 rounded-2xl"
			/>

			{/* Subtle warm tint (non-hover) */}
			<motion.div
				animate={{ opacity: hovered ? 0 : 1 }}
				transition={{ duration: 0.3 }}
				className="absolute inset-0 bg-gradient-to-br from-[#e8f9fb]/40 via-white to-white z-0"
			/>

			<div className="relative z-10 p-7 sm:p-8 h-full flex flex-col bg-gray-100">
				{/* Top row */}
				<div className="flex items-start justify-between mb-5 ">
					<div className="flex flex-col gap-2">
						<motion.span
							animate={{ color: hovered ? '#09BACF' : '#E5E7EB' }}
							className="font-black text-[3.5rem] leading-none tabular-nums"
						>
							{project.number}
						</motion.span>
						<span
							className={`text-[10px] font-medium uppercase tracking-widest border rounded-full px-2.5 py-0.5 w-fit transition-all duration-300 ${
								hovered ? 'border-white/15 text-gray-500' : 'border-gray-200 text-gray-400'
							}`}
						>
							{project.type}
						</span>
					</div>

					<motion.div
						animate={{
							backgroundColor: hovered ? '#09BACF' : 'transparent',
							borderColor: hovered ? '#09BACF' : '#E5E7EB',
							color: hovered ? '#0a0a0a' : '#9CA3AF',
						}}
						className="w-10 h-10 border rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
					>
						<ArrowUpRight className="w-4 h-4" />
					</motion.div>
				</div>

				{/* Title */}
				<motion.h3
					animate={{ color: hovered ? '#ffffff' : '#111827' }}
					className="font-display font-black text-2xl sm:text-3xl mb-3 tracking-tight leading-tight"
				>
					{project.title}
				</motion.h3>

				{/* Description reveals on hover */}
				<AnimatePresence>
					{hovered && (
						<motion.p
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
							className="text-gray-400 text-sm leading-relaxed mb-4 overflow-hidden"
						>
							{project.desc}
						</motion.p>
					)}
				</AnimatePresence>

				{/* Tags */}
				<div className="flex flex-wrap gap-1.5 mb-auto">
					{project.tags.map((tag) => (
						<span
							key={tag}
							className={`px-2.5 py-1 text-xs rounded-full border transition-all duration-300 ${
								hovered
									? 'border-white/10 text-gray-500 bg-white/5'
									: 'border-gray-100 text-gray-500 bg-gray-50'
							}`}
						>
							{tag}
						</span>
					))}
				</div>

				{/* Bottom row */}
				<div className="flex items-end justify-between mt-6 pt-5 border-t border-gray-100/20">
					<div className="inline-flex items-baseline gap-1.5 px-3.5 py-2 bg-[#09BACF] rounded-full">
						<span className="text-gray-950 font-black text-sm">{project.result}</span>
						<span className="text-gray-950/60 text-xs">{project.resultLabel}</span>
					</div>
					<span
						className={`text-sm font-mono tabular-nums transition-colors duration-300 ${hovered ? 'text-gray-600' : 'text-gray-200'}`}
					>
						{project.year}
					</span>
				</div>
			</div>
		</motion.div>
	);
};

const Work = () => {
	const heroRef = useRef<HTMLElement>(null);
	const gridRef = useRef(null);
	const ctaRef = useRef(null);

	const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
	const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

	const gridInView = useInView(gridRef, { once: true, margin: '-80px' });
	const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

	const [activeFilter, setActiveFilter] = useState('All');
	const filtered = activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

	return (
		<>
			{/* ── Hero ─────────────────────────────────────────────── */}
			<section ref={heroRef} className="relative bg-white pt-32 pb-28 sm:pt-44 sm:pb-36 overflow-hidden">
				{/* Grid texture */}
				<div
					className="absolute inset-0 opacity-[0.04] pointer-events-none"
					style={{
						backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`,
						backgroundSize: '56px 56px',
					}}
				/>

				{/* Parallax glow */}
				<motion.div style={{ y: heroY }} className="absolute bottom-0 right-1/4 pointer-events-none">
					<motion.div
						animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.28, 0.15] }}
						transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
						className="w-[600px] h-[600px] bg-[#34cee0] rounded-full blur-[150px]"
					/>
				</motion.div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-[#09BACF] text-xs font-bold uppercase tracking-[0.25em] mb-6"
					>
						Our Work
					</motion.p>

					<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
						{/* Headline — two-line stagger */}
						<div>
							<div className="overflow-hidden mb-2">
								<motion.h1
									initial={{ y: 80, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
									className="font-display text-6xl sm:text-7xl lg:text-[6.5rem] font-black text-gray-950 leading-[0.92] tracking-tight"
								>
									Projects that
								</motion.h1>
							</div>
							<div className="overflow-hidden">
								<motion.h1
									initial={{ y: 80, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
									className="font-display text-6xl sm:text-7xl lg:text-[6.5rem] font-black text-[#09BACF] leading-[0.92] tracking-tight"
								>
									speak for us.
								</motion.h1>
							</div>
						</div>

						{/* Stats panel */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.45 }}
							className="flex gap-8 lg:gap-10 flex-shrink-0"
						>
							{[
								{ v: '150+', l: 'Projects' },
								{ v: '40+', l: 'Countries' },
								{ v: '98%', l: 'Satisfaction' },
							].map((s, i) => (
								<motion.div
									key={s.l}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.5 + i * 0.08 }}
								>
									<p className="font-display font-black text-3xl sm:text-4xl text-gray-950 tabular-nums">
										{s.v}
									</p>
									<p className="text-gray-400 text-xs uppercase tracking-[0.15em] mt-1">{s.l}</p>
								</motion.div>
							))}
						</motion.div>
					</div>
				</div>
			</section>

			{/* ── Filter + Grid ─────────────────────────────────────── */}
			<section ref={gridRef} className="py-16 sm:py-24 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Filter tabs */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={gridInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.5 }}
						className="flex flex-wrap gap-2 mb-12"
					>
						{categories.map((cat) => (
							<motion.button
								key={cat}
								onClick={() => setActiveFilter(cat)}
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
								className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 overflow-hidden ${
									activeFilter === cat
										? 'bg-[#241678] text-white'
										: 'border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-800'
								}`}
							>
								{activeFilter === cat && (
									<motion.span
										layoutId="filter-pill"
										className="absolute inset-0 bg-[#241678] rounded-full -z-10"
										transition={{ type: 'spring', stiffness: 300, damping: 30 }}
									/>
								)}
								{cat}
							</motion.button>
						))}
					</motion.div>

					{/* Grid */}
					<motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
						<AnimatePresence mode="popLayout">
							{filtered.map((project, i) => (
								<ProjectCard key={project.number} project={project} index={i} inView={gridInView} />
							))}
						</AnimatePresence>
					</motion.div>

					{/* Empty state */}
					<AnimatePresence>
						{filtered.length === 0 && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="text-center py-24 text-gray-300"
							>
								<p className="text-4xl font-black mb-2">—</p>
								<p className="text-sm">No projects in this category yet.</p>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</section>

			{/* ── CTA ───────────────────────────────────────────────── */}
			<section ref={ctaRef} className="py-16 sm:py-24 bg-[#FAFAFA]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row items-center justify-between gap-12">
						<motion.div
							initial={{ opacity: 0, x: -40 }}
							animate={ctaInView ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
						>
							<motion.p
								initial={{ opacity: 0, y: 10 }}
								animate={ctaInView ? { opacity: 1, y: 0 } : {}}
								className="text-[#09BACF] text-xs font-bold uppercase tracking-[0.25em] mb-4"
							>
								Start Your Project
							</motion.p>
							<h2 className="font-display text-5xl sm:text-6xl font-black text-gray-950 leading-[0.95] tracking-tight">
								Your project
								<br />
								<span className="text-gray-300">could be next.</span>
							</h2>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 40 }}
							animate={ctaInView ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
							className="flex flex-col sm:flex-row gap-3 flex-shrink-0"
						>
							<Link
								to="/contact"
								className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#241678] text-white font-bold rounded-full hover:bg-[#09BACF] hover:text-gray-950 transition-all duration-300 text-sm"
							>
								Start a Project
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</Link>
							<Link
								to="/services"
								className="inline-flex items-center justify-center px-8 py-4 border border-gray-200 text-gray-600 font-medium rounded-full hover:border-gray-950 hover:text-gray-950 transition-all duration-300 text-sm"
							>
								Our Services
							</Link>
						</motion.div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Work;