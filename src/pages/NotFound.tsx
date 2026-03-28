import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
	return (
		<div className="min-h-screen bg-white flex items-center justify-center px-4">
			<div className="text-center max-w-lg">
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
				>
					<p className="font-display font-black text-[10rem] leading-none text-gray-950 tabular-nums select-none">
						4<span className="text-amber-400">0</span>4
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<h1 className="font-display font-black text-2xl text-gray-950 mb-3">Page not found</h1>
					<p className="text-gray-400 text-sm mb-10">
						The page you're looking for doesn't exist or has been moved.
					</p>

					<div className="flex flex-col sm:flex-row gap-3 justify-center">
						<Link
							to="/"
							className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gray-950 text-white font-semibold rounded-full hover:bg-amber-400 hover:text-gray-950 transition-all duration-300 text-sm"
						>
							<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
							Go back home
						</Link>
						<a
							href="mailto:hello@zorintech.com"
							className="inline-flex items-center justify-center px-7 py-3.5 border border-gray-200 text-gray-600 font-medium rounded-full hover:border-gray-950 hover:text-gray-950 transition-all duration-300 text-sm"
						>
							Contact support
						</a>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default NotFound;