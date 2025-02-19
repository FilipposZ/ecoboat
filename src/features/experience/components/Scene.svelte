<script lang="ts">
	import { interactivity } from '@threlte/extras';

	import Camera from './Camera.svelte';
	import CubeInteractive from './CubeInteractive.svelte';
	import CubePhysics from './CubePhysics.svelte';
	import Environment from './Environment.svelte';
	import Ocean from './Ocean.svelte';
	import Sailboat from './Sailboat.svelte';
	import Timeline from './Timeline.svelte';

	interactivity();
</script>

<Camera />

<Timeline />

<Environment />

<CubePhysics />
<CubeInteractive />

<Sailboat />

<Ocean />
