import { PUBLIC_POSTHOG_HOST, PUBLIC_POSTHOG_KEY } from '$env/static/public';
import { FeatureFlag } from '$lib/configuration/feature-flags.svelte';
import { parse } from 'cookie';
import { PostHog } from 'posthog-node';
import { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (request) => {
    const posthog = new PostHog(PUBLIC_POSTHOG_KEY, { host: PUBLIC_POSTHOG_HOST });
    
    const cookies = parse(request.request.headers.get('cookie') || '');
    const cookieKey = `ph_${PUBLIC_POSTHOG_KEY}_posthog`;
  
    const enabledFeatures: FeatureFlag[] = [];
    if (cookies[cookieKey]) {
        try {
            const distinctId = JSON.parse(cookies[cookieKey]).distinct_id;
            for (const featureFlag of Object.values(FeatureFlag)) {
                if (await posthog.getFeatureFlag(featureFlag, distinctId)) {
                    enabledFeatures.push(featureFlag);
                }
            }
        } catch (e) {
            console.error(e);
        }

    }
    
	return { user: request.locals.user, enabledFeatures };
};
