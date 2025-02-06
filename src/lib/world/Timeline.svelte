<script lang="ts">
	import { gsap } from 'gsap';
	import InitialFrame from './frames/InitialFrame.svelte';
	import SunFrame from './frames/SunFrame.svelte';
	import WindFrame from './frames/WindFrame.svelte';

	let timeline = gsap.timeline({ defaults: { duration: 2, ease: 'power2.inOut' } });
</script>

<InitialFrame {timeline} />
<WindFrame {timeline} />
<SunFrame {timeline} />
