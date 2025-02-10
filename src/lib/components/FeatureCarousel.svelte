<script lang="ts">
	import Container from './Container.svelte';

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
</script>

{#snippet carouselImage(image: Image)}
	<div class="carousel-item">
		<img class="rounded-box object-cover object-right" {...image} />
	</div>{/snippet}
<Container>
	<h2 class="font-bold text-2xl md:text-4xl mb-16 text-center">Explore the Ecoboat experience</h2>

	<div class="carousel carousel-center bg-neutral rounded-box space-x-4 p-4 h-screen">
		{#each images as image}
			{@render carouselImage(image)}
		{/each}
	</div>
</Container>
