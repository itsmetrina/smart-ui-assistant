const WINDOW_TIME = 5000;
const MAX_REQUESTS = 3;

const ipBuckets = new Map<string, { count: number; firstRequest: number }>();

export function rateLimit(ip: string) {
    const now = Date.now();
    const bucket = ipBuckets.get(ip);

    if (!bucket) {
        ipBuckets.set(ip, { count: 1, firstRequest: now });
        return { allowed: true };
    }

    if (now - bucket.firstRequest > WINDOW_TIME) {
        ipBuckets.set(ip, { count: 1, firstRequest: now });
        return { allowed: true };
    }

    if (bucket.count < MAX_REQUESTS) {
        bucket.count++;
        return { allowed: true };
    }

    return {
        allowed: false,
        retryAfter: WINDOW_TIME - (now - bucket.firstRequest)
    }
}