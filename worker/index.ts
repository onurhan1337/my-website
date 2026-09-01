interface AssetsBinding {
  fetch(request: Request): Promise<Response>;
}

interface WaitContext {
  waitUntil(promise: Promise<unknown>): void;
}

interface Env {
  ASSETS: AssetsBinding;
  KIZZLE_KEY_ID: string;
  KIZZLE_ENDPOINT?: string;
  KIZZLE_SECRET?: string;
  KIZZLE_SITE_HOST?: string;
}

const UA_HINTS = ["bot", "crawler", "spider", "gpt", "ai"];
const DEFAULT_ENDPOINT = "https://kizzle.studio/api/ingest/events";

function shouldSend(userAgent: string, referrer: string, siteHost: string): boolean {
  if (userAgent.length === 0) return true;
  const ua = userAgent.toLowerCase();
  if (UA_HINTS.some((hint) => ua.includes(hint))) return true;
  if (referrer.length === 0) return false;
  try {
    return new URL(referrer).hostname.toLowerCase() !== siteHost;
  } catch {
    return false;
  }
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function recordEvent(request: Request, response: Response, env: Env): Promise<void> {
  const secret = env.KIZZLE_SECRET;
  if (!secret || !env.KIZZLE_KEY_ID) return;

  const url = new URL(request.url);
  const siteHost = (env.KIZZLE_SITE_HOST ?? url.hostname).toLowerCase();
  const userAgent = request.headers.get("user-agent") ?? "";
  const referrer = request.headers.get("referer") ?? "";
  if (!shouldSend(userAgent, referrer, siteHost)) return;

  const ua = userAgent.toLowerCase();
  const automated = userAgent.length === 0 || UA_HINTS.some((hint) => ua.includes(hint));
  const body = JSON.stringify({
    id: crypto.randomUUID(),
    kind: automated ? "crawler" : "referral",
    path: url.pathname,
    userAgent,
    referrer,
    ip: request.headers.get("cf-connecting-ip") ?? "",
    status: response.status,
    occurredAt: new Date().toISOString(),
  });
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = await sign(`${timestamp}.${body}`, secret);

  await fetch(env.KIZZLE_ENDPOINT ?? DEFAULT_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/x-ndjson",
      "x-kizzle-key-id": env.KIZZLE_KEY_ID,
      "x-kizzle-timestamp": timestamp,
      "x-kizzle-signature": signature,
    },
    body,
  }).catch(() => undefined);
}

export default {
  async fetch(request: Request, env: Env, ctx: WaitContext): Promise<Response> {
    const response = await env.ASSETS.fetch(request);
    if (request.method === "GET" && response.status < 500) {
      ctx.waitUntil(recordEvent(request, response, env));
    }
    return response;
  },
};
