import { NextApiRequest } from "next";
import { Redis } from "@upstash/redis";
import { createHash } from "crypto";
import { headers } from "next/headers";

const redis = Redis.fromEnv();

export type ClickType =
  | "AVAILABILITY_DIALOG:EMAIL"
  | "AVAILABILITY_DIALOG:UPWORK"
  | "MAIN_PAGE:UPWORK"
  | "WORK_PAGE:EMAIL"
  | "WORK_PAGE:UPWORK";

const SESSION_TTL = 24 * 60 * 60;

function generateHash(ip: string, sessionId?: string): string {
  const input = sessionId ? `${ip}:${sessionId}` : ip;
  return createHash("sha256").update(input).digest("base64");
}

function generateKey(clickType: ClickType): string {
  return `CLICK:${clickType}`;
}

function generateSessionKey(
  ip: string,
  sessionId: string,
  clickType: ClickType
): string {
  const hash = generateHash(ip, sessionId);
  return `CLICK_SESSION:${clickType}:${hash}`;
}

function getIPFromHeaders(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  return xff ? xff.split(",")[0].trim() : "127.0.0.1";
}

function getUserAgentFromHeaders(headers: Headers): string {
  return headers.get("user-agent") || "";
}

function getSessionIdFromHeaders(headers: Headers): string {
  const cookieHeader = headers.get("cookie");
  if (cookieHeader) {
    const sessionMatch = cookieHeader.match(/sessionId=([^;]+)/);
    if (sessionMatch) {
      return sessionMatch[1];
    }
  }
  const sessionHeader = headers.get("x-session-id");
  if (sessionHeader) {
    return sessionHeader;
  }

  const userAgent = getUserAgentFromHeaders(headers);
  const hour = Math.floor(Date.now() / (60 * 60 * 1000));
  const uaHash = createHash("sha256")
    .update(userAgent)
    .digest("base64")
    .substring(0, 8);
  return `session_${hour}_${uaHash}`;
}

export function getIP(req: Request | NextApiRequest): string {
  const xff =
    req instanceof Request
      ? req.headers.get("x-forwarded-for")
      : req.headers["x-forwarded-for"];

  return xff ? (Array.isArray(xff) ? xff[0] : xff.split(",")[0]) : "127.0.0.1";
}

export function getUserAgent(req: Request | NextApiRequest): string {
  if (req instanceof Request) {
    return req.headers.get("user-agent") || "";
  }
  return req.headers["user-agent"] || "";
}

export function getSessionId(req: Request | NextApiRequest): string {
  if (req instanceof Request) {
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      const sessionMatch = cookieHeader.match(/sessionId=([^;]+)/);
      if (sessionMatch) {
        return sessionMatch[1];
      }
    }
    const sessionHeader = req.headers.get("x-session-id");
    if (sessionHeader) {
      return sessionHeader;
    }
  } else {
    const cookies = req.headers.cookie;
    if (cookies) {
      const sessionMatch = cookies.match(/sessionId=([^;]+)/);
      if (sessionMatch) {
        return sessionMatch[1];
      }
    }
    const sessionHeader = req.headers["x-session-id"];
    if (sessionHeader && typeof sessionHeader === "string") {
      return sessionHeader;
    }
  }

  const userAgent = getUserAgent(req);
  const hour = Math.floor(Date.now() / (60 * 60 * 1000));
  const uaHash = createHash("sha256")
    .update(userAgent)
    .digest("base64")
    .substring(0, 8);
  return `session_${hour}_${uaHash}`;
}

export async function trackClick(
  req: Request | NextApiRequest,
  clickType: ClickType
): Promise<{ success: boolean; count: number }> {
  try {
    const ip = getIP(req);
    const sessionId = getSessionId(req);
    const sessionKey = generateSessionKey(ip, sessionId, clickType);
    const countKey = generateKey(clickType);

    const hasClicked = await redis.exists(sessionKey);

    if (hasClicked) {
      const count = await redis.get<number>(countKey);
      return {
        success: true,
        count: count || 0,
      };
    }

    await redis.set(sessionKey, "1", { ex: SESSION_TTL });
    const newCount = await redis.incr(countKey);

    return {
      success: true,
      count: newCount,
    };
  } catch (error) {
    console.error("Error tracking click:", error);
    return {
      success: false,
      count: 0,
    };
  }
}

export async function trackClickServerAction(
  clickType: ClickType
): Promise<{ success: boolean; count: number }> {
  try {
    const headersList = await headers();
    const ip = getIPFromHeaders(headersList);
    const sessionId = getSessionIdFromHeaders(headersList);
    const sessionKey = generateSessionKey(ip, sessionId, clickType);
    const countKey = generateKey(clickType);

    const hasClicked = await redis.exists(sessionKey);

    if (hasClicked) {
      const count = await redis.get<number>(countKey);
      return {
        success: true,
        count: count || 0,
      };
    }

    await redis.set(sessionKey, "1", { ex: SESSION_TTL });
    const newCount = await redis.incr(countKey);

    return {
      success: true,
      count: newCount,
    };
  } catch (error) {
    console.error("Error tracking click:", error);
    return {
      success: false,
      count: 0,
    };
  }
}
