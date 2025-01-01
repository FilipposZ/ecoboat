
<script lang="ts">
	import Container from './Container.svelte';
	import { PUBLIC_PROJECT_NAME } from '$env/static/public';
	import { crossfade, fade, fly, type TransitionConfig } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';

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
            title: "Our Mission",
            content: `At ${PUBLIC_PROJECT_NAME}, our mission is to elevate the escape room experience by using sound as a powerful tool for immersion. We believe that every sound has the potential to transport, thrill, and captivate. Our team of sound designers, engineers, and escape room enthusiasts work together to craft audio solutions that make your scenarios unforgettable.`,
            backTitle: "Our Vision",
            backContent: "We envision a future where every escape room creates deep emotional connections through carefully crafted soundscapes, where every footstep, creak, and whisper adds to the story.",
            flipped: false
        },
        {
            id: 2,
            title: "Our Story",
            content: `Founded by Tasos, a sound enthusiast and an escape room aficionado, ${PUBLIC_PROJECT_NAME} began with a simple vision: to enhance the magic of escape rooms through immersive audio. Today, we partner with top escape rooms around the world, bringing unique story-driven soundscapes to life.`,
            backTitle: "Our Growth",
            backContent: "From our humble beginnings in a small studio, we've grown to serve escape rooms across three continents, each project adding to our expertise and passion for immersive experiences.",
            flipped: false
        },
        {
            id: 3,
            title: "Our Process",
            content: "We take a collaborative approach with each client, starting with an understanding of the story and ambiance you want to convey. Then, we dive into the design and development, ensuring each sound resonates with the theme. Finally, we offer on-site setup to ensure flawless integration into your room.",
            backTitle: "Our Expertise",
            backContent: "Our team combines decades of experience in sound design, acoustic engineering, and narrative design to create soundscapes that don't just complement your rooms - they transform them.",
            flipped: false
        },
        {
            id: 4,
            title: "Our Promise",
            content: "We promise to deliver sound experiences that exceed expectations, meet deadlines, and respect budgets. Every project receives our full attention and creativity, ensuring your escape room stands out in the market.",
            backTitle: "Get Started",
            backContent: "Ready to elevate your escape room experience? Contact us today to begin your journey into immersive audio storytelling.",
            flipped: false
        }
    ]);

    let currentLeftCard: ICard | null = $state(null);
    let currentRightCard: ICard | null = $state(cards[0]);

    function flipCard(card: ICard) {
        card.flipped = !card.flipped;
        
        const cardIndx = cards.findIndex(card => card.flipped === false);
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

    function spin(node: Element, options?: TransitionConfig) {
		return {
			...options,
			// The value of t passed to the css method
			// varies between zero and one during an "in" transition
			// and between one and zero during an "out" transition.
			duration: 1000,
            css(t: number) {
				// Svelte takes care of applying the easing function.
				return `transform: rotateY(${t * 180 + 180}deg); opacity: ${t}`;
            }
		};
	}
</script>


<Container>
    <div class="hidden lg:grid grid-cols-2 justify-center min-h-screen">

    <!-- Flipped cards stack -->
    <div class="basis-1 bg-no-repeat bg-right bg-contain content-center"
        style="background-image: url('/images/left_opened_book.png')"
    >
        {#if currentLeftCard}
            {@const leftCard = currentLeftCard}
            {#key currentLeftCard}
                <div
                    class="card w-4/6 h-5/6 justify-self-end origin-right hover:shadow-xl active:scale-95"
                    role="button"
                    tabindex="0"
                    transition:spin
                    onclick={() => flipCard(leftCard)}
                    onkeydown={(e) => e.key === 'Enter' && flipCard(leftCard)}
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
    <div class="basis-1 bg-no-repeat bg-left bg-contain content-center"
    style="background-image: url('/images/right_opened_book.png')"
    >
        {#if currentRightCard}
            {@const rightCard = currentRightCard}
            {#key currentRightCard}
                <div
                    class="card w-4/6 h-5/6 ml-5 justify-self-start origin-left hover:shadow-xl active:scale-95"
                    role="button"
                    tabindex="0"
                    transition:spin
                    onclick={() => flipCard(rightCard)}
                    onkeydown={(e) => e.key === 'Enter' && flipCard(rightCard)}
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
            <a href={"#" + card.id.toString()} class="btn btn-xs">{card.title}</a>
        {/each}
    </div>
</div>
</Container>