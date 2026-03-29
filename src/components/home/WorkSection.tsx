import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
	{
		number: '01',
		title: 'Nymara',
		category: 'E-Commerce Platform',
		desc: 'A luxury lab-grown diamond e-commerce platform with seamless checkout, product discovery, and a premium shopping experience.',
		tags: ['React', 'Node.js', 'MongoDB'],
		year: '2024',
		color: 'from-[#e8f9fb] to-white',
	},
	{
		number: '02',
		title: 'FinTrack Pro',
		category: 'FinTech Dashboard',
		desc: 'Real-time financial analytics dashboard serving 50,000+ users across 12 countries with live data visualization.',
		tags: ['Next.js', 'Python', 'AWS'],
		year: '2024',
		color: 'from-gray-50 to-white',
	},
	{
		number: '03',
		title: 'MediCore ERP',
		category: 'Healthcare System',
		desc: 'End-to-end hospital management ERP handling patient records, billing, inventory, and staff scheduling.',
		tags: ['React', 'PostgreSQL', 'Docker'],
		year: '2023',
		color: 'from-[#e8f9fb]/50 to-white',
	},
	{
		number: '04',
		title: 'LogiFlow',
		category: 'Logistics Platform',
		desc: 'AI-powered logistics optimization platform reducing delivery costs by 35% for a global supply chain company.',
		tags: ['Flutter', 'Python', 'Kubernetes'],
		year: '2023',
		color: 'from-gray-50 to-white',
	},
];

const ProjectRow = ({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) => {
	const [hovered, setHovered] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={inView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			onHoverStart={() => setHovered(true)}
			onHoverEnd={() => setHovered(false)}
			className="relative group border-b border-gray-100 last:border-b-0 overflow-hidden"
		>
			{/* Hover background */}
			<motion.div
				initial={{ scaleX: 0 }}
				animate={{ scaleX: hovered ? 1 : 0 }}
				transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
				className={`absolute inset-0 bg-gradient-to-r ${project.color} origin-left`}
			/>

			<div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-4 py-8 sm:py-10 cursor-pointer">
				{/* Number + year */}
				<div className="flex items-center gap-4 lg:w-24 flex-shrink-0">
					<motion.span
						animate={{ color: hovered ? '#09BACF' : '#E5E7EB' }}
						className="font-black text-4xl sm:text-5xl leading-none transition-colors duration-300"
					>
						{project.number}
					</motion.span>
				</div>

				{/* Title + category */}
				<div className="flex-1 min-w-0">
					<div className="flex flex-wrap items-baseline gap-3 mb-2">
						<motion.h3
							animate={{ color: hovered ? '#0a0a0a' : '#111827' }}
							className="font-display font-black text-2xl sm:text-3xl leading-tight"
						>
							{project.title}
						</motion.h3>
						<span className="text-xs font-medium text-gray-400 uppercase tracking-widest border border-gray-200 rounded-full px-2.5 py-0.5">
							{project.category}
						</span>
					</div>
					<AnimatePresence>
						{hovered && (
							<motion.p
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.3 }}
								className="text-gray-500 text-sm leading-relaxed overflow-hidden"
							>
								{project.desc}
							</motion.p>
						)}
					</AnimatePresence>
				</div>

				{/* Tags */}
				<div className="flex flex-wrap gap-1.5 lg:w-48">
					{project.tags.map((tag) => (
						<span key={tag} className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
							{tag}
						</span>
					))}
				</div>

				{/* Year + arrow */}
				<div className="flex items-center gap-4 flex-shrink-0">
					<span className="text-gray-300 text-sm font-mono hidden sm:block">{project.year}</span>
					<motion.div
						animate={{
							backgroundColor: hovered ? '#09BACF' : 'transparent',
							borderColor: hovered ? '#09BACF' : '#E5E7EB',
							color: hovered ? '#0a0a0a' : '#9CA3AF',
						}}
						className="w-10 h-10 border rounded-full flex items-center justify-center transition-all duration-300"
					>
						<ArrowUpRight className="w-4 h-4" />
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};

const WorkSection = () => {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true, margin: '-80px' });

	return (
		<section ref={ref} className="py-24 sm:py-32 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
					<div>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							className="text-[#09BACF] text-xs font-semibold uppercase tracking-[0.2em] mb-4"
						>
							Our Work
						</motion.p>
						<motion.h2
							initial={{ opacity: 0, y: 30 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.1 }}
							className="font-display text-5xl sm:text-6xl font-black text-gray-950 leading-[0.95] tracking-tight"
						>
							Projects that
							<br />
							<span className="text-gray-300">speak for us.</span>
						</motion.h2>
					</div>
					<motion.a
						initial={{ opacity: 0 }}
						animate={inView ? { opacity: 1 } : {}}
						transition={{ delay: 0.3 }}
						href="/work"
						className="group inline-flex items-center gap-2 text-gray-950 font-semibold hover:text-[#09BACF] transition-colors text-sm flex-shrink-0"
					>
						View all projects
						<ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
					</motion.a>
				</div>

				{/* Project list */}
				<div>
					{projects.map((project, i) => (
						<ProjectRow key={project.number} project={project} index={i} inView={inView} />
					))}
				</div>
			</div>
		</section>
	);
};

export default WorkSection;