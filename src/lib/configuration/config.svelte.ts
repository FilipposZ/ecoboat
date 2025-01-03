import { type Snippet } from 'svelte';


class ConfigPane {
    configPageSnippets: Snippet[] = $state([]);

    addConfigTabPage(snippet: Snippet) {
        this.configPageSnippets.push(snippet);
    }
}

export const configPane = new ConfigPane();