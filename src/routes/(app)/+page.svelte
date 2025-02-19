<script>
	import About from '$features/marketing/components/About.svelte';
	import FAQ from '$features/marketing/components/FAQ.svelte';
	import FeatureCarousel from '$features/marketing/components/FeatureCarousel.svelte';
	import Hero from '$features/marketing/components/Hero.svelte';
	import Pricing from '$features/marketing/components/Pricing.svelte';
</script>

<div class="space-y-16">
	<Hero />
	<FeatureCarousel />
	<About />
	<Pricing />
	<FAQ />
</div>
