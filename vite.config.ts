import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import Icons from 'unplugin-icons/vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

export default defineConfig({
	plugins: [
		purgeCss(),
		sveltekit(),
		Icons({
			compiler: 'svelte',
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
