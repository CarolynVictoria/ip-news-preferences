/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				brand: '#4173a2', // This adds 'brand' to your Tailwind color palette
				active: {
					DEFAULT: '#10b981', // This is 'active'
					light: '#6ee7b7', // This would be 'active-light'
					dark: '#047857', // This would be 'active-dark'
				},
			},
		},
	},
	plugins: [],
};
