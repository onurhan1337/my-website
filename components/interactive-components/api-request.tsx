"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { highlight } from "sugar-high";
import { cn } from "@/lib/utils";
import { Send, Loader2, Code2, Clock } from "lucide-react";

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
  GET: "bg-[#eaeaea] text-[#959595] border-[#e6e6e6]",
  POST: "bg-[#eaeaea] text-[#959595] border-[#e6e6e6]",
  PUT: "bg-[#eaeaea] text-[#959595] border-[#e6e6e6]",
  DELETE: "bg-[#1a1a1a] text-white border-[#1a1a1a]",
  PATCH: "bg-[#4a4a4a] text-white border-[#4a4a4a]",
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
    <div className="my-8 border border-[#e5e5e5] bg-white">
      <div className="bg-[#f6f6f6] border-b border-[#e5e5e5] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span
              className={cn(
                "px-2.5 py-1 text-xs font-bold uppercase tracking-wide border",
                methodColors[method]
              )}
            >
              {method}
            </span>
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={url}
                readOnly
                className="w-full bg-white border border-[#e5e5e5] px-3 py-1.5 text-sm font-mono text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#F38020]/20 focus:border-[#F38020]"
              />
            </div>
          </div>
          <button
            onClick={handleSendRequest}
            disabled={isSending}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 text-sm font-semibold transition-all",
              isSending
                ? "bg-[#e5e5e5] text-[#999] cursor-not-allowed"
                : "bg-[#F38020] text-white hover:bg-[#e6731d] active:scale-95"
            )}
          >
            {isSending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send</span>
              </>
            )}
          </button>
        </div>
      </div>

      {description && (
        <div className="px-4 py-3 bg-[#fafafa] border-b border-[#e5e5e5]">
          <p className="text-sm text-[#4a4a4a] leading-relaxed">
            {description}
          </p>
        </div>
      )}

      <div className="divide-y divide-[#e5e5e5]">
        {Object.keys(headers).length > 0 && (
          <div className="px-4 py-3">
            <div className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-2">
              Headers
            </div>
            <div className="space-y-1.5">
              {Object.entries(headers).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center gap-3 text-sm bg-[#fafafa] p-2 border border-[#e5e5e5]"
                >
                  <span className="font-semibold text-[#1a1a1a] min-w-[140px]">
                    {key}
                  </span>
                  <span className="text-[#4a4a4a] font-mono text-xs flex-1">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {body && (
          <div className="px-4 py-3">
            <div className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-2">
              Request Body
            </div>
            <div className="bg-[#fafafa] border border-[#e5e5e5] overflow-hidden">
              <pre className="p-4 overflow-x-auto">
                <code
                  className="text-sm text-[#1a1a1a]"
                  dangerouslySetInnerHTML={{ __html: highlight(formattedBody) }}
                />
              </pre>
            </div>
          </div>
        )}

        <details className="group">
          <summary className="cursor-pointer px-4 py-3 hover:bg-[#fafafa] transition-colors">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#999] uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" />
              <span>cURL Command</span>
            </div>
          </summary>
          <div className="px-4 pb-3">
            <div className="bg-[#fafafa] border border-[#e5e5e5] overflow-hidden">
              <pre className="p-4 overflow-x-auto">
                <code
                  className="text-sm text-[#1a1a1a]"
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
            transition={{ duration: 0.2 }}
            className="border-t-2 border-[#F38020] bg-[#fafafa]"
          >
            <div className="px-4 py-3 border-b border-[#e5e5e5]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-[#1a1a1a]">
                    Response
                  </span>
                  {requestTime && (
                    <div className="flex items-center gap-1 text-xs text-[#999]">
                      <Clock className="w-3 h-3" />
                      <span>{requestTime}ms</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "px-2.5 py-1 text-xs font-bold border",
                      isSuccess
                        ? "bg-[#F38020] text-white border-[#F38020]"
                        : "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                    )}
                  >
                    {response.status}
                  </span>
                </div>
              </div>
            </div>

            {isSending ? (
              <div className="px-4 py-12 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-[#F38020]" />
                  <span className="text-sm text-[#4a4a4a]">
                    Sending request...
                  </span>
                </div>
              </div>
            ) : (
              <div className="px-4 py-3 bg-[#fafafa] border border-[#e5e5e5]">
                <pre className="p-4 overflow-x-auto">
                  <code
                    className="text-sm text-[#1a1a1a]"
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
