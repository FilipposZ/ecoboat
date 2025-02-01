<script lang="ts">
	import { configPane } from '$lib/configuration/config.svelte';
	import { useThrelte } from '@threlte/core';
	import { Text } from '@threlte/extras';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	import { Checkbox, Folder, Point, Slider, Textarea } from 'svelte-tweakpane-ui';
	import { Euler, Vector3 } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';
	import { Frame, TextOptions } from './Frame.svelte';

	const { camera } = useThrelte();

	onMount(() => {
		configPane.addConfigSnippet(frameConfigTabPage);

		return () => {
			configPane.removeConfigSnippet(frameConfigTabPage);
		};
	});

	const { timeline = gsap.timeline() } = $props();

	const frameOptions = new Frame({
		camera: { position: new Vector3(3.2, 8, 7), rotation: new Euler(0, 7, 0) },
		text: new TextOptions({
			value: 'A trip with the boat',
			position: new Vector3(0, 9.2, 3.4),
			rotation: new Euler(0, 0, 0)
		})
	});

	timeline.addLabel('first-move').add(
		gsap
			.timeline({
				scrollTrigger: {
					trigger: '.first-move',
					start: 'top top',
					end: 'bottom top'
					// scrub: 0.6
				}
			})
			.to(camera.current.position, {
				x: frameOptions.camera.position.x,
				y: frameOptions.camera.position.y,
				z: frameOptions.camera.position.z,
				duration: 10,
				ease: 'expo.out'
			})
			.to(
				frameOptions.text,
				{
					opacity: 1,
					duration: 10,
					ease: 'back'
				},
				'>-50%'
			)
	);
</script>

<!-- <TransformControls> -->
<Text
	text={frameOptions.text.value}
	fillOpacity={frameOptions.text.opacity}
	fontSize={frameOptions.text.size}
	position={[
		frameOptions.text.position.x,
		frameOptions.text.position.y,
		frameOptions.text.position.z
	]}
/>

<!-- </TransformControls> -->

{#snippet frameConfigTabPage()}
	<Folder title="InitialFrame" expanded={false}>
		<Folder title="Text" expanded={true}>
			<Textarea bind:value={frameOptions.text.value} label="Text" />
			<Slider label="Font Size" bind:value={frameOptions.text.size} min={0} max={10} />
			<Point
				bind:value={frameOptions.text.position}
				label="Position"
				expanded={true}
				picker="inline"
			/>

			<Folder title="Advanced Text Options" expanded={false}>
				<Checkbox label="bevelEnabled" bind:value={frameOptions.text.bevelEnabled} />
				<Slider label="bevelOffset" bind:value={frameOptions.text.bevelOffset} min={0} max={2} />
				<Slider
					label="bevelSegments"
					bind:value={frameOptions.text.bevelSegments}
					step={1}
					min={0}
					max={50}
				/>
				<Slider label="bevelSize" bind:value={frameOptions.text.bevelSize} min={0} max={2} />
				<Slider
					label="bevelThickness"
					bind:value={frameOptions.text.bevelThickness}
					min={0}
					max={2}
				/>
				<Slider
					label="curveSegments"
					bind:value={frameOptions.text.curveSegments}
					step={1}
					min={0}
					max={50}
				/>
				<Slider label="height" bind:value={frameOptions.text.height} min={0} max={5} />
				<Slider label="smooth" bind:value={frameOptions.text.smooth} min={0} max={180 * DEG2RAD} />
			</Folder>
		</Folder>
	</Folder>
{/snippet}
