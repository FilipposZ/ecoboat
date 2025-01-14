import posthog from 'posthog-js';
import { browser, dev } from '$app/environment';
import { PUBLIC_POSTHOG_KEY } from '$env/static/public';

export const load = async () => {
	if (browser && !dev) {
		posthog.init(PUBLIC_POSTHOG_KEY, {
                api_host: 'https://eu.i.posthog.com',
                person_profiles: 'always'
		});
	}
};