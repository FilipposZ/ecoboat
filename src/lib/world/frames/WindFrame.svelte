<script lang="ts">
	import { useThrelte } from '@threlte/core';
	import { Text } from '@threlte/extras';
	import { gsap } from 'gsap';
	import { Euler, Vector3 } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils.js';
	import { Frame, TextOptions } from './Frame.svelte';

	const { camera } = useThrelte();

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
				z: frameOptions.camera.position.z
			})
			.to(
				camera.current.rotation,
				{
					x: frameOptions.camera.rotation.x,
					y: frameOptions.camera.rotation.y,
					z: frameOptions.camera.rotation.z
				},
				'<'
			)
			.to(
				frameOptions.text,
				{
					opacity: 1,
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
