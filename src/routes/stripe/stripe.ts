import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';

//TODO: Update to latest stripe client but seems to cause error
export const stripeClient = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2024-06-20',
	httpClient: Stripe.createFetchHttpClient()
});
