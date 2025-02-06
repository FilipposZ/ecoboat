<script lang="ts">
	import { type Transform } from '$lib/utils/graphics.svelte';
	import { T, useTask, useThrelte } from '@threlte/core';
	import { gsap } from 'gsap';

	const { camera } = useThrelte();

	let cameraState: { current: Transform; target: Transform } = $state({
		current: { position: { x: 3.5, y: 8.5, z: 10 }, rotation: { x: 0, y: 0, z: 0 } },
		target: { position: { x: 3.5, y: 8.5, z: 10 }, rotation: { x: 0, y: 0, z: 0 } }
	});

	let shouldMoveCameraWithMouse = $state(false);

	function resetCameraState() {
		cameraState.target.position = { x: 3.5, y: 8.5, z: 8 };
		cameraState.target.rotation = { x: 0, y: 0, z: 0 };
	}

	function rotateCameraWithMouse(event: PointerEvent) {
		const normalizedPosX = (event.x / window.innerWidth) * 2 - 1;
		const normalizedPosY = (event.y / window.innerHeight) * 2 - 1;

		// console.log(normalizedPosX, normalizedPosY);
		cameraState.target.rotation = {
			x: camera.current.position.x - normalizedPosY * 0.1,
			y: camera.current.position.y - normalizedPosX * 0.1,
			z: camera.current.rotation.z
		};
	}

	useTask(() => {
		if (shouldMoveCameraWithMouse) {
			cameraState.current.rotation = gsap.utils.interpolate(
				cameraState.current.rotation,
				cameraState.target.rotation,
				0.1
			);
		}
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[
		cameraState.current.position.x,
		cameraState.current.position.y,
		cameraState.current.position.z
	]}
	rotation={[
		cameraState.current.rotation.x,
		cameraState.current.rotation.y,
		cameraState.current.rotation.z
	]}
	fov={70}
>
	<!-- <OrbitControls enableZoom={true} /> -->
</T.PerspectiveCamera>
