<script>
	import { Activity } from 'lucide-svelte';
	import Container from './Container.svelte';
</script>

<Container>
	<div class="flex flex-col md:flex-row py-8 sm:py-20">
		<div class="basis-2/3">
			<div class="text-center text-4xl sm:text-7xl sm:text-left font-bold sm:mt-8">
				The Ecoboat is setting sail on an transformative <span class="underline decoration-primary"
					>journey</span
				>
			</div>
			<p class="mt-2 sm:mt-4 mb-6 sm:mb-8 text-md text-center sm:text-left sm:text-lg">
				Where sustainability meets adventure — explore, learn, and give back to the mother Nature!
			</p>
			<div class="flex items-center justify-center sm:justify-start">
				<a href="/" class="btn btn-primary text-lg w-full max-w-sm h-14">
					<Activity class="mr-2" /> Embark on the journey !
				</a>
			</div>
		</div>
		<div
			class="basis-1/3 bg-gray-100 text-xl rounded-xl text-center flex items-center justify-center"
		>
			Video / carousel / testimonials placeholder
		</div>
	</div>
</Container>
