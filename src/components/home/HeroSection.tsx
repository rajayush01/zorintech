import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import vid from "../../assets/bg3.mp4"


const stats = [
	{ value: '150+', label: 'Projects Delivered' },
	{ value: '40+', label: 'Countries Served' },
	{ value: '98%', label: 'Client Satisfaction' },
	{ value: '8+', label: 'Years of Excellence' },
];

const words = ['Scalable.', 'Powerful.', 'Beautiful.'];

// Magnetic button hook
const useMagnetic = (strength = 0.3) => {
	const ref = useRef<HTMLAnchorElement>(null);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const handleMove = (e: MouseEvent) => {
			const rect = el.getBoundingClientRect();
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;
			gsap.to(el, {
				x: (e.clientX - cx) * strength,
				y: (e.clientY - cy) * strength,
				duration: 0.4,
				ease: 'power2.out',
			});
		};
		const handleLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
		el.addEventListener('mousemove', handleMove);
		el.addEventListener('mouseleave', handleLeave);
		return () => {
			el.removeEventListener('mousemove', handleMove);
			el.removeEventListener('mouseleave', handleLeave);
		};
	}, [strength]);
	return ref;
};

const HeroSection = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const cursorRef = useRef<HTMLDivElement>(null);
	const cursorDotRef = useRef<HTMLDivElement>(null);
	const wordContainerRef = useRef<HTMLDivElement>(null);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const springX = useSpring(mouseX, { damping: 25, stiffness: 150 });
	const springY = useSpring(mouseY, { damping: 25, stiffness: 150 });

	// Word rotation state
	// words array + 1 clone of first word at the end for seamless loop
	const [activeWord, setActiveWord] = useState(0);
	const [skipTransition, setSkipTransition] = useState(false);

	useEffect(() => {
		const id = setInterval(() => {
			setActiveWord((w) => {
				const next = w + 1;
				if (next === words.length) {
					// Animate to the clone (index words.length), then snap back silently
					setTimeout(() => {
						setSkipTransition(true);
						setActiveWord(0);
						// Re-enable transition after a tick
						setTimeout(() => setSkipTransition(false), 50);
					}, 650); // wait for transition (0.6s) to finish
				}
				return next;
			});
		}, 2000);
		return () => clearInterval(id);
	}, []);

	// Cursor tracking
	useEffect(() => {
		const move = (e: MouseEvent) => {
			mouseX.set(e.clientX - 16);
			mouseY.set(e.clientY - 16);
			if (cursorDotRef.current) {
				gsap.to(cursorDotRef.current, { x: e.clientX - 4, y: e.clientY - 4, duration: 0.1 });
			}
		};
		window.addEventListener('mousemove', move, { passive: true });
		return () => window.removeEventListener('mousemove', move);
	}, []);

	// Floating grid lines
	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.to('.h-grid-line', {
				scaleX: 1,
				duration: 1.5,
				ease: 'power3.inOut',
				stagger: 0.08,
				delay: 0.5,
			});
		}, containerRef);
		return () => ctx.revert();
	}, []);

	const btn1 = useMagnetic(0.25);
	const btn2 = useMagnetic(0.25);

	// Compute Y offset: each word slot is exactly the container's clientHeight
	const slotHeight = wordContainerRef.current?.clientHeight ?? 128;
	const yOffset = -(activeWord * slotHeight);

	return (
		<section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-gray-950">
			{/* Background video */}
			<video
				autoPlay
				muted
				loop
				playsInline
				className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
			>
				<source src={vid} type="video/mp4" />
			</video>
			{/* Dark overlay */}
			<div className="absolute inset-0  pointer-events-none" />

			{/* Custom cursor */}
			<motion.div
				ref={cursorRef}
				className="fixed w-8 h-8 rounded-full border border-amber-400 pointer-events-none z-[9999] hidden lg:block"
				style={{ x: springX, y: springY, top: 0, left: 0 }}
			/>
			<div
				ref={cursorDotRef}
				className="fixed w-2 h-2 bg-amber-400 rounded-full pointer-events-none z-[9999] hidden lg:block"
				style={{ top: 0, left: 0 }}
			/>

			{/* Animated grid lines */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{[...Array(6)].map((_, i) => (
					<div
						key={i}
						className="h-grid-line absolute left-0 right-0 h-px bg-white/5 origin-left"
						style={{ top: `${(i + 1) * (100 / 7)}%`, transform: 'scaleX(0)' }}
					/>
				))}
				{[...Array(5)].map((_, i) => (
					<div
						key={i}
						className="absolute top-0 bottom-0 w-px bg-white/5"
						style={{ left: `${(i + 1) * (100 / 6)}%` }}
					/>
				))}
			</div>

			{/* Amber glow blob */}
			<motion.div
				animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.2, 0.12] }}
				transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
				className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-400 rounded-full blur-[100px] pointer-events-none"
			/>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 sm:pb-20 relative z-10 w-full">
				<div className="max-w-5xl">
					{/* Badge */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="inline-flex items-center gap-2.5 px-4 py-2 border border-white/20 rounded-full mb-8"
					>
						<span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
						<span className="text-white/70 text-xs font-medium tracking-[0.12em] uppercase">
							International Technology Partner
						</span>
					</motion.div>

					{/* Headline */}
					<div className="overflow-hidden mb-3">
						<motion.h1
							initial={{ y: 100, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
							className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black leading-[0.95] text-white tracking-tight"
						>
							We Build
						</motion.h1>
					</div>

					{/* Rotating word — fixed infinite loop animation */}
					<div
						ref={wordContainerRef}
						className="overflow-hidden mb-8 h-[5.5rem] sm:h-[6.5rem] md:h-[7.5rem] lg:h-[8rem]"
					>
						<motion.div
							animate={{ y: yOffset }}
							transition={skipTransition ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
							className="flex flex-col"
						>
							{/* Real words */}
							{words.map((word, i) => (
								<span
									key={word}
									className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black leading-[0.95] tracking-tight block flex-shrink-0 h-[5.5rem] sm:h-[6.5rem] md:h-[7.5rem] lg:h-[8rem]"
									style={{
										color: i === activeWord ? '#F59E0B' : '#ffffff',
									}}
								>
									{word}
								</span>
							))}
							{/* Clone of first word for seamless loop back */}
							<span className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black leading-[0.95] tracking-tight block flex-shrink-0 h-[5.5rem] sm:h-[6.5rem] md:h-[7.5rem] lg:h-[8rem] text-amber-400">
								{words[0]}
							</span>
						</motion.div>
					</div>

					{/* Subtext */}
					<motion.p
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.4 }}
						className="text-white/60 text-base sm:text-lg max-w-xl leading-relaxed mb-10"
					>
						ZorinTech engineers world-class digital products — from enterprise platforms to consumer apps —
						built for performance, scale, and global reach.
					</motion.p>

					{/* CTAs */}
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.5 }}
						className="flex flex-col sm:flex-row gap-4"
					>
						<Link
							ref={btn1}
							to="/contact"
							className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-950 text-white font-semibold rounded-full hover:bg-amber-400 hover:text-gray-950 transition-all duration-300 text-sm tracking-wide"
						>
							Start a Project
							<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
						</Link>
						<Link
							ref={btn2}
							to="/work"
							className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:border-white hover:text-white transition-all duration-300 text-sm"
						>
							View Our Work
							<ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
						</Link>
					</motion.div>

					{/* Stats */}
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.7 }}
						className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 pt-10 border-t border-white/10"
					>
						{stats.map((stat, i) => (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.8 + i * 0.08 }}
							>
								<p className="font-display text-3xl sm:text-4xl font-black text-white tabular-nums">
									{stat.value}
								</p>
								<p className="text-white/40 text-xs mt-1 tracking-wide uppercase">{stat.label}</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>

			{/* Scroll indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.4 }}
				className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
			>
				<motion.div className="w-[1px] h-14 bg-gray-200 origin-top overflow-hidden">
					<motion.div
						animate={{ y: ['-100%', '100%'] }}
						transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
						className="w-full h-1/2 bg-amber-400"
					/>
				</motion.div>
				<span className="text-[10px] text-gray-300 uppercase tracking-[0.2em]">Scroll</span>
			</motion.div>
		</section>
	);
};

export default HeroSection;
