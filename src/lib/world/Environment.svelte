<script lang="ts">
	import { type Observer } from '$lib/patterns/observer.svelte';
	import { Sky } from '@threlte/extras';
	import { Spring } from 'svelte/motion';
	import Cloud from './Cloud.svelte';

	import { theme, type Theme } from '$lib/components/ThemeSelector.svelte';
	import { onMount } from 'svelte';

	class EnvironmentThemeObserver implements Observer {
		public update(subject: Theme): void {
			if (subject.isDarkMode) {
				applyPreset('night');
			} else {
				applyPreset('sunset');
			}
		}
	}

	const observer = new EnvironmentThemeObserver();
	onMount(() => {
		theme.attach(observer);

		return () => {
			theme.detach(observer);
		};
	});

	const presets = {
		sunset: {
			turbidity: 10,
			rayleigh: 3,
			azimuth: 185,
			elevation: 0.5,
			mieCoefficient: 0.005,
			mieDirectionalG: 0.7,
			exposure: 0.37
		},
		noon: {
			turbidity: 0.65,
			rayleigh: 0.17,
			azimuth: 185,
			elevation: 85,
			mieCoefficient: 0.013,
			mieDirectionalG: 0.7,
			exposure: 1
		},
		afternoon: {
			turbidity: 4.78,
			rayleigh: 0.3,
			azimuth: 185,
			elevation: 30,
			mieCoefficient: 0.002,
			mieDirectionalG: 0.86,
			exposure: 0.65
		},
		night: {
			turbidity: 20,
			rayleigh: 0.57,
			azimuth: 185,
			elevation: -5,
			mieCoefficient: 0.038,
			mieDirectionalG: 0,
			exposure: 0.26
		}
	};

	const initialPreset = theme.isDarkMode ? presets.night : presets.sunset;

	const springValues = new Spring(initialPreset, {
		damping: 0.95,
		precision: 0.0001,
		stiffness: 0.05
	});

	let turbidity = $state(initialPreset.turbidity);
	let rayleigh = $state(initialPreset.rayleigh);
	let azimuth = $state(initialPreset.azimuth);
	let elevation = $state(initialPreset.elevation);
	let mieCoefficient = $state(initialPreset.mieCoefficient);
	let mieDirectionalG = $state(initialPreset.mieDirectionalG);
	let exposure = $state(initialPreset.exposure);

	const applyPreset = (preset: keyof typeof presets) => {
		turbidity = presets[preset].turbidity;
		rayleigh = presets[preset].rayleigh;
		azimuth = presets[preset].azimuth;
		elevation = presets[preset].elevation;
		mieCoefficient = presets[preset].mieCoefficient;
		mieDirectionalG = presets[preset].mieDirectionalG;
		exposure = presets[preset].exposure;
	};

	$effect(() => {
		springValues.set({
			turbidity: turbidity,
			rayleigh: rayleigh,
			azimuth: azimuth,
			elevation: elevation,
			mieCoefficient: mieCoefficient,
			mieDirectionalG: mieDirectionalG,
			exposure: exposure
		});
	});
</script>

<Sky
	turbidity={springValues.current.turbidity}
	rayleigh={springValues.current.rayleigh}
	azimuth={springValues.current.azimuth}
	elevation={springValues.current.elevation}
	mieCoefficient={springValues.current.mieCoefficient}
	mieDirectionalG={springValues.current.mieDirectionalG}
/>

<Cloud position={[3, 20, -15]} />
