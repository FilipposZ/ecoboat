<script lang="ts">
	import { PUBLIC_PROJECT_NAME } from '$env/static/public';
	import { crossfade, fade } from 'svelte/transition';
	import Container from './Container.svelte';

	interface ICard {
		id: number;
		title: string;
		content: string;
		backTitle: string;
		backContent: string;
		flipped: boolean;
	}

	const cards: ICard[] = $state([
		{
			id: 1,
			title: 'Our Mission',
			content: `At ${PUBLIC_PROJECT_NAME}, At Ecoboat, our mission is to inspire a world where humanity and nature thrive together. By showcasing self-sustaining systems, we aim to ignite hope, education, and action for a greener future.`,
			backTitle: 'Our Vision',
			backContent: `We envision a planet where innovation and ecology work hand-in-hand to leave a net-positive impact on the environment. The Ecoboat is more than a vessel—it's a movement toward sustainable living and a brighter tomorrow.`,
			flipped: false
		},
		{
			id: 2,
			title: 'Our Story',
			content: `The Ecoboat was born from a dream to demonstrate that harmony with nature is not just possible but essential. What started as a simple idea became a living, breathing museum of hope, resilience, and ingenuity.`,
			backTitle: 'Our Growth',
			backContent:
				'From a small, passionate team with a big dream, we’ve grown into a thriving community of environmental advocates. Each step forward is a testament to the power of shared purpose and a collective commitment to our planet.',
			flipped: false
		},
		{
			id: 3,
			title: 'Our Process',
			content: `Every system on the Ecoboat is meticulously designed to create positive feedback loops with the environment. From harnessing renewable energy to purifying water, our process reflects a delicate balance between science and sustainability.`,
			backTitle: 'Our Expertise',
			backContent:
				'Backed by decades of knowledge in sustainable technology and ecological design, our team transforms bold ideas into functional, real-world solutions. We take pride in being pioneers of innovation that educates, inspires, and makes a tangible difference.',
			flipped: false
		},
		{
			id: 4,
			title: 'Our Promise',
			content: `We promise to lead by example, showing that sustainability is not a compromise but a gift we can give future generations. Every journey aboard the Ecoboat is a step toward a better, more sustainable world.`,
			backTitle: 'Get Started',
			backContent:
				'Ready to experience a truly meaningful experience? Contact us today to begin your journey !',
			flipped: false
		}
	]);

	let currentLeftCard: ICard | null = $state(null);
	let currentRightCard: ICard | null = $state(cards[0]);

	function flipCard(card: ICard) {
		card.flipped = !card.flipped;

		const cardIndx = cards.findIndex((card) => card.flipped === false);
		if (cardIndx === -1) {
			// All cards are flipped
			currentLeftCard = cards[cards.length - 1];
			currentRightCard = null;
		} else if (cardIndx === 0) {
			// No cards are flipped
			currentLeftCard = null;
			currentRightCard = cards[0];
		} else {
			currentLeftCard = cards[cardIndx - 1];
			currentRightCard = cards[cardIndx];
		}
	}

	const [send, receive] = crossfade({ duration: 2000, fallback: fade });
</script>

<Container>
	<div class="hidden lg:grid grid-cols-2 justify-center min-h-screen">
		<!-- Flipped cards stack -->
		<div
			class="bg-no-repeat bg-right bg-contain relative flex justify-end items-center"
			style="background-image: url('/images/left_opened_book.png')"
		>
			{#if currentLeftCard}
				{@const leftCard = currentLeftCard}
				{#key currentLeftCard}
					<div
						class="card absolute w-4/6 h-5/6 origin-right hover:shadow-xl active:scale-95"
						role="button"
						tabindex="0"
						onclick={() => flipCard(leftCard)}
						onkeydown={(e) => e.key === 'Enter' && flipCard(leftCard)}
						in:receive={{ key: leftCard.id }}
						out:send={{ key: leftCard.id }}
					>
						<div class="card-body">
							<h3 class="mb-3 text-black font-bold">{leftCard.backTitle}</h3>
							<p class="text-black">{leftCard.backContent}</p>
						</div>
					</div>
				{/key}
			{/if}
		</div>

		<!-- Main stack -->
		<div
			class="bg-no-repeat bg-left bg-contain relative flex justify-start items-center"
			style="background-image: url('/images/right_opened_book.png')"
		>
			{#if currentRightCard}
				{@const rightCard = currentRightCard}
				{#key currentRightCard}
					<div
						class="card absolute w-4/6 h-5/6 ml-5 origin-left hover:shadow-xl active:scale-95"
						role="button"
						tabindex="0"
						onclick={() => flipCard(rightCard)}
						onkeydown={(e) => e.key === 'Enter' && flipCard(rightCard)}
						in:receive={{ key: rightCard.id }}
						out:send={{ key: rightCard.id }}
					>
						<div class="card-body flex items-center">
							<h3 class="mb-3 text-black font-bold">{rightCard.title}</h3>
							<p class="text-black">{rightCard.content}</p>
						</div>
					</div>
				{/key}
			{/if}
		</div>
	</div>

	<div class="lg:hidden">
		<div class="carousel carousel-center w-full">
			{#each cards as card}
				<div id={card.id.toString()} class="card carousel-item w-full">
					<div class="card-body">
						<h2 class="card-title">{card.title}</h2>
						<p class="text-pretty">{card.content}</p>
					</div>
				</div>
			{/each}
		</div>

		<div class="flex w-full justify-center gap-2 py-2">
			{#each cards as card}
				<a href={'#' + card.id.toString()} class="btn btn-xs">{card.title}</a>
			{/each}
		</div>
	</div>
</Container>
