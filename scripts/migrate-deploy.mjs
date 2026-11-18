// Runs `prisma migrate deploy`, retrying a few times on the transient Postgres
// advisory-lock timeout (error P1002) that can happen when the serverless database
// is cold or briefly contended during a Vercel build. Without this, deploys fail
// at random and need a manual retry.
import {execSync} from 'node:child_process';

const MAX_ATTEMPTS = 4;

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
        execSync('npx prisma migrate deploy', {stdio: 'inherit'});
        process.exit(0);
    } catch {
        if (attempt === MAX_ATTEMPTS) {
            console.error(`\nprisma migrate deploy failed after ${MAX_ATTEMPTS} attempts.`);
            process.exit(1);
        }
        const waitSeconds = attempt * 5;
        console.warn(`\nprisma migrate deploy attempt ${attempt} failed — retrying in ${waitSeconds}s...`);
        execSync(`sleep ${waitSeconds}`);
    }
}
