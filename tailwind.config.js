/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#0A0A0A',
				accent: '#6366F1',
				'accent-2': '#8B5CF6',
				surface: '#F8F8F8',
				muted: '#6B7280',
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Syne', 'sans-serif'],
			},
			animation: {
				marquee: 'marquee 30s linear infinite',
				float: 'float 6s ease-in-out infinite',
				gradient: 'gradient 8s ease infinite',
			},
			keyframes: {
				marquee: {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-50%)' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				gradient: {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
				},
			},
			container: {
				center: true,
				padding: { DEFAULT: '1.5rem', lg: '2rem' },
				screens: { xl: '1280px', '2xl': '1400px' },
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
};
