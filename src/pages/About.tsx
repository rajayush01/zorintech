import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Globe2, Zap, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const team = [
	{ name: 'Alex Zorin', role: 'CEO & Co-Founder', country: 'United States', initial: 'A', specialty: 'Product Strategy' },
	{ name: 'Priya Nair', role: 'CTO', country: 'India', initial: 'P', specialty: 'Systems Architecture' },
	{ name: 'Marco Ricci', role: 'Head of Design', country: 'Italy', initial: 'M', specialty: 'UI/UX & Brand' },
	{ name: 'Fatima Al-Hassan', role: 'Lead Engineer', country: 'UAE', initial: 'F', specialty: 'Full-Stack Dev' },
	{ name: 'James Osei', role: 'DevOps Lead', country: 'Ghana', initial: 'J', specialty: 'Cloud & Infra' },
	{ name: 'Yuki Tanaka', role: 'AI Engineer', country: 'Japan', initial: 'Y', specialty: 'ML & Automation' },
];

const values = [
	{ icon: Zap, title: 'Speed with Quality', desc: 'We move fast without breaking things. Agile sprints, weekly demos, and rigorous QA — always.' },
	{ icon: Shield, title: 'Security First', desc: 'Every product we build is designed with enterprise-grade security from day one, not bolted on later.' },
	{ icon: Globe2, title: 'Global Perspective', desc: 'With teams across 3 continents, we bring diverse thinking and round-the-clock execution to every project.' },
	{ icon: TrendingUp, title: 'Outcome Obsessed', desc: 'We measure success by your KPIs, not our code commits. Business outcomes drive every decision we make.' },
];

const milestones = [
	{ year: '2016', event: 'Founded in San Francisco with a team of 4 engineers.' },
	{ year: '2018', event: 'Expanded to Europe. First enterprise client — a Fortune 500 logistics company.' },
	{ year: '2020', event: 'Launched AI practice. Grew to 40+ engineers across 3 continents.' },
	{ year: '2022', event: 'Crossed 100 projects delivered. Opened offices in Dubai and Lagos.' },
	{ year: '2024', event: '150+ projects. 40+ countries. 98% client retention rate.' },
];

const regions = [
	{ region: 'North America', projects: 48, pct: '90%' },
	{ region: 'Europe', projects: 35, pct: '70%' },
	{ region: 'Middle East & Africa', projects: 32, pct: '65%' },
	{ region: 'Asia Pacific', projects: 22, pct: '45%' },
	{ region: 'Latin America', projects: 13, pct: '28%' },
];

