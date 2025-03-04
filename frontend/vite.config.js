import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()], // ✅ This is critical for proper React handling
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:5505',
				changeOrigin: true,
			},
		},
	},
});
