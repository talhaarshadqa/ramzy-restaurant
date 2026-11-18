// Ensures the admin user exists in the database with known credentials.
// Runs during the Vercel build, AFTER migrations (so the table exists).
//
// Behaviour (controlled entirely by environment variables):
//   - If SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD are not set -> does nothing
//     (so we never create a weak default admin in production).
//   - If no admin row exists for that email -> it is created.
//   - The password of an EXISTING admin is only overwritten when
//     ADMIN_FORCE_RESET === 'true'. This way normal deploys never clobber a
//     password the owner later changed from the admin panel; set the flag to
//     'true' once to force a reset, then remove it.
//
// Uses the `pg` driver directly with raw SQL so it has no dependency on the
// generated Prisma client (which is TypeScript and can't be imported from a
// plain .mjs script). Never fails the build: on error it logs and exits 0.
import crypto from 'node:crypto';

import bcrypt from 'bcryptjs';
import pg from 'pg';

const email = process.env.SEED_ADMIN_EMAIL;
const password = process.env.SEED_ADMIN_PASSWORD;
const forceReset = process.env.ADMIN_FORCE_RESET === 'true';
const connectionString = process.env.DATABASE_URL;

if (!email || !password) {
    console.log('ensure-admin: SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD not set — skipping.');
    process.exit(0);
}

if (!connectionString) {
    console.warn('ensure-admin: DATABASE_URL not set — skipping.');
    process.exit(0);
}

const isLocal = /@(localhost|127\.0\.0\.1)[:/]/.test(connectionString);
const sslDisabled = /sslmode=disable/.test(connectionString);
const client = new pg.Client({
    connectionString,
    ssl: isLocal || sslDisabled ? undefined : {rejectUnauthorized: false},
});

try {
    await client.connect();
    const passwordHash = await bcrypt.hash(password, 10);

    const {rows} = await client.query('SELECT id FROM "AdminUser" WHERE email = $1 LIMIT 1', [email]);

    if (rows.length === 0) {
        await client.query(
            'INSERT INTO "AdminUser" (id, email, "passwordHash", name, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW())',
            [crypto.randomUUID(), email, passwordHash, 'Ramzy Admin'],
        );
        console.log(`ensure-admin: created admin "${email}".`);
    } else if (forceReset) {
        await client.query('UPDATE "AdminUser" SET "passwordHash" = $1, "updatedAt" = NOW() WHERE email = $2', [passwordHash, email]);
        console.log(`ensure-admin: reset password for existing admin "${email}".`);
    } else {
        console.log(`ensure-admin: admin "${email}" already exists — password left unchanged (set ADMIN_FORCE_RESET=true to reset).`);
    }
} catch (err) {
    console.error('ensure-admin: failed (continuing build anyway):', err?.message ?? err);
} finally {
    await client.end().catch(() => {});
}

process.exit(0);
