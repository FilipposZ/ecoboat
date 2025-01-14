import { type Snippet } from 'svelte';


class ConfigPane {
    configPageSnippets: Snippet<[]>[] = $state([]);

    addConfigSnippet(snip: Snippet<[]>) {
        this.configPageSnippets.push(snip);
    }

    removeConfigSnippet(snip: Snippet<[]>) {
        this.configPageSnippets = this.configPageSnippets.filter(s => s !== snip);
    }
}

export const configPane = new ConfigPane();