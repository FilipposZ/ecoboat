import { type Snippet } from 'svelte';


class ConfigPane {
    configPageSnippets: Snippet[] = $state([]);

    addConfigSnippet(snippet: Snippet) {
        this.configPageSnippets.push(snippet);
    }

    removeConfigSnippet(snippet: Snippet) {
        this.configPageSnippets = this.configPageSnippets.filter(s => s !== snippet);
    }
}

export const configPane = new ConfigPane();