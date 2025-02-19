<script lang="ts">
	import Container from '$components/Container.svelte';

	interface Image {
		src: string;
		alt: string;
	}

	const images: Image[] = [
		{
			src: '/images/boat_side_view_port.jpeg',
			alt: 'horizontal side view of the boat in the port'
		},
		{
			src: '/images/port_full_boat_back_high_angle.jpeg',
			alt: 'high angle view of a boat in a port'
		},
		{
			src: '/images/chameleon_towel_nature_horizon.jpeg',
			alt: 'chameleon on a towel with nature and horizon in the background'
		},
		{ src: '/images/girl_stacking_stones.jpg', alt: 'kid stacking rocks at the beach' },
		{
			src: '/images/rails_yacht_sunset.jpeg',
			alt: 'the sunset and a yacht on the horizon'
		},
		{
			src: '/images/filippos_and_bams_eating_apple.jpeg',
			alt: 'enjoying the moment eating'
		}
	];

	let carouselRef: HTMLDivElement;

	function carouselScroll(direction: 'right' | 'left') {
		const scrollByY =
			direction === 'right' ? -carouselRef.clientWidth / 2 : carouselRef.clientWidth / 2;

		carouselRef.scrollBy({ left: scrollByY, behavior: 'smooth' });
	}

	function isInCenter(element: HTMLDivElement) {
		// const rect = element.getBoundingClientRect();
		// const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
		console.log('It iS!', element);
		// return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
	}
</script>

{#snippet carouselImage(image: Image, index: number)}
	<div class="carousel-item rounded-box border-1 shadow-lg max-w-screen">
		<img class="rounded-box object-cover object-center" {...image} />
	</div>
{/snippet}

<Container class="h-screen">
	<h2 class="font-bold text-2xl md:text-4xl mb-16 text-center">Explore the Ecoboat experience</h2>

	<div class="carousel carousel-center space-x-2 px-4 py-2 h-5/6" bind:this={carouselRef}>
		{#each images as image, index}
			{@render carouselImage(image, index)}
		{/each}
		<div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
			<button class="btn btn-circle" onclick={() => carouselScroll('right')}>❮</button>
			<button class="btn btn-circle" onclick={() => carouselScroll('left')}>❯</button>
		</div>
	</div>
</Container>
