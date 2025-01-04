<script lang="ts">
	import { Plane, Vector3 } from 'three';
	import { useThrelte } from '@threlte/core';
	import { gsap } from 'gsap';
	import { Folder, Text as PaneText, Slider, Point, Textarea, Checkbox } from 'svelte-tweakpane-ui';
	import { Text, TransformControls } from '@threlte/extras';
	import { configPane } from '$lib/configuration/config.svelte';

	const { camera } = useThrelte();

	configPane.addConfigSnippet(frameConfigTabPage);

	import { DEG2RAD } from 'three/src/math/MathUtils.js';
	class TextOptions {
		value: string = $state('A trip with the boat ..');
		position: Vector3 = $state(new Vector3(0, 9.2, 3.4));
		size: number = $state(0.2);

		opacity = $state(0);
		bevelEnabled = $state(true);
		bevelOffset = $state(0);
		bevelSegments = $state(20);
		bevelSize = $state(0.2);
		bevelThickness = $state(0.1);
		curveSegments = $state(12);
		height = $state(1);
		smooth = $state(0.1);
	}

	export class Frame {
		cameraPosition: Vector3 = $state(new Vector3(3.2, 8, 7));
		text: TextOptions = $state(new TextOptions());
	}

	const frame = $derived(new Frame());
	let timeline: gsap.core.Timeline;

	$effect(() => {
		timeline = gsap
			.timeline()
			.to(camera.current.position, {
				x: frame.cameraPosition.x,
				y: frame.cameraPosition.y,
				z: frame.cameraPosition.z,
				duration: 3,
				ease: 'expo.out'
			})
			.to(
				frame.text,
				{
					opacity: 1,
					duration: 10,
					ease: 'back'
				},
				'>-2'
			);
	});
</script>

<!-- <TransformControls> -->
<Text
	text={frame.text.value}
	fillOpacity={frame.text.opacity}
	fontSize={frame.text.size}
	position={[frame.text.position.x, frame.text.position.y, frame.text.position.z]}
/>
<!-- </TransformControls> -->

{#snippet frameConfigTabPage()}
	<Folder title="Text" expanded={false}>
		<Textarea bind:value={frame.text.value} label="Text" />
		<Slider label="Font Size" bind:value={frame.text.size} min={0} max={10} />
		<Point bind:value={frame.text.position} label="Position" expanded={true} picker="inline" />
		<Folder title="Advanced Options" expanded={false}>
			<Checkbox label="bevelEnabled" bind:value={frame.text.bevelEnabled} />
			<Slider label="bevelOffset" bind:value={frame.text.bevelOffset} min={0} max={2} />
			<Slider
				label="bevelSegments"
				bind:value={frame.text.bevelSegments}
				step={1}
				min={0}
				max={50}
			/>
			<Slider label="bevelSize" bind:value={frame.text.bevelSize} min={0} max={2} />
			<Slider label="bevelThickness" bind:value={frame.text.bevelThickness} min={0} max={2} />
			<Slider
				label="curveSegments"
				bind:value={frame.text.curveSegments}
				step={1}
				min={0}
				max={50}
			/>
			<Slider label="height" bind:value={frame.text.height} min={0} max={5} />
			<Slider label="smooth" bind:value={frame.text.smooth} min={0} max={180 * DEG2RAD} />
		</Folder>
	</Folder>
{/snippet}
