<script lang="ts">
	import Container from '$components/Container.svelte';
	import Logo from '$components/icons/Logo.svelte';
	import { theme } from '$components/icons/ThemeSelector.svelte';
	import BluredWindow from './BluredWindow.svelte';
</script>

<div class="h-[80vh] relative flex items-center justify-center">
	<video
		class="absolute h-full w-screen object-cover -z-10 {theme.isDarkMode
			? 'brightness-30'
			: 'brightness-110'}"
		src="/videos/sailboat_sunset_horizon_zoom_in.mp4"
		autoplay
		loop
		muted
	></video>
	<Container class="prose">
		<BluredWindow>
			<h1 class="text-center drop-shadow-text">A self-sustainable boat ecomuseum</h1>
			<ul class="text-lg text-center drop-shadow-text list-outside">
				<li>Find meaning in your travels</li>
				<li>Learn about our society and nature</li>
				<li>Explore the impact of our actions</li>
				<li>Immerse yourself in interactive workshops</li>
				<li>Reconnect deeply with nature</li>
			</ul>
			<div class="flex items-center justify-center mt-10">
				<button class="btn btn-wide btn-primary text-lg w-full max-w-sm h-14">
					<Logo class="mr-2" /> Embark on the journey !
				</button>
			</div>
		</BluredWindow>
	</Container>
</div>
