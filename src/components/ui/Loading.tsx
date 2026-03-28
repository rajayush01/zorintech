import React from 'react';

interface LoadingProps {
	mode: 'timed' | 'suspense';
	size: 'sm' | 'md' | 'lg';
	duration?: number;
	onLoadingComplete?: () => void;
	showProgress?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ mode, size, duration, onLoadingComplete }) => {
	React.useEffect(() => {
		if (mode === 'timed' && duration && onLoadingComplete) {
			const timer = setTimeout(onLoadingComplete, duration);
			return () => clearTimeout(timer);
		}
	}, [mode, duration, onLoadingComplete]);

	const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };

	return (
		<div className="flex items-center justify-center">
			<div
				className={`${sizeClasses[size]} border-2 border-gray-200 border-t-accent rounded-full animate-spin`}
			/>
		</div>
	);
};

export default Loading;
