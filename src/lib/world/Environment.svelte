<script lang="ts">
	import { configPane } from '$lib/configuration/config.svelte';
	import { type Observer } from '$lib/patterns/observer.svelte';
	import { Sky } from '@threlte/extras';
	import { Button, Folder, Slider } from 'svelte-tweakpane-ui';
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
		configPane.addConfigSnippet(environmentConfigSnippet);

		return () => {
			theme.detach(observer);
			configPane.removeConfigSnippet(environmentConfigSnippet);
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
	const springValues = new Spring(presets.sunset, {
		damping: 0.95,
		precision: 0.0001,
		stiffness: 0.05
	});

	let turbidity = $state(presets.sunset.turbidity);
	let rayleigh = $state(presets.sunset.rayleigh);
	let azimuth = $state(presets.sunset.azimuth);
	let elevation = $state(presets.sunset.elevation);
	let mieCoefficient = $state(presets.sunset.mieCoefficient);
	let mieDirectionalG = $state(presets.sunset.mieDirectionalG);
	let exposure = $state(presets.sunset.exposure);

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

{#snippet environmentConfigSnippet()}
	<Folder title="Environment" expanded={false}>
		<Folder title="Presets">
			<Button
				title="Noon"
				on:click={() => {
					applyPreset('noon');
				}}
			/>
			<Button
				title="Afternoon"
				on:click={() => {
					applyPreset('afternoon');
				}}
			/>
			<Button
				title="Sunset"
				on:click={() => {
					applyPreset('sunset');
				}}
			/>
			<Button
				title="Night"
				on:click={() => {
					applyPreset('night');
				}}
			/>
		</Folder>
		<Folder title="Advanced options">
			<Slider bind:value={turbidity} label="Turbidity" min={0} max={20} />
			<Slider bind:value={rayleigh} label="Rayleigh" min={0} max={4} />
			<Slider bind:value={azimuth} label="Azimuth" min={-180} max={180} />
			<Slider bind:value={elevation} label="Elevation" min={-5} max={90} />
			<Slider bind:value={mieCoefficient} label="Mie Coefficient" min={0} max={0.1} />
			<Slider bind:value={mieDirectionalG} label="Mie Directional G" min={0} max={1} />
			<Slider bind:value={exposure} label="Exposure" min={0} max={2} />
		</Folder>
	</Folder>
{/snippet}
