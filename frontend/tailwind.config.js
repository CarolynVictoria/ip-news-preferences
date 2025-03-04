/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				brand: '#4173a2', // This adds 'brand' to your Tailwind color palette
			},
		},
	},
	plugins: [],
};
