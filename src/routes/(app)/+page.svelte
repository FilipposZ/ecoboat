<script lang="ts">
	import About from '$features/marketing/components/About.svelte';
	import FAQ from '$features/marketing/components/FAQ.svelte';
	import FeatureCarousel from '$features/marketing/components/FeatureCarousel.svelte';
	import Hero from '$features/marketing/components/Hero.svelte';
	import Newsletter from '$features/marketing/components/Newsletter.svelte';
	import Pricing from '$features/marketing/components/Pricing.svelte';
	import { FeatureFlag, getEnabledFeatures } from '$lib/configuration/feature-flags.svelte';

	const features = getEnabledFeatures();
</script>

<div class="space-y-16">
	<Hero />
	<FeatureCarousel />
	<About />

	<div>
		{#if features.isEnabled(FeatureFlag.PricingComponent)}
			<Pricing />
		{/if}
		{#if features.isEnabled(FeatureFlag.NewsletterComponent)}
			<Newsletter />
		{/if}
	</div>

	<FAQ />
</div>
