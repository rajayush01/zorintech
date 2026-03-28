import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
	{ name: 'Home', path: '/' },
	{ name: 'Services', path: '/services' },
	{ name: 'Work', path: '/work' },
	{ name: 'About', path: '/about' },
	{ name: 'Contact', path: '/contact' },
];

const Header = () => {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		setMenuOpen(false);
		document.body.style.overflow = '';
	}, [location]);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : '';
		return () => { document.body.style.overflow = ''; };
	}, [menuOpen]);

	return (
		<>
			<motion.header
				initial={{ y: -80, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
					scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm' : 'bg-transparent'
				}`}
			>
				{/* Amber progress line on scroll */}
				<motion.div
					className="absolute bottom-0 left-0 h-[2px] bg-amber-400"
					style={{ width: scrolled ? '100%' : '0%' }}
					animate={{ width: scrolled ? '100%' : '0%' }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
				/>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16 sm:h-20">
						{/* Logo */}
						<Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
							<div className="w-8 h-8 bg-gray-950 rounded-lg flex items-center justify-center overflow-hidden group-hover:bg-amber-400 transition-colors duration-300">
								<span className="text-white group-hover:text-gray-950 font-black text-sm transition-colors duration-300">Z</span>
							</div>
							<span className="font-display font-black text-xl text-gray-950 tracking-tight">
								Zorin<span className="text-amber-400">Tech</span>
							</span>
						</Link>

						{/* Desktop Nav */}
						<nav className="hidden md:flex items-center gap-1">
							{navLinks.map((link) => (
								<Link
									key={link.name}
									to={link.path}
									className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full ${
										location.pathname === link.path
											? 'text-gray-950 bg-gray-100'
											: 'text-gray-500 hover:text-gray-950 hover:bg-gray-50'
									}`}
								>
									{link.name}
									{location.pathname === link.path && (
										<motion.div layoutId="nav-indicator" className="absolute inset-0 bg-gray-100 rounded-full -z-10" />
									)}
								</Link>
							))}
						</nav>

						{/* CTA */}
						<div className="hidden md:block">
							<Link
								to="/contact"
								className="px-5 py-2.5 bg-gray-950 text-white text-sm font-semibold rounded-full hover:bg-amber-400 hover:text-gray-950 transition-all duration-300"
							>
								Let's Talk
							</Link>
						</div>

						{/* Hamburger */}
						<button
							onClick={() => setMenuOpen(!menuOpen)}
							className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] z-50"
							aria-label="Toggle menu"
						>
							<motion.span
								animate={menuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
								transition={{ duration: 0.25 }}
								className="block w-5 h-0.5 bg-gray-950 rounded-full origin-center"
							/>
							<motion.span
								animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
								className="block w-5 h-0.5 bg-gray-950 rounded-full"
							/>
							<motion.span
								animate={menuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
								transition={{ duration: 0.25 }}
								className="block w-5 h-0.5 bg-gray-950 rounded-full origin-center"
							/>
						</button>
					</div>
				</div>
			</motion.header>

			{/* Mobile Menu */}
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 z-40 bg-white md:hidden flex flex-col"
					>
						<div className="h-16 sm:h-20 flex-shrink-0" />
						<nav className="flex-1 flex flex-col justify-center px-8 pb-10 gap-1">
							{navLinks.map((link, i) => (
								<motion.div
									key={link.name}
									initial={{ opacity: 0, x: -24 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: i * 0.06 }}
								>
									<Link
										to={link.path}
										onClick={() => setMenuOpen(false)}
										className={`block py-4 text-4xl font-display font-black border-b border-gray-100 transition-colors ${
											location.pathname === link.path ? 'text-amber-400' : 'text-gray-950 hover:text-amber-400'
										}`}
									>
										{link.name}
									</Link>
								</motion.div>
							))}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.35 }}
								className="mt-10"
							>
								<Link
									to="/contact"
									onClick={() => setMenuOpen(false)}
									className="inline-flex items-center px-8 py-4 bg-gray-950 text-white font-semibold rounded-full hover:bg-amber-400 hover:text-gray-950 transition-all duration-300"
								>
									Let's Talk
								</Link>
							</motion.div>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Header;