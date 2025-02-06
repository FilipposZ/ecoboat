import { sveltekit } from '@sveltejs/kit/vite';
import { threlteStudio } from '@threlte/studio/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [threlteStudio(), sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
