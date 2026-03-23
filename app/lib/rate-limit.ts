const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 5; // Max 5 submissions per minute per IP

/**
 * Basic in-memory rate limiter per IP.
 * Best for single-instance or basic serverless deployments.
 */
export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowData = rateLimitMap.get(ip);

  // If no record exists or the window has expired, reset it
  if (!windowData || now - windowData.lastReset > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  // If the count exceeds the max allowed requests, reject
  if (windowData.count >= MAX_REQUESTS) {
    return true;
  }

  // Otherwise, increment the count
  windowData.count += 1;
  return false;
}
