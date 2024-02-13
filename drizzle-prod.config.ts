import { TURSO_DB_AUTH_TOKEN, TURSO_DB_URL } from '$env/static/private';

import type { Config } from 'drizzle-kit';
export default {
	schema: './src/lib/server/database/schema.ts',
	out: './drizzle',
	dialect: 'sqlite',
	// driver: 'turso',
	dbCredentials: {
		url: TURSO_DB_URL,
		authToken: TURSO_DB_AUTH_TOKEN
	}
} satisfies Config;
