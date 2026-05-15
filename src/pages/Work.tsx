import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const categories = ['All', 'Web', 'Mobile', 'ERP', 'AI', 'Design'];

const projects = [
  {
    number: '01',
    title: 'NYMARA Jewells',
    category: 'E-Commerce',
    type: 'Luxury Jewelry Platform',
    desc: 'A premium e-commerce platform for lab-grown diamond jewelry with elegant product showcases, seamless browsing, and a luxury shopping experience.',
    tags: ['React', 'Node.js', 'MongoDB', 'Responsive Design'],
    year: '2024',
    result: 'Premium',
    resultLabel: 'shopping experience',
    size: 'large',
  },
  {
    number: '02',
    title: 'Standford School',
    category: 'Web',
    type: 'School Website',
    desc: 'A clean and informative school website designed to showcase academics, admissions, and campus life with an intuitive and user-friendly interface.',
    tags: ['React', 'Responsive UI', 'SEO', 'Education'],
    year: '2024',
    result: '2×',
    resultLabel: 'engagement boost',
    size: 'small',
  },
  {
    number: '03',
    title: 'Lets Taxify',
    category: 'Web',
    type: 'CA Firm Website',
    desc: 'A professional website for a Chartered Accountant firm, designed to establish trust, showcase taxation services, and simplify client inquiries.',
    tags: ['React', 'Business Website', 'SEO', 'Responsive'],
    year: '2024',
    result: '3×',
    resultLabel: 'client inquiries',
    size: 'small',
  },
  {
    number: '04',
    title: 'Nashville Hanuman Temple',
    category: 'Web',
    type: 'Temple Website',
    desc: 'A simple and informative temple website built to share event details, timings, and strengthen community engagement online.',
    tags: ['React', 'Community Platform', 'Responsive', 'SEO'],
    year: '2023',
    result: '+50%',
    resultLabel: 'community reach',
    size: 'large',
  },
  {
    number: '05',
    title: 'Dr. Vikas Bhalekar',
    category: 'Healthcare',
    type: 'Doctor Website',
    desc: 'A professional healthcare website designed to build trust, clearly present medical services, and improve patient communication and inquiries.',
    tags: ['Healthcare', 'Responsive UI', 'SEO', 'Appointments'],
    year: '2024',
    result: '2×',
    resultLabel: 'appointment inquiries',
    size: 'small',
  },
  {
    number: '06',
    title: 'Bharat O’Nesty',
    category: 'E-Commerce',
    type: 'Brand Website',
    desc: 'A clean and engaging brand website showcasing premium tea products with a strong focus on storytelling, product presentation, and brand identity.',
    tags: ['Branding', 'UI/UX', 'E-Commerce', 'Responsive'],
    year: '2024',
    result: '+62%',
    resultLabel: 'brand engagement',
    size: 'small',
  },
  {
    number: '07',
    title: 'IB Technologies',
    category: 'Web',
    type: 'Software Company Website',
    desc: 'A modern corporate website for a software company focused on credibility, service clarity, and a strong digital presence.',
    tags: ['Corporate Website', 'React', 'Admin Panel', 'Responsive'],
    year: '2024',
    result: '99.9%',
    resultLabel: 'client satisfaction',
    size: 'small',
  },
  {
    number: '08',
    title: 'Education Management System',
    category: 'ERP',
    type: 'School ERP',
    desc: 'A complete ERP system built to manage academics, students, staff, attendance, and administration through a centralized platform.',
    tags: ['ERP', 'Attendance', 'Reports', 'Admin Dashboard'],
    year: '2024',
    result: '60%',
    resultLabel: 'less admin time',
    size: 'large',
  },
  {
    number: '09',
    title: 'Education Management System',
    category: 'ERP',
    type: 'College ERP',
    desc: 'A robust college ERP system built to streamline academic operations, student records, staff management, and reporting.',
    tags: ['ERP', 'Student Management', 'Analytics', 'Role-based Access'],
    year: '2024',
    result: '40%',
    resultLabel: 'cost reduction',
    size: 'large',
  },
  {
    number: '10',
    title: 'Invoice Software',
    category: 'Software',
    type: 'Billing & Invoicing System',
    desc: 'A smart invoicing software solution designed to simplify billing, payments, and financial record management for businesses.',
    tags: ['Billing', 'Invoices', 'Reports', 'Business Automation'],
    year: '2024',
    result: '10×',
    resultLabel: 'billing efficiency',
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
			className={`group relative border border-gray-100 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-[#e8f9fb]/80 hover:border-[#9fe9f2] bg-white ${
				project.size === 'large' ? 'sm:col-span-2' : ''
			}`}
		>
			{/* Animated top accent bar */}
			<motion.div
				initial={{ scaleX: 0 }}
				animate={inView ? { scaleX: 1 } : {}}
				transition={{ duration: 0.9, delay: index * 0.07 + 0.3, ease: [0.22, 1, 0.36, 1] }}
				className="h-[2px] bg-gradient-to-r from-[#09BACF] to-[#34cee0] origin-left"
			/>

			{/* Subtle cyan tint on hover */}
			<motion.div
				animate={{ opacity: hovered ? 1 : 0 }}
				transition={{ duration: 0.4 }}
				className="absolute inset-0 bg-gradient-to-br from-[#e8f9fb]/30 via-white to-white pointer-events-none z-0"
			/>

			<div className="relative z-10 p-7 sm:p-8 h-full flex flex-col">
				{/* Top row */}
				<div className="flex items-start justify-between mb-5">
					<div className="flex flex-col gap-2">
						<motion.span
							animate={{ color: hovered ? '#09BACF' : '#E5E7EB' }}
							transition={{ duration: 0.3 }}
							className="font-black text-[3.5rem] leading-none tabular-nums"
						>
							{project.number}
						</motion.span>
						<span className="text-[10px] font-medium uppercase tracking-widest border border-gray-200 text-gray-400 rounded-full px-2.5 py-0.5 w-fit">
							{project.type}
						</span>
					</div>

					<motion.div
						animate={{
							backgroundColor: hovered ? '#09BACF' : 'transparent',
							borderColor: hovered ? '#09BACF' : '#E5E7EB',
							color: hovered ? '#0a0a0a' : '#9CA3AF',
						}}
						transition={{ duration: 0.3 }}
						className="w-10 h-10 border rounded-full flex items-center justify-center flex-shrink-0"
					>
						<ArrowUpRight className="w-4 h-4" />
					</motion.div>
				</div>

				{/* Title */}
				<motion.h3
					animate={{ color: hovered ? '#09BACF' : '#111827' }}
					transition={{ duration: 0.3 }}
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
									? 'border-[#09BACF]/20 text-[#09BACF] bg-[#e8f9fb]'
									: 'border-gray-100 text-gray-500 bg-gray-50'
							}`}
						>
							{tag}
						</span>
					))}
				</div>

				{/* Bottom row */}
				{/* <div className="flex items-end justify-between mt-6 pt-5 border-t border-gray-100">
					<div className="inline-flex items-baseline gap-1.5 px-3.5 py-2 bg-[#09BACF] rounded-full">
						<span className="text-gray-950 font-black text-sm">{project.result}</span>
						<span className="text-gray-950/60 text-xs">{project.resultLabel}</span>
					</div>
					<span className={`text-sm font-mono tabular-nums transition-colors duration-300 ${hovered ? 'text-[#09BACF]' : 'text-gray-200'}`}>
						{project.year}
					</span>
				</div> */}
			</div>
		</motion.div>
	);
};

const Work = () => {
	const heroRef = useRef<HTMLElement>(null);
	const gridRef = useRef(null);

	const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
	const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

	const gridInView = useInView(gridRef, { once: true, margin: '-80px' });

	const [activeFilter, setActiveFilter] = useState('All');
	const filtered = activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

	return (
		<>
			{/* ── Hero ─────────────────────────────────────────────── */}
			<section ref={heroRef} className="relative bg-white pt-32 pb-28 sm:pt-44 sm:pb-36 overflow-hidden">
				<div
					className="absolute inset-0 opacity-[0.04] pointer-events-none"
					style={{
						backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`,
						backgroundSize: '56px 56px',
					}}
				/>
				{/* Background decorative blobs */}
				<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#09BACF]/6 rounded-full blur-[120px] pointer-events-none" />
				<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#241678]/4 rounded-full blur-[100px] pointer-events-none" />

				<motion.div style={{ y: heroY }} className="absolute bottom-0 right-1/4 pointer-events-none">
					<motion.div
						animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.22, 0.1] }}
						transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
						className="w-[500px] h-[500px] bg-[#34cee0] rounded-full blur-[150px]"
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
									<p className="font-display font-black text-3xl sm:text-4xl text-gray-950 tabular-nums">{s.v}</p>
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
										? 'bg-[#09BACF] text-gray-950 shadow-lg shadow-[#09BACF]/20'
										: 'border border-gray-200 text-gray-500 hover:border-[#09BACF]/40 hover:text-gray-800'
								}`}
							>
								{cat}
							</motion.button>
						))}
					</motion.div>

					<motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
						<AnimatePresence mode="popLayout">
							{filtered.map((project, i) => (
								<ProjectCard key={project.number} project={project} index={i} inView={gridInView} />
							))}
						</AnimatePresence>
					</motion.div>

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

		</>
	);
};

export default Work;