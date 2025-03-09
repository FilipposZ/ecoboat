import { getContext, setContext } from 'svelte';

export enum FeatureFlag {
    PricingComponent = 'pricing-component',
    NewsletterComponent = 'newsletter-component'
}

class Features {
    featureFlags: FeatureFlag[] = $state([]);
    
    constructor(featureFlags: FeatureFlag[]) {
        this.featureFlags = featureFlags;
    }
    
    isEnabled(feature: FeatureFlag): boolean {
        return this.featureFlags.includes(feature);
    }
}

const ENABLED_FEATURES_CTX = Symbol('enabled-features');

export function setEnabledFeatures(featureFlags: FeatureFlag[]): Features {
    const enabledFeatures = new Features(featureFlags);
    setContext(ENABLED_FEATURES_CTX, enabledFeatures);
    return enabledFeatures;
}

export function getEnabledFeatures(): Features {
    return getContext(ENABLED_FEATURES_CTX);
}