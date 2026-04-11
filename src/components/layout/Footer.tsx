import { Link } from 'react-router-dom';
import { ArrowUpRight, Linkedin, Twitter, Instagram, Github, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from "../../assets/logo-nobg.png"

const Footer = () => {
	const year = new Date().getFullYear();

	const services = [
		{ label: 'Web Development', href: '#' },
		{ label: 'Mobile Apps', href: '#' },
		{ label: 'Cloud Solutions', href: '#' },
		{ label: 'UI/UX Design', href: '#' },
		{ label: 'ERP Systems', href: '#' },
		{ label: 'AI Integration', href: '#' },
	];

	const company = [
		{ label: 'About Us', href: '/about' },
		{ label: 'Our Work', href: '/work' },
		{ label: 'Careers', href: '#' },
		{ label: 'Blog', href: '#' },
		{ label: 'Contact', href: '/contact' },
	];

	const socials = [
		{ icon: <Linkedin className="w-4 h-4" />, href: '#', label: 'LinkedIn' },
		{ icon: <Twitter className="w-4 h-4" />, href: '#', label: 'Twitter' },
		{ icon: <Instagram className="w-4 h-4" />, href: '#', label: 'Instagram' },
		{ icon: <Github className="w-4 h-4" />, href: '#', label: 'GitHub' },
	];

	return (
		<footer className="relative bg-[#FAFAFA] overflow-hidden">
			{/* Subtle top accent line */}
			<div className="h-px w-full bg-gradient-to-r from-transparent via-[#09BACF]/40 to-transparent" />

			{/* Background decorative elements */}
			<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#09BACF]/5 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#241678]/5 rounded-full blur-[100px] pointer-events-none" />

			{/* Grid dot pattern */}
			<div
				className="absolute inset-0 opacity-[0.025] pointer-events-none"
				style={{
					backgroundImage: 'radial-gradient(circle, #241678 1px, transparent 1px)',
					backgroundSize: '32px 32px',
				}}
			/>

			{/* CTA Banner */}
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12">
				<div className="relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm shadow-gray-100 p-8 sm:p-12 lg:p-14">
					{/* Cyan accent stripe */}
					<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#09BACF] via-[#34cee0] to-transparent" />

					{/* Decorative number */}
					<span className="absolute right-8 top-4 text-[10rem] font-black leading-none text-gray-50 select-none pointer-events-none">
						↗
					</span>

					<div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
						<div className="max-w-lg">
							<p className="text-[#09BACF] text-xs font-bold uppercase tracking-[0.2em] mb-4">
								Ready to start?
							</p>
							<h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tight text-gray-950 mb-4">
								Let's build{' '}
								<span className="text-[#09BACF]">something</span>
								<br />
								<span className="text-gray-300">extraordinary.</span>
							</h2>
							<p className="text-gray-400 text-sm leading-relaxed">
								Tell us about your vision — we'll respond within 24 hours with a tailored plan.
							</p>
						</div>

						<div className="flex flex-col gap-3 flex-shrink-0">
							<Link
								to="/contact"
								className="group inline-flex items-center gap-3 px-8 py-4 bg-[#09BACF] text-gray-950 rounded-full font-bold text-sm hover:bg-[#07a8bc] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#09BACF]/25"
							>
								Start a Project
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</Link>
							<Link
								to="/work"
								className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-200 text-gray-500 rounded-full font-medium text-sm hover:border-gray-400 hover:text-gray-950 transition-all duration-300"
							>
								View Our Work
								<ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Main Footer Grid */}
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
				<div className="grid grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

					{/* Brand Column */}
					<div className="col-span-2 lg:col-span-4 flex flex-col gap-6">
						<Link to="/" className="inline-flex items-center gap-2.5 group w-fit">
							<div>
								<img src={logo} alt="" />
							</div>
						</Link>

						<p className="text-gray-400 text-sm leading-relaxed max-w-xs">
							Engineering world-class digital products for ambitious businesses across 40+ countries.
						</p>

						{/* Social icons */}
						<div className="flex gap-2">
							{socials.map((s) => (
								<a
									key={s.label}
									href={s.href}
									aria-label={s.label}
									className="group w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#09BACF] hover:border-[#09BACF] transition-all duration-200"
								>
									{s.icon}
								</a>
							))}
						</div>

						{/* Availability badge */}
						<div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-100 rounded-full w-fit shadow-sm">
							<span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
							<span className="text-gray-500 text-xs font-medium">Available for new projects</span>
						</div>
					</div>

					{/* Spacer on large */}
					<div className="hidden lg:block lg:col-span-1" />

					{/* Services */}
					<div className="col-span-1 lg:col-span-2">
						<h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-5 flex items-center gap-2">
							<span className="w-3 h-px bg-[#09BACF]" />
							Services
						</h4>
						<ul className="space-y-3">
							{services.map((s) => (
								<li key={s.label}>
									<a
										href={s.href}
										className="group flex items-center gap-1.5 text-gray-400 hover:text-gray-950 text-xs transition-colors duration-200"
									>
										<span className="w-0 group-hover:w-2 h-px bg-[#09BACF] transition-all duration-200 flex-shrink-0" />
										{s.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Company */}
					<div className="col-span-1 lg:col-span-2">
						<h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-5 flex items-center gap-2">
							<span className="w-3 h-px bg-[#09BACF]" />
							Company
						</h4>
						<ul className="space-y-3">
							{company.map((co) => (
								<li key={co.label}>
									<Link
										to={co.href}
										className="group flex items-center gap-1.5 text-gray-400 hover:text-gray-950 text-xs transition-colors duration-200"
									>
										<span className="w-0 group-hover:w-2 h-px bg-[#09BACF] transition-all duration-200 flex-shrink-0" />
										{co.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact */}
					<div className="col-span-2 lg:col-span-3">
						<h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-5 flex items-center gap-2">
							<span className="w-3 h-px bg-[#09BACF]" />
							Contact
						</h4>
						<ul className="space-y-4">
							<li>
								<a
									href="mailto:hello@zorintech.com"
									className="group flex items-start gap-3 text-xs text-gray-400 hover:text-gray-950 transition-colors duration-200"
								>
									<Mail className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 group-hover:text-[#09BACF] transition-colors" />
									hello@zorintech.com
								</a>
							</li>
							<li>
								<a
									href="tel:+1234567890"
									className="group flex items-start gap-3 text-xs text-gray-400 hover:text-gray-950 transition-colors duration-200"
								>
									<Phone className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 group-hover:text-[#09BACF] transition-colors" />
									+1 (234) 567-890
								</a>
							</li>
							<li className="flex items-start gap-3 text-xs text-gray-400">
								<MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#09BACF]" />
								<span className="leading-relaxed">
									San Francisco, CA<br />United States
								</span>
							</li>
						</ul>

						{/* Mini stat strip */}
						<div className="mt-6 flex gap-4">
							{[{ v: '150+', l: 'Projects' }, { v: '40+', l: 'Countries' }, { v: '98%', l: 'Retention' }].map((s) => (
								<div key={s.l} className="flex flex-col">
									<span className="font-black text-base text-gray-950 leading-none">{s.v}</span>
									<span className="text-[10px] text-gray-400 mt-0.5">{s.l}</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="mt-14 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
					<div className="flex items-center gap-2.5">
						<div className="w-5 h-5 bg-[#09BACF]/10 border border-[#09BACF]/20 rounded flex items-center justify-center flex-shrink-0">
							<span className="text-[#09BACF] font-black text-[9px]">Z</span>
						</div>
						<p className="text-gray-300 text-xs">© {year} ZorinTech. All rights reserved.</p>
					</div>
					<div className="flex gap-6 text-xs text-gray-300">
						<a href="#" className="hover:text-[#09BACF] transition-colors duration-200">Privacy Policy</a>
						<span className="text-gray-200">·</span>
						<a href="#" className="hover:text-[#09BACF] transition-colors duration-200">Terms of Service</a>
						<span className="text-gray-200">·</span>
						<a href="#" className="hover:text-[#09BACF] transition-colors duration-200">Cookies</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;