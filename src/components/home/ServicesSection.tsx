import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Globe, Smartphone, Cloud, Palette, BarChart3, Cpu, ArrowUpRight } from 'lucide-react';

const services = [
	{
		icon: Globe,
		number: '01',
		title: 'Web Development',
		desc: 'High-performance web applications built with modern frameworks, optimized for speed, SEO, and global scale.',
		tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
		metric: '3× faster',
		metricLabel: 'avg. load time',
	},
	{
		icon: Smartphone,
		number: '02',
		title: 'Mobile Applications',
		desc: 'Native and cross-platform mobile apps for iOS and Android that deliver seamless user experiences.',
		tags: ['Flutter', 'React Native', 'Swift', 'Kotlin'],
		metric: '4.9★',
		metricLabel: 'avg. app rating',
	},
	{
		icon: Cloud,
		number: '03',
		title: 'Cloud & DevOps',
		desc: 'Scalable cloud infrastructure, CI/CD pipelines, and DevOps practices for reliable, fast deployments.',
		tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
		metric: '99.9%',
		metricLabel: 'uptime SLA',
	},
	{
		icon: Palette,
		number: '04',
		title: 'UI/UX Design',
		desc: 'Research-driven design systems and interfaces that convert visitors into loyal customers.',
		tags: ['Figma', 'Design Systems', 'Prototyping'],
		metric: '+62%',
		metricLabel: 'conversion lift',
	},
	{
		icon: BarChart3,
		number: '05',
		title: 'ERP & Business Systems',
		desc: 'End-to-end enterprise resource planning systems tailored to your business workflows and operations.',
		tags: ['Custom ERP', 'CRM', 'Analytics', 'Dashboards'],
		metric: '40%',
		metricLabel: 'cost reduction',
	},
	{
		icon: Cpu,
		number: '06',
		title: 'AI & Automation',
		desc: 'Intelligent automation, machine learning integrations, and AI-powered features that give you an edge.',
		tags: ['Python', 'TensorFlow', 'OpenAI', 'Automation'],
		metric: '10×',
		metricLabel: 'productivity gain',
	},
];

const ServiceCard = ({ service, index, inView }: { service: typeof services[0]; index: number; inView: boolean }) => {
	const [hovered, setHovered] = useState(false);
	const Icon = service.icon;

	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			animate={inView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.55, delay: index * 0.08 }}
			onHoverStart={() => setHovered(true)}
			onHoverEnd={() => setHovered(false)}
			className="relative group bg-white border border-gray-100 rounded-2xl p-7 sm:p-8 overflow-hidden cursor-pointer transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#e8f9fb]/60 hover:border-[#9fe9f2]"
		>
			{/* Animated background fill */}
			<motion.div
				initial={{ scaleY: 0 }}
				animate={{ scaleY: hovered ? 1 : 0 }}
				transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
				className="absolute inset-0 bg-[#241678] origin-bottom rounded-2xl z-0"
			/>

			<div className="relative z-10">
				<div className="flex items-start justify-between mb-7">
					<motion.div
						animate={{ backgroundColor: hovered ? 'rgba(9,186,207,0.15)' : 'rgba(9,186,207,0.08)' }}
						className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
					>
						<Icon className={`w-5 h-5 transition-colors duration-300 ${hovered ? 'text-[#09BACF]' : 'text-[#09BACF]'}`} />
					</motion.div>
					<span className={`font-black text-5xl leading-none transition-colors duration-300 ${hovered ? 'text-white/10' : 'text-gray-50'}`}>
						{service.number}
					</span>
				</div>

				{/* Metric pill */}
				<AnimatePresence>
					{hovered && (
						<motion.div
							initial={{ opacity: 0, y: -8, scale: 0.9 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -8, scale: 0.9 }}
							transition={{ duration: 0.25 }}
							className="inline-flex items-baseline gap-1.5 px-3 py-1 bg-[#09BACF] rounded-full mb-4"
						>
							<span className="text-gray-950 font-black text-sm">{service.metric}</span>
							<span className="text-gray-950/60 text-xs">{service.metricLabel}</span>
						</motion.div>
					)}
				</AnimatePresence>

				<h3 className={`font-bold text-lg mb-2.5 transition-colors duration-300 ${hovered ? 'text-white' : 'text-gray-950'}`}>
					{service.title}
				</h3>
				<p className={`text-sm leading-relaxed mb-5 transition-colors duration-300 ${hovered ? 'text-gray-400' : 'text-gray-500'}`}>
					{service.desc}
				</p>

				<div className="flex flex-wrap gap-1.5 mb-5">
					{service.tags.map((tag) => (
						<span
							key={tag}
							className={`px-2.5 py-1 text-xs rounded-full border transition-all duration-300 ${
								hovered
									? 'border-white/10 text-gray-400 bg-white/5'
									: 'border-gray-100 text-gray-500 bg-gray-50'
							}`}
						>
							{tag}
						</span>
					))}
				</div>

				<div className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${hovered ? 'text-[#09BACF]' : 'text-gray-400'}`}>
					Learn more
					<ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${hovered ? 'translate-x-0.5 -translate-y-0.5' : ''}`} />
				</div>
			</div>
		</motion.div>
	);
};

const ServicesSection = () => {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true, margin: '-80px' });

	return (
		<section ref={ref} className="py-24 sm:py-32 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-20">
					<div>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							className="text-[#09BACF] text-xs font-semibold uppercase tracking-[0.2em] mb-4"
						>
							What We Do
						</motion.p>
						<motion.h2
							initial={{ opacity: 0, y: 30 }}
							animate={inView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.1 }}
							className="font-display text-5xl sm:text-6xl font-black text-gray-950 leading-[0.95] tracking-tight"
						>
							Services built
							<br />
							<span className="text-gray-300">for the world.</span>
						</motion.h2>
					</div>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ delay: 0.2 }}
						className="text-gray-400 max-w-xs leading-relaxed text-sm lg:text-right"
					>
						From concept to deployment, we cover every layer of the digital stack with precision and craft.
					</motion.p>
				</div>

				{/* Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{services.map((service, i) => (
						<ServiceCard key={service.number} service={service} index={i} inView={inView} />
					))}
				</div>
			</div>
		</section>
	);
};

export default ServicesSection;