<script>
	import { PUBLIC_PROJECT_NAME } from '$env/static/public';
	import { Ship } from 'lucide-svelte';
	import SocialIcons from './SocialIcons.svelte';
</script>

<div class="bg-base-100 relative z-50 mt-32 w-full">
	<footer class="footer p-10 text-base-content justify-items-center">
		<aside>
			<div class="flex items-center h-fit space-x-2">
				<Ship class="h-8 w-8" />
				<div class="text-xl font-bold">{PUBLIC_PROJECT_NAME}</div>
			</div>
		</aside>
		<SocialIcons class="md:hidden" />

		<nav class="justify-items-center md:justify-items-start">
			<h6 class="footer-title">LINKS</h6>
			<a class="link link-hover" href="/">Home</a>
			<a class="link link-hover" href="/#about">About</a>
		</nav>
		<nav class="justify-items-center md:justify-items-start">
			<h6 class="footer-title">Legal</h6>
			<a class="link link-hover" href="/terms-of-use">Terms of use</a>
			<a class="link link-hover" href="/privacy-policy">Privacy policy</a>
			<a class="link link-hover" href="mailto:someone@example.com">Contact</a>
		</nav>

		<SocialIcons class="hidden md:block" />
	</footer>
</div>
