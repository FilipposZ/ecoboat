<script lang="ts">
	import type { Faq } from '$lib/types';
	import Container from './Container.svelte';

	const faqs: Array<Faq> = [
		{
			question: 'What is Escape Room Madness?',
			answer: 'The solution to all your escape room needs!'
		},
		{
			question: 'How do I get started?',
			answer: 'Contact us!'
		},
		{
			question: 'How can I support Escape Room Madness?',
			answer: 'Invest in us, with your time or your money!'
		},
        {
            question: 'What kind of escape rooms benefit from your services?',
            answer: 'Our sound solutions are ideal for any escape room seeking a heightened sense of immersion. Whether it\'s a horror, adventure, sci-fi, or historical theme, our team can craft sounds that align perfectly with your storyline.'
        },
        {
            question: 'How long does it take to implement a custom sound design?',
            answer: 'The timeline varies depending on the complexity of the project, but on average, custom soundscapes take about 2–4 weeks from concept to installation.'
        },
        {
            question: 'Do you provide on-site installation and setup?',
            answer: 'Yes, we offer on-site setup to ensure everything runs smoothly and aligns perfectly with your escape room’s layout.'
        },
        {
            question: 'Can you create interactive sound triggers?',
            answer: 'Absolutely. We specialize in designing audio that reacts to player actions, making every experience dynamic and unpredictable.'
        },
        {
            question: 'What makes your services different from standard sound systems?',
            answer: 'We go beyond background music by crafting an interactive audio environment tailored to your theme. Our team focuses on the details to make every sound contribute to the narrative, creating a fully immersive experience.'
        }
    ];
</script>

<Container>
	<div id="faq" class="max-w-2xl mx-auto py-24 sm:py-32">
		<div class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-center">FAQ</div>
		<div class="mt-2 sm:mt-4 text-md sm:text-lg leading-6 sm:leading-8 text-center">
			Still have questions? We've got you covered!
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
	</div>
</Container>
