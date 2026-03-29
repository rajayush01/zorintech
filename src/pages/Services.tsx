import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Globe, Smartphone, Cloud, Palette, BarChart3, Cpu, ArrowUpRight, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
	{
		icon: Globe,
		number: '01',
		title: 'Web Development',
		tagline: 'Fast. Scalable. Beautiful.',
		desc: 'We build high-performance web applications using modern frameworks — optimized for speed, SEO, and global scale. From marketing sites to complex SaaS platforms.',
		tags: ['React', 'Next.js', 'Node.js', 'TypeScript', 'GraphQL'],
		metric: '3×',
		metricLabel: 'faster load time',
		features: ['Custom architecture', 'SEO-first approach', 'Performance budgets', 'Accessibility built-in'],
	},
	{
		icon: Smartphone,
		number: '02',
		title: 'Mobile Applications',
		tagline: 'iOS & Android. One codebase.',
		desc: 'Native and cross-platform mobile apps that deliver seamless user experiences. We ship apps that users love — with 4.9★ average ratings across the App Store and Play Store.',
		tags: ['Flutter', 'React Native', 'Swift', 'Kotlin'],
		metric: '4.9★',
		metricLabel: 'avg. app rating',
		features: ['Cross-platform efficiency', 'Native performance', 'Offline-first design', 'Push notifications'],
	},
	{
		icon: Cloud,
		number: '03',
		title: 'Cloud & DevOps',
		tagline: '99.9% uptime. Zero compromise.',
		desc: 'Scalable cloud infrastructure, CI/CD pipelines, and DevOps practices for reliable, fast deployments. We architect systems that grow with your business.',
		tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
		metric: '99.9%',
		metricLabel: 'uptime SLA',
		features: ['Auto-scaling infra', 'Zero-downtime deploys', 'Cost optimization', '24/7 monitoring'],
	},
	{
		icon: Palette,
		number: '04',
		title: 'UI/UX Design',
		tagline: 'Design that converts.',
		desc: 'Research-driven design systems and interfaces that convert visitors into loyal customers. Every pixel is intentional, every interaction is crafted.',
		tags: ['Figma', 'Design Systems', 'Prototyping', 'User Research'],
		metric: '+62%',
		metricLabel: 'conversion lift',
		features: ['User research', 'Design systems', 'Interactive prototypes', 'Usability testing'],
	},
	{
		icon: BarChart3,
		number: '05',
		title: 'ERP & Business Systems',
		tagline: 'Streamline every operation.',
		desc: 'End-to-end enterprise resource planning systems tailored to your business workflows. We replace spreadsheet chaos with intelligent, integrated platforms.',
		tags: ['Custom ERP', 'CRM', 'Analytics', 'Dashboards', 'Integrations'],
		metric: '40%',
		metricLabel: 'cost reduction',
		features: ['Custom workflows', 'Real-time analytics', 'Role-based access', 'API integrations'],
	},
	{
		icon: Cpu,
		number: '06',
		title: 'AI & Automation',
		tagline: 'Work smarter, not harder.',
		desc: 'Intelligent automation, machine learning integrations, and AI-powered features that give you a competitive edge. We make AI practical and impactful.',
		tags: ['Python', 'TensorFlow', 'OpenAI', 'LangChain', 'Automation'],
		metric: '10×',
		metricLabel: 'productivity gain',
		features: ['LLM integrations', 'Workflow automation', 'Predictive analytics', 'Custom AI models'],
	},
];

