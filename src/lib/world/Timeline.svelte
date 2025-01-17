<script lang="ts">
	import { configPane } from '$lib/configuration/config.svelte';
	import { useThrelte } from '@threlte/core';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	import { Folder } from 'svelte-tweakpane-ui';
	import InitialFrame from './frames/InitialFrame.svelte';
	import SunFrame from './frames/SunFrame.svelte';
	import WindFrame from './frames/WindFrame.svelte';

	const { camera } = useThrelte();

	onMount(() => {
		configPane.addConfigSnippet(timelineConfigSnippet);

		return () => {
			configPane.removeConfigSnippet(timelineConfigSnippet);
		};
	});

	let timeline = gsap.timeline({ defaults: { duration: 2, ease: 'power2.inOut' } });
</script>

<InitialFrame {timeline} />
<WindFrame {timeline} />
<SunFrame {timeline} />

{#snippet timelineConfigSnippet()}
	<Folder title="Timeline" expanded={false}></Folder>
{/snippet}
