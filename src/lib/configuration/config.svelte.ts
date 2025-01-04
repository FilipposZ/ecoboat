import { type Snippet } from 'svelte';


class ConfigPane {
    configPageSnippets: Snippet[] = $state([]);

    addConfigSnippet(snippet: Snippet) {
        this.configPageSnippets.push(snippet);
    }
}

export const configPane = new ConfigPane();