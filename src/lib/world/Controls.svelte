<script lang="ts">
	import { CatmullRomCurve3, Vector3 } from 'three';
	import { T, useThrelte } from '@threlte/core';
	import { useTask } from '@threlte/core';
	import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras';
	import { gsap } from 'gsap';

	$effect(() => {
		// console.log(progress);
	});

	let lerp = {
		current: 0,
		target: 0,
		ease: 0.01
	};

	const { scene, camera } = useThrelte();

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

	const speedModifier = 0.001;

	window.addEventListener('wheel', (e) => updateProgress(e.deltaY * speedModifier));

	function updateProgress(offset: number) {
		lerp.target += offset;
		lerp.target = gsap.utils.clamp(0, 1, lerp.target);
	}

	useTask((delta) => {
		lerp.current = gsap.utils.interpolate(lerp.current, lerp.target, lerp.ease);

		const newPosition = new Vector3(
			curve.getPoint(lerp.current).x,
			camera.current.position.y,
			curve.getPoint(lerp.current).z
		);
		camera.current.position.copy(newPosition);

		// get boat position
		// camera.current.lookAt(new Vector3(0, 7, 0));
	});
</script>

<T.Mesh>
	<MeshLineGeometry points={curve.getPoints(50)} />
	<MeshLineMaterial width={0.1} color="#fe3d00" />
</T.Mesh>
