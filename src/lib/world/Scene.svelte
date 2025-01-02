<script lang="ts">
	import { interactivity } from '@threlte/extras';

	import Ocean from './Ocean.svelte';
	import Sailboat from './Sailboat.svelte';
	import Environment from './Environment.svelte';
	import Timeline from './Timeline.svelte';
	import CubePhysics from './CubePhysics.svelte';
	import CubeInteractive from './CubeInteractive.svelte';
	import ConfigPane from '$lib/configuration/ConfigPane.svelte';
	import Camera from './Camera.svelte';

	interactivity();
</script>

<ConfigPane />

<Camera />

<Timeline />

<Environment />

<CubePhysics />
<CubeInteractive />

<Sailboat name="sailboat" />

<Ocean />
