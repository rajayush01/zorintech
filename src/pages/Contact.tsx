import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Mail, Phone, MapPin, Send, Check } from 'lucide-react';

const budgets = ['< $10K', '$10K – $25K', '$25K – $50K', '$50K – $100K', '$100K+'];
const serviceOptions = [
	'Web Development',
	'Mobile App',
	'Cloud & DevOps',
	'UI/UX Design',
	'ERP System',
	'AI & Automation',
];

const faqs = [
	{
		q: 'How long does a typical project take?',
		a: 'Most MVPs take 6–10 weeks. Larger enterprise projects typically run 3–6 months. We provide a detailed timeline after our discovery call.',
	},
	{
		q: 'Do you work with startups?',
		a: 'Absolutely. We work with everyone from pre-seed startups to Fortune 500 companies. Our process scales to fit your stage and budget.',
	},
	{
		q: 'What does your process look like?',
		a: 'Discovery → Design → Build → Launch. We run agile sprints with weekly demos so you always know where things stand.',
	},
	{
		q: 'Do you offer ongoing support?',
		a: 'Yes. We offer retainer-based support and maintenance packages for all products we build.',
	},
];

const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
	const [open, setOpen] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay: index * 0.08 }}
			className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-[#09BACF]/30 transition-colors duration-300"
		>
			<button
				onClick={() => setOpen(!open)}
				className="w-full flex items-center justify-between p-5 text-left group"
			>
				<span className="font-semibold text-gray-950 text-sm pr-4 leading-snug">{question}</span>
				<motion.div
					animate={{ rotate: open ? 45 : 0 }}
					transition={{ duration: 0.25 }}
					className="w-8 h-8 border border-gray-200 group-hover:border-[#09BACF] group-hover:bg-[#09BACF] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
				>
					<ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-950 transition-colors duration-300" />
				</motion.div>
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
						className="overflow-hidden"
					>
						<p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{answer}</p>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

const Contact = () => {
	const formRef = useRef(null);
	const faqRef = useRef(null);
	const formInView = useInView(formRef, { once: true, margin: '-80px' });
	const faqInView = useInView(faqRef, { once: true, margin: '-80px' });

	const [form, setForm] = useState({ name: '', email: '', company: '', service: '', budget: '', message: '' });
	const [submitted, setSubmitted] = useState(false);
	const [focused, setFocused] = useState<string | null>(null);
	const [step, setStep] = useState(0);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
	};

	const inputBase =
		'w-full bg-white border rounded-xl px-4 py-3.5 text-sm text-gray-950 placeholder-gray-300 outline-none transition-all duration-300';
	const inputClass = (field: string) =>
		`${inputBase} ${
			focused === field
				? 'border-[#09BACF] shadow-[0_0_0_3px_rgba(9,186,207,0.1)]'
				: 'border-gray-200 hover:border-gray-300'
		}`;

	const steps = ['Contact', 'Project', 'Message'];

	return (
		<>
			{/* ── Hero ─────────────────────────────────────────────── */}
			<section className="relative bg-white pt-32 pb-28 sm:pt-44 sm:pb-36 overflow-hidden">
				<div
					className="absolute inset-0 opacity-[0.035] pointer-events-none"
					style={{
						backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`,
						backgroundSize: '56px 56px',
					}}
				/>
				<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#09BACF]/6 rounded-full blur-[120px] pointer-events-none" />
				<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#241678]/4 rounded-full blur-[100px] pointer-events-none" />

				<motion.div
					animate={{ scale: [1, 1.25, 1], opacity: [0.06, 0.16, 0.06] }}
					transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
					className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#09BACF] rounded-full blur-[140px] pointer-events-none"
				/>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-[#09BACF] text-xs font-bold uppercase tracking-[0.25em] mb-6"
					>
						Get In Touch
					</motion.p>

					<div className="overflow-hidden mb-2">
						<motion.h1
							initial={{ y: 80, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
							className="font-display text-6xl sm:text-7xl lg:text-[6.5rem] font-black text-gray-950 leading-[0.92] tracking-tight"
						>
							Let's build
						</motion.h1>
					</div>
					<div className="overflow-hidden mb-10">
						<motion.h1
							initial={{ y: 80, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
							className="font-display text-6xl sm:text-7xl lg:text-[6.5rem] font-black text-[#09BACF] leading-[0.92] tracking-tight"
						>
							something great.
						</motion.h1>
					</div>

					<motion.p
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.35 }}
						className="text-gray-500 text-base sm:text-lg max-w-lg leading-relaxed mb-8"
					>
						Tell us about your project. We'll get back to you within 24 hours with a tailored proposal.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
						className="inline-flex items-center gap-2.5 px-4 py-2 border border-gray-200 rounded-full bg-white shadow-sm"
					>
						<span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
						<span className="text-gray-400 text-xs font-medium">Average response time: under 4 hours</span>
					</motion.div>
				</div>
			</section>

			{/* ── Form + Info ───────────────────────────────────────── */}
			<section className="py-16 sm:py-24 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16">

						{/* ── Form ── */}
						<motion.div
							ref={formRef}
							initial={{ opacity: 0, x: -30 }}
							animate={formInView ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
						>
							<AnimatePresence mode="wait">
								{submitted ? (
									<motion.div
										key="success"
										initial={{ opacity: 0, scale: 0.92 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
										className="flex flex-col items-center justify-center text-center py-28 px-8 bg-[#FAFAFA] rounded-3xl border border-gray-100"
									>
										<motion.div
											initial={{ scale: 0, rotate: -20 }}
											animate={{ scale: 1, rotate: 0 }}
											transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.15 }}
											className="w-20 h-20 bg-[#09BACF] rounded-full flex items-center justify-center mb-8"
										>
											<Check className="w-10 h-10 text-gray-950" />
										</motion.div>
										<motion.h3
											initial={{ opacity: 0, y: 16 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.3 }}
											className="font-display font-black text-4xl text-gray-950 mb-3"
										>
											Message sent.
										</motion.h3>
										<motion.p
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.4 }}
											className="text-gray-400 text-sm max-w-xs leading-relaxed"
										>
											Thanks for reaching out. We'll review your project and get back to you within 24 hours.
										</motion.p>
									</motion.div>
								) : (
									<motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
										{/* Step indicator */}
										<div className="flex items-center gap-0 mb-8">
											{steps.map((s, i) => (
												<div key={s} className="flex items-center">
													<div
														className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
															i === step
																? 'bg-[#09BACF] text-gray-950'
																: i < step
																? 'text-gray-400'
																: 'text-gray-300'
														}`}
													>
														{i < step ? <Check className="w-3 h-3" /> : <span>{i + 1}</span>}
														{s}
													</div>
													{i < steps.length - 1 && (
														<div className={`w-8 h-px mx-1 transition-colors duration-500 ${i < step ? 'bg-[#09BACF]' : 'bg-gray-200'}`} />
													)}
												</div>
											))}
										</div>

										<AnimatePresence mode="wait">
											{/* Step 0 — Contact */}
											{step === 0 && (
												<motion.div
													key="step0"
													initial={{ opacity: 0, x: 20 }}
													animate={{ opacity: 1, x: 0 }}
													exit={{ opacity: 0, x: -20 }}
													transition={{ duration: 0.3 }}
													className="space-y-5"
												>
													<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
														<div>
															<label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">Your Name *</label>
															<input
																required type="text" placeholder="Alex Johnson"
																value={form.name}
																onChange={(e) => setForm({ ...form, name: e.target.value })}
																onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
																className={inputClass('name')}
															/>
														</div>
														<div>
															<label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">Email Address *</label>
															<input
																required type="email" placeholder="alex@company.com"
																value={form.email}
																onChange={(e) => setForm({ ...form, email: e.target.value })}
																onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
																className={inputClass('email')}
															/>
														</div>
													</div>
													<div>
														<label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">Company</label>
														<input
															type="text" placeholder="Your company name"
															value={form.company}
															onChange={(e) => setForm({ ...form, company: e.target.value })}
															onFocus={() => setFocused('company')} onBlur={() => setFocused(null)}
															className={inputClass('company')}
														/>
													</div>
													<div className="flex justify-end">
														<motion.button
															type="button" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
															onClick={() => form.name && form.email && setStep(1)}
															className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#09BACF] text-gray-950 font-bold rounded-full hover:bg-[#34cee0] hover:shadow-xl hover:shadow-[#09BACF]/25 transition-all duration-300 text-sm"
														>
															Next: Project Details
															<ArrowUpRight className="w-4 h-4" />
														</motion.button>
													</div>
												</motion.div>
											)}

											{/* Step 1 — Project */}
											{step === 1 && (
												<motion.div
													key="step1"
													initial={{ opacity: 0, x: 20 }}
													animate={{ opacity: 1, x: 0 }}
													exit={{ opacity: 0, x: -20 }}
													transition={{ duration: 0.3 }}
													className="space-y-6"
												>
													<div>
														<label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-3">Service Needed</label>
														<div className="flex flex-wrap gap-2">
															{serviceOptions.map((s) => (
																<motion.button
																	key={s} type="button"
																	whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
																	onClick={() => setForm({ ...form, service: s })}
																	className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-250 ${
																		form.service === s
																			? 'bg-[#09BACF] text-gray-950 border-[#09BACF]'
																			: 'border-gray-200 text-gray-500 hover:border-[#09BACF]/40'
																	}`}
																>
																	{s}
																</motion.button>
															))}
														</div>
													</div>
													<div>
														<label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-3">Project Budget</label>
														<div className="flex flex-wrap gap-2">
															{budgets.map((b) => (
																<motion.button
																	key={b} type="button"
																	whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
																	onClick={() => setForm({ ...form, budget: b })}
																	className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-250 ${
																		form.budget === b
																			? 'bg-[#09BACF] text-gray-950 border-[#09BACF]'
																			: 'border-gray-200 text-gray-500 hover:border-[#09BACF]/40'
																	}`}
																>
																	{b}
																</motion.button>
															))}
														</div>
													</div>
													<div className="flex justify-between">
														<button type="button" onClick={() => setStep(0)} className="text-sm text-gray-400 hover:text-gray-700 transition-colors font-medium">← Back</button>
														<motion.button
															type="button" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
															onClick={() => setStep(2)}
															className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#09BACF] text-gray-950 font-bold rounded-full hover:bg-[#34cee0] hover:shadow-xl hover:shadow-[#09BACF]/25 transition-all duration-300 text-sm"
														>
															Next: Your Message
															<ArrowUpRight className="w-4 h-4" />
														</motion.button>
													</div>
												</motion.div>
											)}

											{/* Step 2 — Message */}
											{step === 2 && (
												<motion.div
													key="step2"
													initial={{ opacity: 0, x: 20 }}
													animate={{ opacity: 1, x: 0 }}
													exit={{ opacity: 0, x: -20 }}
													transition={{ duration: 0.3 }}
													className="space-y-5"
												>
													<div>
														<label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">Tell Us About Your Project *</label>
														<textarea
															required rows={6}
															placeholder="Describe your project, goals, timeline, and any specific requirements..."
															value={form.message}
															onChange={(e) => setForm({ ...form, message: e.target.value })}
															onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
															className={`${inputClass('message')} resize-none`}
														/>
													</div>

													{(form.service || form.budget) && (
														<div className="flex flex-wrap gap-2">
															{form.service && (
																<span className="px-3 py-1 bg-[#e8f9fb] text-[#09BACF] text-xs font-bold rounded-full border border-[#cdf3f8]">{form.service}</span>
															)}
															{form.budget && (
																<span className="px-3 py-1 bg-[#09BACF] text-gray-950 text-xs font-bold rounded-full">{form.budget}</span>
															)}
														</div>
													)}

													<div className="flex justify-between items-center">
														<button type="button" onClick={() => setStep(1)} className="text-sm text-gray-400 hover:text-gray-700 transition-colors font-medium">← Back</button>
														<motion.button
															type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
															className="group inline-flex items-center gap-2 px-8 py-4 bg-[#09BACF] text-gray-950 font-bold rounded-full hover:bg-[#34cee0] hover:shadow-xl hover:shadow-[#09BACF]/25 transition-all duration-300 text-sm"
														>
															Send Message
															<Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
														</motion.button>
													</div>
												</motion.div>
											)}
										</AnimatePresence>
									</motion.form>
								)}
							</AnimatePresence>
						</motion.div>

						{/* ── Info sidebar ── */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							animate={formInView ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
							className="space-y-4"
						>
							{/* Contact details card — light theme */}
							<div className="bg-[#FAFAFA] border border-gray-100 rounded-2xl p-7 relative overflow-hidden">
								{/* Top cyan stripe */}
								<div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#09BACF] to-[#34cee0]" />
								{/* Subtle blob */}
								<div className="absolute top-0 right-0 w-40 h-40 bg-[#09BACF]/8 rounded-full blur-[60px] pointer-events-none" />

								<div className="relative z-10 space-y-5">
									<p className="text-[#09BACF] text-[10px] font-bold uppercase tracking-[0.25em]">Contact Details</p>
									{[
										{ icon: Mail, label: 'Email', value: 'hello@zorintech.com', href: 'mailto:hello@zorintech.com' },
										{ icon: Phone, label: 'Phone', value: '+1 (234) 567-890', href: 'tel:+1234567890' },
										{ icon: MapPin, label: 'HQ', value: 'San Francisco, CA', href: '#' },
									].map((item) => {
										const Icon = item.icon;
										return (
											<a key={item.label} href={item.href} className="flex items-start gap-3 group">
												<div className="w-9 h-9 bg-white border border-gray-100 group-hover:bg-[#09BACF] group-hover:border-[#09BACF] rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300">
													<Icon className="w-4 h-4 text-gray-400 group-hover:text-gray-950 transition-colors duration-300" />
												</div>
												<div>
													<p className="text-gray-400 text-[10px] uppercase tracking-widest">{item.label}</p>
													<p className="text-gray-950 text-sm font-medium group-hover:text-[#09BACF] transition-colors duration-300">
														{item.value}
													</p>
												</div>
											</a>
										);
									})}
								</div>
							</div>

							{/* Offices card */}
							<div className="bg-white border border-gray-100 rounded-2xl p-7">
								<p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-5">Our Offices</p>
								<div className="space-y-4">
									{[
										{ city: 'San Francisco', country: 'United States', tag: 'HQ' },
										{ city: 'Dubai', country: 'United Arab Emirates', tag: 'MENA' },
										{ city: 'Lagos', country: 'Nigeria', tag: 'Africa' },
										{ city: 'Bangalore', country: 'India', tag: 'Asia' },
									].map((office, i) => (
										<motion.div
											key={office.city}
											initial={{ opacity: 0, x: 16 }}
											animate={formInView ? { opacity: 1, x: 0 } : {}}
											transition={{ delay: 0.3 + i * 0.07 }}
											className="flex items-center justify-between group cursor-default"
										>
											<div>
												<p className="text-gray-950 text-sm font-bold group-hover:text-[#09BACF] transition-colors duration-200">{office.city}</p>
												<p className="text-gray-400 text-xs">{office.country}</p>
											</div>
											<span className="px-2.5 py-1 bg-[#e8f9fb] text-[#09BACF] text-[10px] font-bold rounded-full border border-[#cdf3f8]">
												{office.tag}
											</span>
										</motion.div>
									))}
								</div>
							</div>

							{/* Guarantee card — uses cyan as background (accent), not navy */}
							<div className="bg-[#09BACF] rounded-2xl p-6 relative overflow-hidden">
								<div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[40px] pointer-events-none" />
								<div className="relative flex items-start gap-3">
									<div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
										<Check className="w-4 h-4 text-white" />
									</div>
									<div>
										<p className="font-black text-gray-950 text-sm mb-1">24-hour response guarantee</p>
										<p className="text-gray-950/60 text-xs leading-relaxed">
											Every inquiry gets a personal response from our team — not a bot, not a template.
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* ── FAQ ───────────────────────────────────────────────── */}
			<section ref={faqRef} className="py-20 sm:py-28 bg-[#FAFAFA]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
						<div>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={faqInView ? { opacity: 1, y: 0 } : {}}
								className="text-[#09BACF] text-xs font-bold uppercase tracking-[0.25em] mb-4"
							>
								FAQ
							</motion.p>
							<motion.h2
								initial={{ opacity: 0, y: 30 }}
								animate={faqInView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: 0.1 }}
								className="font-display text-5xl sm:text-6xl font-black text-gray-950 leading-[0.95] tracking-tight mb-6"
							>
								Common
								<br />
								<span className="text-gray-300">questions.</span>
							</motion.h2>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={faqInView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: 0.2 }}
								className="text-gray-400 text-sm leading-relaxed max-w-xs"
							>
								Still have something on your mind? Reach out and we'll answer within a few hours.
							</motion.p>

							<motion.div
								initial={{ opacity: 0 }}
								animate={faqInView ? { opacity: 1 } : {}}
								transition={{ delay: 0.4 }}
								className="flex gap-2 mt-8"
							>
								{[...Array(5)].map((_, i) => (
									<motion.div
										key={i}
										animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
										transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
										className="w-1.5 h-1.5 bg-[#09BACF] rounded-full"
									/>
								))}
							</motion.div>
						</div>

						<div className="space-y-3">
							{faqs.map((item, i) => (
								<FAQItem key={i} question={item.q} answer={item.a} index={i} />
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Contact;