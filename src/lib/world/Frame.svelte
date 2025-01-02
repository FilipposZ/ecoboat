<script lang="ts">
	import { Plane, Vector3 } from 'three';
	import { useThrelte } from '@threlte/core';
	import { gsap } from 'gsap';
	import { Folder, Text as PaneText, Slider, Point } from 'svelte-tweakpane-ui';
	import { Text, TransformControls } from '@threlte/extras';
	import { configPane } from '$lib/configuration/config.svelte';

	const { camera } = useThrelte();

	configPane.addConfigTabPage(frameConfigTabPage);

	export class Frame {
		cameraPosition: Vector3 = $state(new Vector3(3.2, 8, 7));
		text: string = $state('A trip with the boat ..');
		textPos: Vector3 = $state(new Vector3(0, 9.2, 3.4));
		fontSize: number = $state(0.2);
	}

	const frame = $derived(new Frame());

	$effect(() => {
		let timeline = gsap.timeline().to(camera.current.position, {
			x: frame.cameraPosition.x,
			y: frame.cameraPosition.y,
			z: frame.cameraPosition.z,
			duration: 5,
			ease: 'expo.out'
		});
	});
</script>

<TransformControls>
	<Text
		text={frame.text}
		fontSize={frame.fontSize}
		position={[frame.textPos.x, frame.textPos.y, frame.textPos.z]}
	/>
</TransformControls>

{#snippet frameConfigTabPage()}
	<Folder title="Text" expanded={false}>
		<PaneText bind:value={frame.text} />
		<Slider bind:value={frame.fontSize} />
		<Point bind:value={frame.textPos} label="Position" expanded={true} picker="inline" />
	</Folder>
{/snippet}
