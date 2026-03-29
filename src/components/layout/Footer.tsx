import { Link } from 'react-router-dom';
import { ArrowUpRight, Linkedin, Twitter, Instagram, Github } from 'lucide-react';

const Footer = () => {
	const year = new Date().getFullYear();

	const services = ['Web Development', 'Mobile Apps', 'Cloud Solutions', 'UI/UX Design', 'ERP Systems', 'AI Integration'];
	const company = ['About Us', 'Our Work', 'Careers', 'Blog', 'Contact'];
	const socials = [
		{ icon: <Linkedin className="w-4 h-4" />, href: '#', label: 'LinkedIn' },
		{ icon: <Twitter className="w-4 h-4" />, href: '#', label: 'Twitter' },
		{ icon: <Instagram className="w-4 h-4" />, href: '#', label: 'Instagram' },
		{ icon: <Github className="w-4 h-4" />, href: '#', label: 'GitHub' },
	];

	return (
		<footer className="bg-white text-gray-950 border-t border-gray-100">
			{/* Top CTA band */}
			<div className="border-b border-gray-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
					<div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
						<div>
							<p className="text-[#09BACF] text-xs font-bold uppercase tracking-[0.2em] mb-5">Ready to start?</p>
							<h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight text-gray-950">
								Let's build
								<br />
								<span className="text-[#09BACF]">something great.</span>
							</h2>
						</div>
						<Link
							to="/contact"
							className="group inline-flex items-center gap-3 px-8 py-4 bg-[#241678] text-white border border-[#241678] rounded-full hover:bg-[#09BACF] hover:border-[#09BACF] transition-all duration-300 text-base font-semibold flex-shrink-0"
						>
							Get in touch
							<ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
						</Link>
					</div>
				</div>
			</div>

			{/* Main grid */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
				<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
					{/* Brand */}
					<div className="col-span-2 sm:col-span-2 lg:col-span-1">
						<Link to="/" className="inline-flex items-center gap-2 mb-5">
							<div className="w-8 h-8 bg-[#241678] rounded-lg flex items-center justify-center">
								<span className="text-white font-black text-sm">Z</span>
							</div>
							<span className="font-display font-black text-xl text-gray-950">
								Zorin<span className="text-[#09BACF]">Tech</span>
							</span>
						</Link>
						<p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
							Building world-class digital products for ambitious businesses worldwide.
						</p>
						<div className="flex gap-2.5">
							{socials.map((s) => (
								<a
									key={s.label}
									href={s.href}
									aria-label={s.label}
									className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-[#09BACF] hover:border-[#09BACF]/40 transition-all duration-200"
								>
									{s.icon}
								</a>
							))}
						</div>
					</div>

					{/* Services */}
					<div>
						<h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-5">Services</h4>
						<ul className="space-y-3">
							{services.map((s) => (
								<li key={s}>
									<a href="#" className="text-gray-400 hover:text-[#241678] text-xs transition-colors duration-200">
										{s}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Company */}
					<div>
						<h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-5">Company</h4>
						<ul className="space-y-3">
							{company.map((co) => (
								<li key={co}>
									<a href="#" className="text-gray-400 hover:text-[#241678] text-xs transition-colors duration-200">
										{co}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-5">Contact</h4>
						<ul className="space-y-3 text-xs text-gray-400">
							<li>
								<a href="mailto:hello@zorintech.com" className="hover:text-[#09BACF] transition-colors break-all">
									hello@zorintech.com
								</a>
							</li>
							<li>
								<a href="tel:+1234567890" className="hover:text-[#09BACF] transition-colors">
									+1 (234) 567-890
								</a>
							</li>
							<li className="leading-relaxed">
								San Francisco, CA<br />United States
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="border-t border-gray-100 mt-14 pt-7 flex flex-col sm:flex-row justify-between items-center gap-4">
					<div className="flex items-center gap-2.5">
						<div className="w-5 h-5 bg-[#241678] rounded flex items-center justify-center flex-shrink-0">
							<span className="text-white font-black text-[9px]">Z</span>
						</div>
						<p className="text-gray-300 text-xs">© {year} ZorinTech. All rights reserved.</p>
					</div>
					<div className="flex gap-6 text-xs text-gray-300">
						<a href="#" className="hover:text-[#09BACF] transition-colors">Privacy Policy</a>
						<a href="#" className="hover:text-[#09BACF] transition-colors">Terms of Service</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;