"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { highlight } from "sugar-high";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ApiRequestProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  headers?: Record<string, string>;
  body?: string;
  response: {
    status: number;
    body: string | Record<string, unknown>;
  };
  description?: string;
}

const methodColors = {
  GET: "bg-well text-ink-2",
  POST: "bg-well text-ink-2",
  PUT: "bg-well text-ink-2",
  DELETE: "bg-ink text-paper",
  PATCH: "bg-ink text-paper",
};

const formatJson = (data: string | Record<string, unknown>) => {
  try {
    const parsed = typeof data === "string" ? JSON.parse(data) : data;
    return JSON.stringify(parsed, null, 2);
  } catch {
    return String(data);
  }
};

const buildCurlCommand = (
  method: string,
  url: string,
  headers: Record<string, string>,
  body?: string
) => {
  let cmd = `curl -X ${method} ${url}`;

  if (Object.keys(headers).length > 0) {
    cmd +=
      " \\\n" +
      Object.entries(headers)
        .map(([k, v]) => `  -H "${k}: ${v}"`)
        .join(" \\\n");
  }

  if (body) {
    const hasContentType = Object.keys(headers).some(
      (k) => k.toLowerCase() === "content-type"
    );
    if (!hasContentType) cmd += ` \\\n  -H "Content-Type: application/json"`;
    cmd += ` \\\n  -d '${formatJson(body).replace(/'/g, "'\\''")}'`;
  }

  return cmd;
};

export function ApiRequest({
  method,
  url,
  headers = {},
  body,
  response,
  description,
}: ApiRequestProps) {
  const [isSending, setIsSending] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [requestTime, setRequestTime] = useState<number | null>(null);

  const handleSendRequest = async () => {
    setIsSending(true);
    setShowResponse(false);
    const startTime = Date.now();

    await new Promise((resolve) =>
      setTimeout(resolve, 400 + Math.random() * 600)
    );

    setRequestTime(Date.now() - startTime);
    setIsSending(false);
    setShowResponse(true);
  };

  const isSuccess = response.status >= 200 && response.status < 300;
  const formattedBody = body ? formatJson(body) : "";
  const formattedResponse = formatJson(response.body);
  const curlCommand = buildCurlCommand(method, url, headers, body);

  return (
    <div className="my-8 rounded-md border border-rule bg-paper p-6">
      <div className="flex items-center gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span
            className={cn(
              "rounded px-2 py-1 font-mono text-caption",
              methodColors[method]
            )}
          >
            {method}
          </span>
          <div className="min-w-0 flex-1">
            <input
              type="text"
              value={url}
              readOnly
              className="w-full rounded border border-rule bg-paper px-2.5 py-1.5 font-mono text-caption text-ink focus:border-ink focus:outline-none"
            />
          </div>
        </div>
        <button
          onClick={handleSendRequest}
          disabled={isSending}
          className={cn(
            "flex items-center gap-2 rounded px-3 py-1.5 text-small transition-colors",
            isSending
              ? "cursor-default bg-well text-ink-3"
              : "bg-ink text-paper"
          )}
        >
          {isSending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Sending</span>
            </>
          ) : (
            <span>Send</span>
          )}
        </button>
      </div>

      {description && (
        <p className="mt-4 text-small text-ink-2">{description}</p>
      )}

      <div className="mt-4 divide-y divide-rule border-t border-rule">
        {Object.keys(headers).length > 0 && (
          <div className="py-4">
            <div className="mb-2 text-caption text-ink-2">Headers</div>
            <div className="space-y-2">
              {Object.entries(headers).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center gap-3 rounded bg-well p-2 text-small"
                >
                  <span className="min-w-[140px] font-medium text-ink">
                    {key}
                  </span>
                  <span className="flex-1 font-mono text-caption text-ink-2">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {body && (
          <div className="py-4">
            <div className="mb-2 text-caption text-ink-2">Request body</div>
            <div className="overflow-hidden rounded-md bg-well">
              <pre className="overflow-x-auto p-4">
                <code
                  className="font-mono text-caption text-ink"
                  dangerouslySetInnerHTML={{ __html: highlight(formattedBody) }}
                />
              </pre>
            </div>
          </div>
        )}

        <details className="group">
          <summary className="cursor-pointer py-4 text-caption text-ink-2 transition-colors hover:text-ink">
            cURL command
          </summary>
          <div className="pb-4">
            <div className="overflow-hidden rounded-md bg-well">
              <pre className="overflow-x-auto p-4">
                <code
                  className="font-mono text-caption text-ink"
                  dangerouslySetInnerHTML={{ __html: highlight(curlCommand) }}
                />
              </pre>
            </div>
          </div>
        </details>
      </div>

      <AnimatePresence>
        {(showResponse || isSending) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-rule"
          >
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <span className="text-small font-medium text-ink">
                  Response
                </span>
                {requestTime && (
                  <span className="font-mono text-caption text-ink-3">
                    {requestTime}ms
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded px-2 py-1 font-mono text-caption",
                    isSuccess ? "bg-ink text-paper" : "bg-well text-ink"
                  )}
                >
                  {isSuccess ? "●" : "○"} {response.status}
                </span>
              </div>
            </div>

            {isSending ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-4 w-4 animate-spin text-ink-2" />
                  <span className="text-small text-ink-2">
                    Sending request...
                  </span>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-md bg-well">
                <pre className="overflow-x-auto p-4">
                  <code
                    className="font-mono text-caption text-ink"
                    dangerouslySetInnerHTML={{
                      __html: highlight(formattedResponse),
                    }}
                  />
                </pre>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
