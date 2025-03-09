import { browser } from '$app/environment';
import { PUBLIC_POSTHOG_HOST, PUBLIC_POSTHOG_KEY } from '$env/static/public';
import posthog from 'posthog-js';

export const load = async ({data}) => {
	if (browser) {
		posthog.init(PUBLIC_POSTHOG_KEY, {
                api_host: PUBLIC_POSTHOG_HOST,
                person_profiles: 'always',
                capture_pageview: false,
                capture_pageleave: false
		});
	}

    return data;
};