<script lang="ts">
	import { configPane } from '$lib/configuration/config.svelte';
	import { useTask } from '@threlte/core';
	import { Pane } from 'svelte-tweakpane-ui';

	let yPos = $state(window.scrollY);

	useTask(() => (yPos = window.scrollY));
</script>

<Pane title="Configuration" position="fixed" y={yPos + 70}>
	{#each configPane.configPageSnippets as configFolder}
		{@render configFolder()}
	{/each}
</Pane>
