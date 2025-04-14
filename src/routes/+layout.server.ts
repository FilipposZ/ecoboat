import { PERSONAL_POSTHOG_KEY } from '$env/static/private';
import { PUBLIC_POSTHOG_HOST, PUBLIC_POSTHOG_KEY } from '$env/static/public';
import { FeatureFlag } from '$lib/configuration/feature-flags.svelte';
import { PostHog } from 'posthog-node';
import { LayoutServerLoad } from './$types';


export const load: LayoutServerLoad = async ({ locals }) => {
    const posthog = new PostHog(PUBLIC_POSTHOG_KEY, { host: PUBLIC_POSTHOG_HOST, personalApiKey: PERSONAL_POSTHOG_KEY });
    
    const enabledFeatures: FeatureFlag[] = [];

    const posthogId = locals.posthogId || '';
    try {
            for (const featureFlag of Object.values(FeatureFlag)) {
                if (await posthog.getFeatureFlag(featureFlag, posthogId)) {
                    enabledFeatures.push(featureFlag);
                }
           }
        } catch (e) {
            console.error(e);
        }
    
	return { user: locals.user, enabledFeatures };
};
