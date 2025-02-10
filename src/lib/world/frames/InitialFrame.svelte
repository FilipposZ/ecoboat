<script lang="ts">
	import { useThrelte } from '@threlte/core';
	import { Text } from '@threlte/extras';
	import { gsap } from 'gsap';
	import { Euler, Vector3 } from 'three';
	import { Frame, TextOptions } from './Frame.svelte';

	const { camera } = useThrelte();

	const { timeline = gsap.timeline() } = $props();

	const frameOptions = new Frame({
		camera: { position: new Vector3(3.2, 8, 7), rotation: new Euler(0, 7, 0) },
		text: new TextOptions({
			value:
				'A trip with the boat\nExplore the wonders of EcoBoat, where every journey is an exploration \nof eco-friendly exhibits that inspire and educate.',
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
