<script>
	import Scene from '$lib/world/Scene.svelte';
	import { Canvas } from '@threlte/core';
	import { Debug, World } from '@threlte/rapier';
	import { Grid, Gizmo } from '@threlte/extras';
</script>

<div class="h-screen">
	<Canvas>
		<World>
			<!-- <Debug /> -->
			<Grid />
			<Gizmo />

			<Scene />
		</World>
	</Canvas>
</div>