const ServiceCard = ({ service, index, inView }: { service: (typeof services)[0]; index: number; inView: boolean }) => {
	const [open, setOpen] = useState(false);
	const [hovered, setHovered] = useState(false);
	const Icon = service.icon;

	return (
		<motion.div
			initial={{ opacity: 0, y: 60 }}
			animate={inView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
			onHoverStart={() => setHovered(true)}
			onHoverEnd={() => setHovered(false)}
			className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-500 hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-50/80"
		>
			{/* Animated top accent bar */}
			<motion.div
				initial={{ scaleX: 0 }}
				animate={inView ? { scaleX: 1 } : {}}
				transition={{ duration: 1, delay: index * 0.1 + 0.4, ease: [0.22, 1, 0.36, 1] }}
				className="h-[2px] bg-amber-400 origin-left"
			/>

			{/* Hover fill — slides up from bottom */}
			<motion.div
				initial={false}
				animate={{ scaleY: hovered ? 1 : 0 }}
				transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
				className="absolute inset-0 bg-gray-950 origin-bottom z-0 rounded-2xl"
			/>

			<div className="relative z-10 p-7 sm:p-8">
				{/* Header */}
				<div className="flex items-start justify-between mb-6">
					<motion.div
						animate={{ backgroundColor: hovered ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.08)' }}
						className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
					>
						<Icon
							className={`w-5 h-5 transition-colors duration-300 ${hovered ? 'text-amber-400' : 'text-amber-500'}`}
						/>
					</motion.div>
					<span
						className={`font-black text-5xl leading-none transition-colors duration-300 ${hovered ? 'text-white/10' : 'text-gray-50'}`}
					>
						{service.number}
					</span>
				</div>

				{/* Tagline */}
				<p
					className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 transition-colors duration-300 ${hovered ? 'text-amber-400' : 'text-amber-500'}`}
				>
					{service.tagline}
				</p>

				{/* Title */}
				<h3
					className={`font-display font-black text-xl mb-3 transition-colors duration-300 ${hovered ? 'text-white' : 'text-gray-950'}`}
				>
					{service.title}
				</h3>

				{/* Desc */}
				<p
					className={`text-sm leading-relaxed mb-5 transition-colors duration-300 ${hovered ? 'text-gray-400' : 'text-gray-400'}`}
				>
					{service.desc}
				</p>

				{/* Tags */}
				<div className="flex flex-wrap gap-1.5 mb-5">
					{service.tags.map((tag) => (
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

				{/* Expand toggle */}
				<button
					onClick={() => setOpen(!open)}
					className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${hovered ? 'text-amber-400' : 'text-gray-400 hover:text-amber-500'}`}
				>
					<span>{open ? 'Hide details' : "What's included"}</span>
					<motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}>
						<ArrowUpRight className="w-4 h-4" />
					</motion.div>
				</button>

				{/* Expanded content */}
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
							className="overflow-hidden"
						>
							<div
								className={`pt-5 mt-5 border-t transition-colors duration-300 ${hovered ? 'border-white/10' : 'border-gray-100'}`}
							>
								<div className="grid grid-cols-2 gap-2.5 mb-5">
									{service.features.map((f, fi) => (
										<motion.div
											key={f}
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: fi * 0.06 }}
											className="flex items-center gap-2"
										>
											<div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
												<Check className="w-2.5 h-2.5 text-gray-950" />
											</div>
											<span
												className={`text-xs transition-colors duration-300 ${hovered ? 'text-gray-400' : 'text-gray-500'}`}
											>
												{f}
											</span>
										</motion.div>
									))}
								</div>
								<div className="inline-flex items-baseline gap-1.5 px-3.5 py-2 bg-amber-400 rounded-full">
									<span className="text-gray-950 font-black text-sm">{service.metric}</span>
									<span className="text-gray-950/60 text-xs">{service.metricLabel}</span>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
};

