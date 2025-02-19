<script lang="ts">
	import Container from '$components/Container.svelte';
	import Logo from '$components/icons/Logo.svelte';
	import { theme } from '$components/icons/ThemeSelector.svelte';
</script>

<div class="h-[80vh] relative">
	<video
		class="absolute h-full w-screen object-cover -z-10 {theme.isDarkMode
			? 'brightness-50'
			: 'brightness-130'}"
		src="/videos/sailboat_sunset_horizon_zoom_in.mp4"
		autoplay
		loop
		muted
	></video>
	<Container class="flex flex-col prose items-center justify-center">
		<h1 class="text-4xl mt-25 text-center">
			A self-sustainable boat <br />
			A breathing ecomuseum
		</h1>
		<ul class="mt-2 sm:mt-4 mb-6 sm:mb-8 text-lg text-center">
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
	</Container>
</div>
