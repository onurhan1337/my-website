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

const UA_HINTS = ["bot", "crawler", "spider", "gpt", "ai", "claude", "anthropic"];
const SEC_FETCH_SITES = ["cross-site", "same-site", "same-origin", "none"];
const TAGGED_QUERY = /(^|[?&])(utm_source|ref|source|src)=/;
const DEFAULT_ENDPOINT = "https://kizzle.studio/api/ingest/events";

interface Landing {
  userAgent: string;
  referrer: string;
  query: string;
  secFetchSite: string;
  secFetchDest: string;
  siteHost: string;
}

function isAutomated(userAgent: string): boolean {
  if (userAgent.length === 0) return true;
  const ua = userAgent.toLowerCase();
  return UA_HINTS.some((hint) => ua.includes(hint));
}

function isExternalReferrer(referrer: string, siteHost: string): boolean {
  if (referrer.length === 0) return false;
  try {
    return new URL(referrer).hostname.toLowerCase() !== siteHost;
  } catch {
    return false;
  }
}

function isReferrerlessEntry(landing: Landing): boolean {
  if (landing.referrer.length > 0) return false;
  if (landing.secFetchDest !== "document") return false;
  return landing.secFetchSite === "cross-site" || landing.secFetchSite === "none";
}

function shouldSend(landing: Landing): boolean {
  if (isAutomated(landing.userAgent)) return true;
  if (isExternalReferrer(landing.referrer, landing.siteHost)) return true;
  if (TAGGED_QUERY.test(landing.query)) return true;
  return isReferrerlessEntry(landing);
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
  const secFetchSite = request.headers.get("sec-fetch-site") ?? "";
  const landing: Landing = {
    userAgent: request.headers.get("user-agent") ?? "",
    referrer: request.headers.get("referer") ?? "",
    query: url.search,
    secFetchSite: SEC_FETCH_SITES.includes(secFetchSite) ? secFetchSite : "",
    secFetchDest: request.headers.get("sec-fetch-dest") ?? "",
    siteHost: (env.KIZZLE_SITE_HOST ?? url.hostname).toLowerCase(),
  };
  if (!shouldSend(landing)) return;

  const body = JSON.stringify({
    id: crypto.randomUUID(),
    kind: isAutomated(landing.userAgent) ? "crawler" : "referral",
    path: url.pathname,
    query: landing.query,
    userAgent: landing.userAgent,
    referrer: landing.referrer,
    secFetchSite: landing.secFetchSite,
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
