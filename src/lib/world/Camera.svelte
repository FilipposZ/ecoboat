<script lang="ts">
	import { configPane } from '$lib/configuration/config.svelte';
	import { type Transform } from '$lib/utils/graphics.svelte';
	import { T, useTask, useThrelte } from '@threlte/core';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	import { Button, Checkbox, Folder, Point, RotationEuler } from 'svelte-tweakpane-ui';

	const { camera } = useThrelte();

	let cameraState: { current: Transform; target: Transform } = $state({
		current: { position: { x: 3.5, y: 8.5, z: 10 }, rotation: { x: 0, y: 0, z: 0 } },
		target: { position: { x: 3.5, y: 8.5, z: 10 }, rotation: { x: 0, y: 0, z: 0 } }
	});

	let shouldForceCameraState = $state(false);

	function resetCameraState() {
		cameraState.target.position = { x: 3.5, y: 8.5, z: 8 };
		cameraState.target.rotation = { x: 0, y: 0, z: 0 };
	}

	onMount(() => {
		window.addEventListener('pointermove', rotateCameraWithMouse);
		configPane.addConfigSnippet(cameraConfigPage);

		return () => {
			window.removeEventListener('pointermove', rotateCameraWithMouse);
			configPane.removeConfigSnippet(cameraConfigPage);
		};
	});

	function rotateCameraWithMouse(event: PointerEvent) {
		const normalizedPosX = (event.x / window.innerWidth) * 2 - 1;
		const normalizedPosY = (event.y / window.innerHeight) * 2 - 1;

		// console.log(normalizedPosX, normalizedPosY);
		cameraState.target.rotation = {
			x: -normalizedPosY * 0.1,
			y: -normalizedPosX * 0.1,
			z: camera.current.rotation.z
		};
	}

	useTask(() => {
		if (shouldForceCameraState) {
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

{#snippet cameraConfigPage()}
	<Folder title="Camera" expanded={false}>
		<Checkbox bind:value={shouldForceCameraState} label="Move camera with mouse" />
		<Point bind:value={cameraState.target.position} label="Position" picker="inline" />
		<RotationEuler
			bind:value={cameraState.target.rotation}
			expanded={true}
			label="Rotation"
			picker={'inline'}
		/>
		<Button on:click={resetCameraState} title="Reset" />
	</Folder>
{/snippet}
