<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { Spring } from 'svelte/motion';

	const scale = new Spring(1);

	let hovered = $state(false);
	let rotation = $state(0);

	useTask((delta) => {
		rotation += delta % 360;
	});

	$effect(() => {
		scale.set(hovered ? 1.5 : 1);
	});
</script>

<T.Mesh
	castShadow
	receiveShadow
	onclick={() => {
		console.log('help');
	}}
	scale={scale.current}
	onpointerenter={() => (hovered = true)}
	onpointerleave={() => (hovered = false)}
	position={[5, 10, -10]}
	rotation.z={rotation}
>
	<T.BoxGeometry args={[1, 2, 1]} />
	<T.MeshStandardMaterial color={hovered ? 'hotpink' : 'orange'} roughness={0.2} metalness={0.4} />
</T.Mesh>
