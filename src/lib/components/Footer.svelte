<script>
	import { PUBLIC_PROJECT_NAME } from '$env/static/public';
	import { Ship } from 'lucide-svelte';
	import SocialIcons from './SocialIcons.svelte';
</script>

<footer class="footer sm:footer-horizontal relative bg-base-100 text-base-content p-10 mt-15 z-50">
	<aside>
		<Ship class="h-8 w-8" />
		<h2>
			{PUBLIC_PROJECT_NAME}
		</h2>
		<p>The eco-friendly boat museum</p>
	</aside>
	<nav>
		<h6 class="footer-title">Find us at</h6>
		<SocialIcons />
	</nav>
	<nav>
		<h6 class="footer-title">Links</h6>
		<a class="link link-hover" href="/">Home</a>
		<a class="link link-hover" href="/#about">About us</a>
	</nav>
	<nav>
		<h6 class="footer-title">Legal</h6>
		<a class="link link-hover" href="/terms-of-use">Terms of use</a>
		<a class="link link-hover" href="/privacy-policy">Privacy policy</a>
		<a class="link link-hover" href="mailto:someone@example.com">Contact</a>
	</nav>
</footer>
