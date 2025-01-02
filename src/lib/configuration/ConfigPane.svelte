<script lang="ts">
	import { Pane } from 'svelte-tweakpane-ui';
	import { configPane } from '$lib/configuration/config.svelte';
</script>

<Pane title="Configuration" position="fixed" y={70}>
	{#each configPane.configPageSnippets as configFolder}
		{@render configFolder()}
	{/each}
</Pane>
