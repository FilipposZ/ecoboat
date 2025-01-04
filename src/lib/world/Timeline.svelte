<script lang="ts">
	import { configPane } from '$lib/configuration/config.svelte';
	import { T, useTask, useThrelte } from '@threlte/core';
	import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	import { Checkbox, Folder, Point } from 'svelte-tweakpane-ui';
	import { CatmullRomCurve3, Vector3 } from 'three';
	import Frame from './Frame.svelte';

	const { scene, camera } = useThrelte();
	let lerp = {
		current: 0,
		target: 0,
		ease: 0.01
	};

	onMount(() => {
		configPane.addConfigSnippet(timelineConfigSnippet);
		return () => {
			configPane.removeConfigSnippet(timelineConfigSnippet);
		};
	});

	let cameraCurrentPosition = $state(camera.current.position);

	let forceCameraPositionOnScroll = $state(false);

	// The path of the camera can be defined in the config pane
	// https://kitschpatrol.com/svelte-tweakpane-ui/docs/components/cubicbezier
	const curve = new CatmullRomCurve3(
		[
			new Vector3(5, camera.current.position.y, 20),
			new Vector3(20, camera.current.position.y, -20),
			new Vector3(-20, camera.current.position.y, -20),
			new Vector3(-20, camera.current.position.y, 20)
		],
		true
	);

	const speedModifier = 0.0005;

	window.addEventListener('wheel', (e) => updateProgress(e.deltaY * speedModifier));

	function updateProgress(offset: number) {
		lerp.target += offset;
		lerp.target = gsap.utils.clamp(0, 1, lerp.target);
	}

	function moveCameraToPosition(position: Vector3) {
		const timeline = gsap.timeline().to(camera.current.position, {
			x: position.x,
			y: position.y,
			z: position.z,
			duration: 3,
			ease: 'power2.inOut'
		});
		camera.current.position.copy(position);

		cameraCurrentPosition = position;
	}

	useTask((delta) => {
		lerp.current = gsap.utils.interpolate(lerp.current, lerp.target, lerp.ease);

		const newPosition = new Vector3(
			curve.getPoint(lerp.current).x,
			camera.current.position.y,
			curve.getPoint(lerp.current).z
		);

		if (forceCameraPositionOnScroll) {
			moveCameraToPosition(newPosition);
			// camera.current.position.copy(newPosition);

			// look at the boat
			camera.current.lookAt(new Vector3(0, 7, 0));
		}
	});
</script>

<T.Mesh>
	<MeshLineGeometry points={curve.getPoints(50)} />
	<MeshLineMaterial width={0.1} color="#fe3d00" />
</T.Mesh>

<Frame />

{#snippet timelineConfigSnippet()}
	<Folder title="Timeline" expanded={false}>
		<Checkbox bind:value={forceCameraPositionOnScroll} label="Move camera on scroll" />
		<Point bind:value={cameraCurrentPosition} label="Position" expanded={true} picker="inline" />
	</Folder>
{/snippet}
