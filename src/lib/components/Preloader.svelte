<script>
	import Container from './Container.svelte';
	import Headphones from './icons/Headphones.svelte';
	import ScrollDown from './icons/ScrollDown.svelte';
</script>

<Container class="h-screen w-screen max-w-none fixed prose text-center">
	<div
		class="left-0 w-screen h-screen absolute bg-[url('/images/sail_boat_green_blue_waters.webp')] bg-no-repeat bg-cover bg-center bg-fixed brightness-50"
	></div>
	<h1 class="top-1/3 relative text-white">A trip with the Ecoboat</h1>
	<h2 class="top-1/3 relative text-white">Dive in the experience</h2>
	<div class="top-1/3 relative text-white flex flex-col items-center">
		<div class="tooltip tooltip-open tooltip-bottom tooltip-secondary" data-tip="better with sound">
			<Headphones class="size-[5rem]" />
		</div>
	</div>

	<ScrollDown />
</Container>
