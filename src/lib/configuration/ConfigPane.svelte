<script lang="ts">
	import { Pane, TabGroup } from 'svelte-tweakpane-ui';
	import { getConfigTabPages } from '$lib/configuration/config.svelte';
</script>

<Pane title="Configuration" position="fixed" y={70}>
	<TabGroup>
		{#each getConfigTabPages() as tabPage}
			<!-- {@debug tabPage} -->
			{@render tabPage()}
		{/each}
	</TabGroup>
</Pane>
