<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { onMount } from 'svelte';
	import { Pane, Slider, Button, Folder, RotationEuler, Point } from 'svelte-tweakpane-ui';
	import { gsap } from 'gsap';

	const { camera } = useThrelte();

	interface CameraState {
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
	}

	const cameraState: CameraState = $state({
		position: { x: 3.5, y: 8.5, z: 8 },
		rotation: { x: 0, y: 0, z: 0 }
	});

	let cameraRotation = $state({
		current: cameraState.rotation,
		target: cameraState.rotation,
		ease: 0.2
	});

	function resetCameraState() {
		cameraState.position = { x: 3.5, y: 8.5, z: 8 };
		cameraState.rotation = { x: 0, y: 0, z: 0 };
	}

	onMount(() => {
		window.addEventListener('pointermove', rotateCameraWithMouse);

		return () => {
			window.removeEventListener('pointermove', rotateCameraWithMouse);
		};
	});

	function rotateCameraWithMouse(event: PointerEvent) {
		const normalizedPosX = (event.x / window.innerWidth) * 2 - 1;
		const normalizedPosY = (event.y / window.innerHeight) * 2 - 1;

		// console.log(normalizedPosX, normalizedPosY);
		cameraRotation.target = {
			x: cameraState.rotation.x - normalizedPosY * 0.1,
			y: cameraState.rotation.y - normalizedPosX * 0.1,
			z: camera.current.rotation.z
		};
	}

	useTask(() => {
		cameraRotation.current = gsap.utils.interpolate(
			cameraRotation.current,
			cameraRotation.target,
			cameraRotation.ease
		);
		cameraRotation = cameraRotation;
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[cameraState.position.x, cameraState.position.y, cameraState.position.z]}
	rotation={[cameraRotation.current.x, cameraRotation.current.y, cameraRotation.current.z]}
	fov={70}
>
	<!-- <OrbitControls enableZoom={true} /> -->
</T.PerspectiveCamera>

<Pane title="Camera" position="fixed" y={70} x={window.innerWidth - 500}>
	<Folder title="Camera">
		<Point bind:value={cameraState.position} label="Position" picker="inline" />
		<RotationEuler bind:value={cameraRotation.target} label="Rotation" picker={'inline'} />
		<Button on:click={resetCameraState} title="Reset" />
	</Folder>
</Pane>
