import { afterNavigate, beforeNavigate } from '$app/navigation';
import { PUBLIC_ORIGIN, PUBLIC_POSTHOG_HOST, PUBLIC_POSTHOG_KEY } from '$env/static/public';
import { FeatureFlag } from '$lib/configuration/feature-flags.svelte.js';
import posthog from 'posthog-js';

export const load = async ({ data }) => {
    if (!import.meta.env.SSR) {
        posthog.init(PUBLIC_POSTHOG_KEY, {
            api_host: PUBLIC_POSTHOG_HOST,
            ...(import.meta.env.PROD && // sets up the reverse proxy 
                {
                    api_host: PUBLIC_ORIGIN + '/ingest',
                    ui_host: PUBLIC_POSTHOG_HOST
                }),
            capture_pageview: false,
            capture_pageleave: false,
            bootstrap: {
                featureFlags: getBootstrappedFeatureFlags()
            }
        });
    }

    if (import.meta.env.PROD) {
        // Capture the event manually, to handle single page apps
		beforeNavigate(() => posthog.capture('$pageleave'));
		afterNavigate(() => posthog.capture('$pageview'));
	}

    return data;
};

type BootstrappedFeatureFlags = {
    [key in FeatureFlag]?: boolean;
};

function getBootstrappedFeatureFlags(): BootstrappedFeatureFlags {
    const featureFlags: BootstrappedFeatureFlags = {};

    for (const featureFlag of Object.values(FeatureFlag)) {
        featureFlags[featureFlag] = false;
    }

    return featureFlags;
}