<script lang='ts'>
	import type { Snippet } from 'svelte';
    import { Pane, TabPage, Button, TabGroup } from 'svelte-tweakpane-ui';
	import { setContext, getContext } from 'svelte';

    const configPane = Symbol('config-pane');

    export function addConfigTabPage(configTabPage: Snippet) {
        let currentSnippets = getConfigTabPages();
        currentSnippets.push(configTabPage);

        setContext(configPane, currentSnippets);
    }
    
    export function getConfigTabPages(): Snippet[] {
        return getContext(configPane) as Snippet[] || [];
    }

    addConfigTabPage(exampleTabPage1);
    addConfigTabPage(exampleTabPage2);
</script>

{#snippet exampleTabPage1()}
    <TabPage title="A">
        <Button on:click={() => alert('A...')} title="Button A" />
    </TabPage>
{/snippet}
{#snippet exampleTabPage2()}
    <TabPage title="B">
        <Button on:click={() => alert('B...')} title="Button B" />
    </TabPage>
{/snippet}

<Pane
    title="Configuration"
    position="fixed"
    y={70}
>
    <TabGroup>
        {#each getConfigTabPages() as tabPage}
            {@render tabPage()}
        {/each}
    </TabGroup>
</Pane>