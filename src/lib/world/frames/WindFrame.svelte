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

	const { timeline = gsap.timeline() }: { timeline: gsap.core.Timeline } = $props();

	const frameOptions = new Frame({
		camera: {
			position: new Vector3(15, 8, -1),
			rotation: new Euler(0, 90 * DEG2RAD, 0)
		},
		text: new TextOptions({
			value: 'Harness the power of \nthe wind',
			position: new Vector3(3.1, 9, 4),
			rotation: new Euler(0, 90 * DEG2RAD, 0),
			size: 0.3
		}),
		scrollTrigger: true
	});

	timeline.add(
		gsap
			.timeline({
				scrollTrigger: {
					trigger: '.second-move',
					start: 'top bottom',
					end: 'bottom top',
					scrub: 0.6
				}
			})
			.to(camera.current.position, {
				x: frameOptions.camera.position.x,
				y: frameOptions.camera.position.y,
				z: frameOptions.camera.position.z,
				duration: 4
			})
			.to(
				camera.current.rotation,
				{
					x: frameOptions.camera.rotation.x,
					y: frameOptions.camera.rotation.y,
					z: frameOptions.camera.rotation.z,
					duration: 4
				},
				'<'
			)
			.to(
				frameOptions.text,
				{
					opacity: 1,
					duration: 4,
					ease: 'back'
				},
				'>-50%'
			)
	);
</script>

<Text
	text={frameOptions.text.value}
	fillOpacity={frameOptions.text.opacity}
	fontSize={frameOptions.text.size}
	position={[
		frameOptions.text.position.x,
		frameOptions.text.position.y,
		frameOptions.text.position.z
	]}
	rotation={[
		frameOptions.text.rotation.x,
		frameOptions.text.rotation.y,
		frameOptions.text.rotation.z
	]}
	textAlign="center"
/>

{#snippet frameConfigTabPage()}
	<Folder title="WindFrame" expanded={false}>
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
