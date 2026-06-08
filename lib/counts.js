// Serverless-friendly download counter backed by Upstash Redis (Vercel KV).
//
// Replaces the old sqlite/sequelize store, which can't persist on Vercel's
// ephemeral filesystem. Counts live in a single Redis hash ("downloads",
// field = scriptName), so reads are one HGETALL and increments are an atomic
// HINCRBY.
//
// Env: provisioning the Upstash integration in Vercel sets
// UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (the older Vercel KV naming
// KV_REST_API_URL/TOKEN is also accepted). If neither is present the helpers
// degrade gracefully (reads return {}, increments return null) so the site
// never 500s before the store is wired up.
import { Redis } from '@upstash/redis';

const KEY = 'downloads';
let client; // undefined = not yet initialised, null = no credentials

function getRedis() {
    if (client !== undefined) return client;
    const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    client = url && token ? new Redis({ url, token }) : null;
    return client;
}

/** Returns { [scriptName]: count } for all tracked payloads. */
export async function getCounts() {
    const redis = getRedis();
    if (!redis) return {};
    const hash = await redis.hgetall(KEY);
    const out = {};
    if (hash) {
        for (const name of Object.keys(hash)) out[name] = Number(hash[name]) || 0;
    }
    return out;
}

/** Atomically increments one payload's count; returns the new value (or null). */
export async function incrementCount(scriptName) {
    const redis = getRedis();
    if (!redis) return null;
    return await redis.hincrby(KEY, scriptName, 1);
}