const Services = () => {
	const heroRef = useRef<HTMLElement>(null);
	const gridRef = useRef(null);
	const processRef = useRef(null);
	const ctaRef = useRef(null);

	const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
	const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
	const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

	const gridInView = useInView(gridRef, { once: true, margin: '-80px' });
	const processInView = useInView(processRef, { once: true, margin: '-80px' });
	const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

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

				{/* Parallax amber glow */}
				<motion.div
					style={{ y: heroY, opacity: heroOpacity }}
					className="absolute top-1/2 left-1/3 -translate-y-1/2 pointer-events-none"
				>
					<motion.div
						animate={{ scale: [1, 1.25, 1], opacity: [0.18, 0.32, 0.18] }}
						transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
						className="w-[500px] h-[500px] bg-amber-300 rounded-full blur-[130px]"
					/>
				</motion.div>

				{/* Animated number ticker in background */}
				<div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-2 pointer-events-none select-none">
					{services.map((s, i) => (
						<motion.span
							key={s.number}
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.4 + i * 0.08 }}
							className="font-display font-black text-[4rem] leading-none text-gray-950/[0.03]"
						>
							{s.number}
						</motion.span>
					))}
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-amber-500 text-xs font-bold uppercase tracking-[0.25em] mb-6"
					>
						What We Do
					</motion.p>

					<div className="overflow-hidden mb-4">
						<motion.h1
							initial={{ y: 80, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
							className="font-display text-6xl sm:text-7xl lg:text-[6.5rem] font-black text-gray-950 leading-[0.92] tracking-tight"
						>
							Services built
						</motion.h1>
					</div>
					<div className="overflow-hidden mb-10">
						<motion.h1
							initial={{ y: 80, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
							className="font-display text-6xl sm:text-7xl lg:text-[6.5rem] font-black text-amber-400 leading-[0.92] tracking-tight"
						>
							for the world.
						</motion.h1>
					</div>

					<motion.p
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.35 }}
						className="text-gray-400 text-base sm:text-lg max-w-lg leading-relaxed mb-12"
					>
						From concept to deployment, we cover every layer of the digital stack with precision and craft.
					</motion.p>

					{/* Pill category pills */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.5 }}
						className="flex flex-wrap gap-2.5"
					>
						{services.map((s, i) => (
							<motion.span
								key={s.title}
								initial={{ opacity: 0, scale: 0.85 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.55 + i * 0.07 }}
								whileHover={{ scale: 1.05, borderColor: 'rgba(245,158,11,0.6)', color: '#F59E0B' }}
								className="px-4 py-2 border border-gray-200 text-gray-400 text-xs font-medium rounded-full cursor-default transition-colors duration-300"
							>
								{s.title}
							</motion.span>
						))}
					</motion.div>
				</div>
			</section>

			{/* ── Services Grid ─────────────────────────────────────── */}
			<section ref={gridRef} className="py-24 sm:py-32 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{services.map((service, i) => (
							<ServiceCard key={service.number} service={service} index={i} inView={gridInView} />
						))}
					</div>
				</div>
			</section>

			{/* ── Process Strip ─────────────────────────────────────── */}
			<section ref={processRef} className="py-24 bg-gray-950 overflow-hidden">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Header */}
					<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
						<div>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={processInView ? { opacity: 1, y: 0 } : {}}
								className="text-amber-400 text-xs font-bold uppercase tracking-[0.25em] mb-4"
							>
								How We Work
							</motion.p>
							<motion.h2
								initial={{ opacity: 0, y: 30 }}
								animate={processInView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: 0.1 }}
								className="font-display text-5xl sm:text-6xl font-black text-white leading-[0.95] tracking-tight"
							>
								Four steps to
								<br />
								<span className="text-gray-700">your product.</span>
							</motion.h2>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800/50">
						{[
							{
								step: '01',
								label: 'Discovery',
								detail: '1–2 weeks',
								desc: 'Deep-dive into goals, users, and technical scope.',
							},
							{
								step: '02',
								label: 'Design',
								detail: '2–3 weeks',
								desc: 'Pixel-perfect interfaces grounded in user research.',
							},
							{
								step: '03',
								label: 'Build',
								detail: '4–8 weeks',
								desc: 'Agile sprints with weekly demos and full transparency.',
							},
							{
								step: '04',
								label: 'Launch',
								detail: 'Ongoing',
								desc: 'Deploy, monitor, and scale — indefinitely.',
							},
						].map((item, i) => (
							<motion.div
								key={item.step}
								initial={{ opacity: 0, y: 30 }}
								animate={processInView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.55, delay: i * 0.12 }}
								className="group bg-gray-950 p-8 hover:bg-gray-900 transition-colors duration-400 cursor-default"
							>
								{/* Animated circle */}
								<motion.div
									whileHover={{ scale: 1.05 }}
									className="w-12 h-12 border border-amber-400/25 group-hover:border-amber-400 group-hover:bg-amber-400/5 rounded-full flex items-center justify-center mb-6 transition-all duration-400"
								>
									<span className="font-black text-amber-400 text-sm">{item.step}</span>
								</motion.div>

								{/* Animated connector line (desktop) */}
								{i < 3 && (
									<motion.div
										initial={{ scaleX: 0 }}
										animate={processInView ? { scaleX: 1 } : {}}
										transition={{ duration: 0.8, delay: i * 0.12 + 0.5 }}
										className="hidden lg:block absolute top-[52px] left-full w-[1px] h-px bg-amber-400/20 origin-left"
									/>
								)}

								<span className="inline-block px-2 py-0.5 bg-white/5 text-gray-600 text-[9px] uppercase tracking-widest rounded-full mb-3">
									{item.detail}
								</span>
								<h3 className="font-display font-black text-xl text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
									{item.label}
								</h3>
								<p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-500 transition-colors duration-300">
									{item.desc}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* ── CTA ───────────────────────────────────────────────── */}
			<section ref={ctaRef} className="py-16 sm:py-24 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={ctaInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
						className="relative bg-gray-950 rounded-3xl p-8 sm:p-14 lg:p-20 overflow-hidden text-center"
					>
						{/* Pulsing amber glow */}
						<motion.div
							animate={{ scale: [1, 1.35, 1], opacity: [0.14, 0.28, 0.14] }}
							transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
							className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-96 h-96 bg-amber-400 rounded-full blur-[100px] pointer-events-none"
						/>
						{/* Grid overlay */}
						<div
							className="absolute inset-0 opacity-[0.025] pointer-events-none"
							style={{
								backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
								backgroundSize: '48px 48px',
							}}
						/>

						<div className="relative z-10">
							<motion.div
								initial={{ opacity: 0, scale: 0.85 }}
								animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
								transition={{ delay: 0.15 }}
								className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-amber-400/30 rounded-full mb-8"
							>
								<span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
								<span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.18em]">
									Ready to Build?
								</span>
							</motion.div>

							<motion.h2
								initial={{ opacity: 0, y: 30 }}
								animate={ctaInView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: 0.2 }}
								className="font-display text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight mb-6"
							>
								Not sure which service
								<br />
								<span className="text-amber-400">you need?</span>
							</motion.h2>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={ctaInView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: 0.3 }}
								className="text-gray-500 text-base sm:text-lg max-w-lg mx-auto mb-10"
							>
								Tell us your challenge. We'll recommend the right approach and build a tailored proposal
								within 24 hours.
							</motion.p>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={ctaInView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: 0.4 }}
								className="flex flex-col sm:flex-row gap-3 justify-center"
							>
								<Link
									to="/contact"
									className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-gray-950 font-bold rounded-full hover:bg-amber-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-400/25 transition-all duration-300 text-sm"
								>
									Get a Free Consultation
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
		</>
	);
};

export default Services;