const About = () => {
	const heroRef = useRef<HTMLElement>(null);
	const missionRef = useRef(null);
	const valuesRef = useRef(null);
	const timelineRef = useRef(null);
	const teamRef = useRef(null);
	const ctaRef = useRef(null);

	const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
	const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

	const missionInView = useInView(missionRef, { once: true, margin: '-80px' });
	const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' });
	const timelineInView = useInView(timelineRef, { once: true, margin: '-80px' });
	const teamInView = useInView(teamRef, { once: true, margin: '-80px' });
	const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

	return (
		<>
			{/* ── Hero ─────────────────────────────────────────────── */}
			<section ref={heroRef} className="relative bg-white pt-32 pb-28 sm:pt-44 sm:pb-36 overflow-hidden">
				<div
					className="absolute inset-0 opacity-[0.035] pointer-events-none"
					style={{
						backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`,
						backgroundSize: '56px 56px',
					}}
				/>
				<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#09BACF]/6 rounded-full blur-[120px] pointer-events-none" />
				<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#241678]/4 rounded-full blur-[100px] pointer-events-none" />

				<motion.div style={{ y: heroY }} className="absolute top-1/2 right-1/4 -translate-y-1/2 pointer-events-none">
					<motion.div
						animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.2, 0.08] }}
						transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
						className="w-[600px] h-[600px] bg-[#09BACF] rounded-full blur-[150px]"
					/>
				</motion.div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-[#09BACF] text-xs font-bold uppercase tracking-[0.25em] mb-6"
					>
						About Us
					</motion.p>

					<div className="overflow-hidden mb-2">
						<motion.h1
							initial={{ y: 80, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
							className="font-display text-6xl sm:text-7xl lg:text-[6.5rem] font-black text-gray-950 leading-[0.92] tracking-tight"
						>
							We are the team
						</motion.h1>
					</div>
					<div className="overflow-hidden mb-10">
						<motion.h1
							initial={{ y: 80, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
							className="font-display text-6xl sm:text-7xl lg:text-[6.5rem] font-black text-[#09BACF] leading-[0.92] tracking-tight"
						>
							behind the build.
						</motion.h1>
					</div>

					<motion.p
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.35 }}
						className="text-gray-400 text-base sm:text-lg max-w-lg leading-relaxed mb-14"
					>
						ZorinTech is an international technology partner building world-class digital products for ambitious businesses across every industry.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.5 }}
						className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-10 border-t border-gray-100"
					>
						{[
							{ v: '8+', l: 'Years' },
							{ v: '150+', l: 'Projects' },
							{ v: '40+', l: 'Countries' },
							{ v: '98%', l: 'Retention' },
						].map((s, i) => (
							<motion.div
								key={s.l}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.6 + i * 0.08 }}
							>
								<p className="font-display text-3xl sm:text-4xl font-black text-gray-950 tabular-nums">{s.v}</p>
								<p className="text-gray-400 text-xs mt-1 tracking-[0.15em] uppercase">{s.l}</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* ── Mission ───────────────────────────────────────────── */}
			<section ref={missionRef} className="py-24 sm:py-32 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
						<div>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={missionInView ? { opacity: 1, y: 0 } : {}}
								className="text-[#09BACF] text-xs font-bold uppercase tracking-[0.25em] mb-4"
							>
								Our Mission
							</motion.p>
							<div className="overflow-hidden mb-2">
								<motion.h2
									initial={{ y: 50, opacity: 0 }}
									animate={missionInView ? { y: 0, opacity: 1 } : {}}
									transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
									className="font-display text-5xl sm:text-6xl font-black text-gray-950 leading-[0.95] tracking-tight"
								>
									Technology that
								</motion.h2>
							</div>
							<div className="overflow-hidden mb-8">
								<motion.h2
									initial={{ y: 50, opacity: 0 }}
									animate={missionInView ? { y: 0, opacity: 1 } : {}}
									transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
									className="font-display text-5xl sm:text-6xl font-black text-gray-300 leading-[0.95] tracking-tight"
								>
									moves business.
								</motion.h2>
							</div>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={missionInView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: 0.25 }}
								className="text-gray-400 leading-relaxed text-sm mb-5 max-w-md"
							>
								We founded ZorinTech with a single belief: great software should be accessible to every ambitious business, not just the ones with Silicon Valley budgets.
							</motion.p>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={missionInView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: 0.32 }}
								className="text-gray-400 leading-relaxed text-sm max-w-md"
							>
								Today, we're a global team of engineers, designers, and strategists who partner with startups and enterprises alike — delivering products that scale, perform, and create real business value.
							</motion.p>
						</div>

						{/* Right — Global reach — light card with cyan accents */}
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							animate={missionInView ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
						>
							<div className="bg-[#FAFAFA] border border-gray-100 rounded-2xl p-8 sm:p-10 relative overflow-hidden">
								{/* Top accent */}
								<div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#09BACF] to-[#34cee0]" />
								<div className="absolute top-0 right-0 w-64 h-64 bg-[#09BACF]/8 rounded-full blur-[90px] pointer-events-none" />
								<div className="relative z-10">
									<p className="text-[#09BACF] text-[10px] font-bold uppercase tracking-[0.25em] mb-7">Global Reach</p>
									<div className="space-y-5">
										{regions.map((r, i) => (
											<motion.div
												key={r.region}
												initial={{ opacity: 0, x: -16 }}
												animate={missionInView ? { opacity: 1, x: 0 } : {}}
												transition={{ delay: 0.4 + i * 0.08 }}
											>
												<div className="flex justify-between mb-2">
													<span className="text-gray-500 text-xs">{r.region}</span>
													<span className="text-[#09BACF] text-xs font-black">{r.projects}</span>
												</div>
												<div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
													<motion.div
														initial={{ width: 0 }}
														animate={missionInView ? { width: r.pct } : {}}
														transition={{ duration: 1.1, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
														className="h-full bg-[#09BACF] rounded-full"
													/>
												</div>
											</motion.div>
										))}
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* ── Values ────────────────────────────────────────────── */}
			<section ref={valuesRef} className="py-24 sm:py-32 bg-[#FAFAFA]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
						<div>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={valuesInView ? { opacity: 1, y: 0 } : {}}
								className="text-[#09BACF] text-xs font-bold uppercase tracking-[0.25em] mb-4"
							>
								What We Stand For
							</motion.p>
							<div className="overflow-hidden mb-1">
								<motion.h2
									initial={{ y: 50, opacity: 0 }}
									animate={valuesInView ? { y: 0, opacity: 1 } : {}}
									transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
									className="font-display text-5xl sm:text-6xl font-black text-gray-950 leading-[0.95] tracking-tight"
								>
									Our values
								</motion.h2>
							</div>
							<div className="overflow-hidden">
								<motion.h2
									initial={{ y: 50, opacity: 0 }}
									animate={valuesInView ? { y: 0, opacity: 1 } : {}}
									transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
									className="font-display text-5xl sm:text-6xl font-black text-gray-300 leading-[0.95] tracking-tight"
								>
									in practice.
								</motion.h2>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{values.map((v, i) => {
							const Icon = v.icon;
							return (
								<motion.div
									key={v.title}
									initial={{ opacity: 0, y: 40 }}
									animate={valuesInView ? { opacity: 1, y: 0 } : {}}
									transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
									className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#9fe9f2] hover:shadow-xl hover:shadow-[#e8f9fb]/80 transition-all duration-400 cursor-default overflow-hidden relative"
								>
									<motion.div
										initial={{ scaleX: 0 }}
										whileHover={{ scaleX: 1 }}
										transition={{ duration: 0.3 }}
										className="absolute top-0 left-0 right-0 h-[2px] bg-[#09BACF] origin-left"
									/>
									<div className="w-11 h-11 bg-gray-50 group-hover:bg-[#09BACF] rounded-xl flex items-center justify-center text-gray-400 group-hover:text-gray-950 mb-5 transition-all duration-300">
										<Icon className="w-5 h-5" />
									</div>
									<h4 className="font-black text-gray-950 mb-2 text-sm">{v.title}</h4>
									<p className="text-gray-400 text-xs leading-relaxed">{v.desc}</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* ── Timeline ──────────────────────────────────────────── */}
			<section ref={timelineRef} className="py-24 sm:py-32 bg-white overflow-hidden">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={timelineInView ? { opacity: 1, y: 0 } : {}}
						className="text-[#09BACF] text-xs font-bold uppercase tracking-[0.25em] mb-4"
					>
						Our Journey
					</motion.p>
					<div className="overflow-hidden mb-16">
						<motion.h2
							initial={{ y: 60, opacity: 0 }}
							animate={timelineInView ? { y: 0, opacity: 1 } : {}}
							transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
							className="font-display text-5xl sm:text-6xl font-black leading-[0.95] tracking-tight"
						>
							<span className="text-gray-950">8 years of</span>
							<br />
							<span className="text-gray-300">building great things.</span>
						</motion.h2>
					</div>

					<div className="relative">
						<div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px overflow-hidden">
							<motion.div
								initial={{ scaleY: 0 }}
								animate={timelineInView ? { scaleY: 1 } : {}}
								transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
								className="w-full h-full bg-gradient-to-b from-[#09BACF] via-[#09BACF]/40 to-transparent origin-top"
							/>
						</div>

						<div className="space-y-0">
							{milestones.map((m, i) => (
								<motion.div
									key={m.year}
									initial={{ opacity: 0, y: 30 }}
									animate={timelineInView ? { opacity: 1, y: 0 } : {}}
									transition={{ duration: 0.6, delay: i * 0.12 + 0.4 }}
									className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 pb-10 last:pb-0 ${
										i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
									}`}
								>
									<div className={`sm:w-[calc(50%-2.5rem)] ${i % 2 === 0 ? 'sm:pr-14 sm:text-right' : 'sm:pl-14'}`}>
										<motion.div
											whileHover={{ scale: 1.02 }}
											transition={{ type: 'spring', stiffness: 300, damping: 25 }}
											className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#9fe9f2] hover:shadow-xl hover:shadow-[#e8f9fb]/80 transition-all duration-400 cursor-default overflow-hidden relative"
										>
											<motion.div
												initial={{ scaleX: 0 }}
												whileHover={{ scaleX: 1 }}
												transition={{ duration: 0.3 }}
												className={`absolute top-0 left-0 right-0 h-[2px] bg-[#09BACF] ${i % 2 === 0 ? 'origin-right' : 'origin-left'}`}
											/>
											<span className="font-display font-black text-3xl text-[#09BACF] block mb-2 tabular-nums">
												{m.year}
											</span>
											<p className="text-gray-500 text-sm leading-relaxed">{m.event}</p>
										</motion.div>
									</div>

									<motion.div
										initial={{ scale: 0 }}
										animate={timelineInView ? { scale: 1 } : {}}
										transition={{ type: 'spring', stiffness: 260, damping: 18, delay: i * 0.12 + 0.5 }}
										className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-[#09BACF] rounded-full border-4 border-white z-10 shadow-lg shadow-[#09BACF]/30"
									/>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ── Team ──────────────────────────────────────────────── */}
			<section ref={teamRef} className="py-24 sm:py-32 bg-[#FAFAFA]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
						<div>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={teamInView ? { opacity: 1, y: 0 } : {}}
								className="text-[#09BACF] text-xs font-bold uppercase tracking-[0.25em] mb-4"
							>
								The Team
							</motion.p>
							<div className="overflow-hidden mb-1">
								<motion.h2
									initial={{ y: 50, opacity: 0 }}
									animate={teamInView ? { y: 0, opacity: 1 } : {}}
									transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
									className="font-display text-5xl sm:text-6xl font-black text-gray-950 leading-[0.95] tracking-tight"
								>
									People who
								</motion.h2>
							</div>
							<div className="overflow-hidden">
								<motion.h2
									initial={{ y: 50, opacity: 0 }}
									animate={teamInView ? { y: 0, opacity: 1 } : {}}
									transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
									className="font-display text-5xl sm:text-6xl font-black text-gray-300 leading-[0.95] tracking-tight"
								>
									make it happen.
								</motion.h2>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{team.map((member, i) => (
							<motion.div
								key={member.name}
								initial={{ opacity: 0, y: 40 }}
								animate={teamInView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
								className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#9fe9f2] hover:shadow-xl hover:shadow-[#e8f9fb]/80 transition-all duration-400 cursor-default overflow-hidden relative"
							>
								<motion.div
									initial={{ scaleX: 0 }}
									whileHover={{ scaleX: 1 }}
									transition={{ duration: 0.4 }}
									className="absolute top-0 left-0 right-0 h-[2px] bg-[#09BACF] origin-left"
								/>

								<div className="flex items-center gap-4 mb-5">
									<motion.div
										whileHover={{ rotate: [0, -6, 6, 0] }}
										transition={{ duration: 0.4 }}
										className="w-14 h-14 bg-gray-100 group-hover:bg-[#09BACF] rounded-xl flex items-center justify-center text-gray-400 group-hover:text-gray-950 font-black text-xl transition-all duration-300 flex-shrink-0"
									>
										{member.initial}
									</motion.div>
									<div>
										<p className="font-black text-gray-950 text-sm">{member.name}</p>
										<p className="text-gray-400 text-xs">{member.role}</p>
									</div>
								</div>

								<div className="flex items-center justify-between">
									<span className="text-[10px] text-gray-400 uppercase tracking-widest">{member.country}</span>
									<span className="px-2.5 py-1 bg-[#e8f9fb] text-[#0a9db0] text-[10px] font-bold rounded-full border border-[#cdf3f8]">
										{member.specialty}
									</span>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* ── CTA ───────────────────────────────────────────────── */}
			<section ref={ctaRef} className="py-16 sm:py-24 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="relative bg-white border border-gray-100 rounded-3xl p-8 sm:p-14 lg:p-20 overflow-hidden shadow-sm text-center">
						{/* Top cyan stripe */}
						<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#09BACF] via-[#34cee0] to-transparent" />

						{/* Blobs */}
						<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-96 h-96 bg-[#09BACF]/8 rounded-full blur-[100px] pointer-events-none" />
						<div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#241678]/4 rounded-full blur-[80px] pointer-events-none" />

						{/* Dot grid */}
						<div
							className="absolute inset-0 opacity-[0.025] pointer-events-none"
							style={{
								backgroundImage: 'radial-gradient(circle, #09BACF 1px, transparent 1px)',
								backgroundSize: '32px 32px',
							}}
						/>

						<div className="relative z-10">
							<motion.div
								initial={{ opacity: 0, scale: 0.85 }}
								animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
								transition={{ delay: 0.1 }}
								className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#09BACF]/30 bg-[#e8f9fb] rounded-full mb-8"
							>
								<span className="w-1.5 h-1.5 bg-[#09BACF] rounded-full animate-pulse" />
								<span className="text-[#09BACF] text-xs font-semibold uppercase tracking-[0.18em]">Join Our Journey</span>
							</motion.div>

							<motion.h2
								initial={{ opacity: 0, y: 30 }}
								animate={ctaInView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: 0.2 }}
								className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 leading-[0.95] tracking-tight mb-4"
							>
								Let's build something
								<br />
								<span className="text-[#09BACF]">remarkable together.</span>
							</motion.h2>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={ctaInView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: 0.28 }}
								className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto mb-10"
							>
								Ready to start your next project? We're here to help you build something you're proud of.
							</motion.p>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={ctaInView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: 0.35 }}
								className="flex flex-col sm:flex-row gap-3 justify-center"
							>
								<Link
									to="/contact"
									className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#09BACF] text-gray-950 font-bold rounded-full hover:bg-[#34cee0] hover:scale-105 hover:shadow-xl hover:shadow-[#09BACF]/25 transition-all duration-300 text-sm"
								>
									Start a Project
									<ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
								</Link>
								<Link
									to="/work"
									className="inline-flex items-center justify-center px-8 py-4 border border-gray-200 text-gray-600 font-medium rounded-full hover:border-gray-400 hover:text-gray-950 transition-all duration-300 text-sm"
								>
									See Our Work
								</Link>
							</motion.div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default About;