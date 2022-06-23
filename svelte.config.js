import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		prerender: {
			default: true,
		},

		vite: {
			define: {
				'import.meta.env.VERCEL_ANALYTICS_ID': JSON.stringify(process.env.VERCEL_ANALYTICS_ID),
			},
		},
	},

	preprocess: [
		preprocess({
			postcss: true,
		}),
	],
};

export default config;
