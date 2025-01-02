<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { onMount } from 'svelte';
	import {
		Pane,
		Slider,
		Button,
		Folder,
		RotationEuler,
		Point,
		TabPage,
		Checkbox
	} from 'svelte-tweakpane-ui';
	import { gsap } from 'gsap';
	import { addConfigTabPage } from '$lib/configuration/config.svelte';
	import { type Transform } from '$lib/utils/graphics.svelte';

	const { camera } = useThrelte();

	addConfigTabPage(cameraConfigPage);

	let cameraState: Transform = $state({
		position: { x: 3.5, y: 8.5, z: 8 },
		rotation: { x: 0, y: 0, z: 0 }
	});

	let shouldForceCameraState = $state(false);

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
			x: 0 - normalizedPosY * 0.1,
			y: 0 - normalizedPosX * 0.1,
			z: camera.current.rotation.z
		};
	}

	function applyMouseCameraRotation() {
		cameraRotation.current = gsap.utils.interpolate(
			cameraRotation.current,
			cameraRotation.target,
			cameraRotation.ease
		);
		cameraState.rotation = cameraRotation.current;
	}

	useTask(() => {
		if (shouldForceCameraState) {
			applyMouseCameraRotation();
		}
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[cameraState.position.x, cameraState.position.y, cameraState.position.z]}
	rotation={[cameraState.rotation.x, cameraState.rotation.y, cameraState.rotation.z]}
	fov={70}
>
	<!-- <OrbitControls enableZoom={true} /> -->
</T.PerspectiveCamera>

<!-- <Pane title="Camera" position="fixed" y={70} x={window.innerWidth - 500}> -->
{#snippet cameraConfigPage()}
	<TabPage title="Camera">
		<Checkbox bind:value={shouldForceCameraState} label="Move camera with mouse" />
		<Point bind:value={cameraState.position} label="Position" expanded={true} picker="inline" />
		<RotationEuler bind:value={cameraState.rotation} label="Rotation" picker={'inline'} />
		<Button on:click={resetCameraState} title="Reset" />
	</TabPage>
	<!-- </Pane> -->
{/snippet}
