// One-time seed of the download counters into Upstash Redis (Vercel KV),
// preserving the counts that were live on the old VPS sqlite store.
//
// Run once after provisioning the Upstash integration in Vercel, with the
// store's REST creds in the environment, e.g.:
//   vercel env pull .env.local        # pulls UPSTASH_REDIS_REST_URL/TOKEN
//   node --env-file=.env.local scripts/seed-kv.mjs
import { Redis } from '@upstash/redis';

const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
if (!url || !token) {
    console.error('Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN in env.');
    process.exit(1);
}

// Counts migrated from the VPS (database.sqlite) on 2026-06-07.
const SEED = {
    'WinRM': 265,
    'IP grabber': 189,
    'Password Stealer': 263,
    'Windows Key Grabber': 192,
    'Windows Defender Disabler': 94,
    'Firefox Cookie Stealer': 80,
    'SSH Key Grabber': 134,
    'Tdata MacOS stealer': 46,
    'Tdata AppStore stealer': 44,
    'Tdata Windows stealer': 110,
    'VSCode Light Mode': 77,
};

const redis = new Redis({ url, token });
await redis.hset('downloads', SEED);
const after = await redis.hgetall('downloads');
console.log('Seeded download counts:', after);
