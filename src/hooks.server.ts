import { PUBLIC_POSTHOG_KEY } from '$env/static/public';
import { lucia } from '$lib/server/auth';
import type { Cookies, Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    setPosthogId(event);

	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

    event.locals.user = user;
    event.locals.session = session;

	return resolve(event);
};

function setPosthogId({ locals, cookies }: {locals: App.Locals, cookies: Cookies}) {
    const phCookieString = cookies.get(`ph_${PUBLIC_POSTHOG_KEY}_posthog`);
    const phCookie = phCookieString ? JSON.parse(phCookieString) : null;
    const posthogId = phCookie ? phCookie.distinct_id : null;
    
    locals.posthogId = posthogId;
}