import { setContext, getContext, type Snippet } from 'svelte';

const configPaneKey = Symbol('config-pane');

class ConfigPane {
    configTabPages: Snippet[] = $state([]);

    addConfigTabPage(snippet: Snippet) {
        this.configTabPages.push(snippet);
    }

    getConfigTabPages() {
        return this.configTabPages || getContext(configPaneKey) as Snippet[] || [];
    }
}

const configPane = new ConfigPane();

export function addConfigTabPage(configTabPage: Snippet) {
    const currentSnippets = getConfigTabPages();
    currentSnippets.push(configTabPage);

    setContext(configPaneKey, currentSnippets);
    configPane.configTabPages = currentSnippets;
}

export function getConfigTabPages(): Snippet[] {
    return configPane.getConfigTabPages();
}