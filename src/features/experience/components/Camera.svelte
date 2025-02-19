<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { onMount } from 'svelte';
	import { Vector3 } from 'three';

	const { camera } = useThrelte();

	let mousePos = $state({
		x: 0,
		y: 0
	});

	let prevMousePos = { x: 0, y: 0 };

	const ROTATION_SPEED_MODIFIER = 0.1;

	function rotateCameraWithMouse(event: PointerEvent) {
		mousePos.x = (event.x / window.innerWidth) * 2 - 1;
		mousePos.y = (event.y / window.innerHeight) * 2 - 1;
	}

	$effect(() => {
		const offsetRotationX = prevMousePos.x - mousePos.x;
		const offsetRotationY = prevMousePos.y - mousePos.y;
		camera.current.rotateOnAxis(new Vector3(0, 1, 0), offsetRotationX * ROTATION_SPEED_MODIFIER);
		camera.current.rotateOnAxis(new Vector3(1, 0, 0), offsetRotationY * ROTATION_SPEED_MODIFIER);
		prevMousePos = { ...mousePos };
	});

	onMount(() => {
		window.addEventListener('pointermove', rotateCameraWithMouse);

		return () => {
			window.removeEventListener('pointermove', rotateCameraWithMouse);
		};
	});
</script>

<T.PerspectiveCamera makeDefault position={[3.5, 8.5, 8]} fov={70}>
	<!-- <OrbitControls enableZoom={true} /> -->
</T.PerspectiveCamera>
