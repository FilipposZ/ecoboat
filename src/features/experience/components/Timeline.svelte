<script lang="ts">
	import { gsap } from 'gsap';
	import InitialFrame from '$features/experience/lib/InitialFrame.svelte';
	import SunFrame from '$features/experience/lib/SunFrame.svelte';
	import WindFrame from '$features/experience/lib/WindFrame.svelte';

	let timeline = gsap.timeline({ defaults: { duration: 2, ease: 'power2.inOut' } });
</script>

<InitialFrame {timeline} />
<WindFrame {timeline} />
<SunFrame {timeline} />
