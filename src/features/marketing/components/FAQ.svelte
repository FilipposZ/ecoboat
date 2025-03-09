<script lang="ts">
	import Container from '$components/Container.svelte';
	import type { Faq } from '$features/marketing/lib/types';

	const faqs: Array<Faq> = [
		{
			question: 'What is the Ecoboat?',
			answer:
				'The Ecoboat Museum is a floating, self-sustainable vessel that doubles as a museum and rental space. It showcases innovative systems that work harmoniously with the environment.'
		},
		{
			question: `What can I expect during a tour?`,
			answer:
				'Our 6-8 hour tours include interactive exhibits, hands-on activities, and an inspiring journey into sustainable living. Guests of all ages can explore how humanity and nature can coexist.'
		},
		{
			question: 'How are the systems on the Ecoboat sustainable?',
			answer:
				'The Ecoboat uses renewable energy, such as solar and wind power, and features systems like water filtration and waste reduction. These systems are designed to minimize impact while benefiting the environment.'
		},
		{
			question: 'Who is the Ecoboat experience for?',
			answer: `The Ecoboat welcomes everyone, from families to businesses, educators, and nature enthusiasts. It's perfect for anyone curious about sustainability and innovation.`
		},
		{
			question: 'How can I support the Ecoboat?',
			answer:
				'You can support us by joining a tour, booking an event, or spreading the word. Signing up for our newsletter is another great way to stay connected.'
		}
	];
</script>

<Container id="faq" class="max-w-2xl mx-auto">
    <div class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-center">FAQ</div>
    <div class="mt-2 sm:mt-4 text-md sm:text-lg leading-6 sm:leading-8 text-center">
        <p>Still have questions? We've got you covered!</p>
    </div>
    <div class="mt-5 md:mt-8 lg:mt-10">
        <div class="join join-vertical w-full">
            {#each faqs as faq}
                <div class="collapse collapse-arrow join-item border">
                    <input type="radio" name="accordion" />
                    <div class="collapse-title text-xl font-medium">
                        {faq.question}
                    </div>
                    <div class="collapse-content">
                        <p>{@html faq.answer}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</Container>
