import Link from "next/link";
import { ExternalLink, Globe, FileText, Terminal, Rocket } from "lucide-react";

interface DocsExplorerProps {
  url: string;
  quickStart?: string[];
  docs?: Array<{ name: string; path: string; url?: string }>;
  apiExplorer?: {
    local?: string;
    production?: string;
  };
}

export function DocsExplorer({
  url,
  quickStart,
  docs,
  apiExplorer,
}: DocsExplorerProps) {
  const getDocUrl = (path: string) => {
    return `https://github.com/onurhan1337/kevi/blob/master/${path}`;
  };

  return (
    <div className="my-8 border border-[#dcdcdc] bg-white">
      <div className="border-b border-[#dcdcdc] px-5 py-3 bg-[#f6f6f6]">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#F38020] shrink-0 mt-2" />
          <h3 className="text-xs font-semibold uppercase tracking-wide text-[#1c1c1c]">
            Explore the hosted docs and API explorer
          </h3>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <p className="text-sm text-[#4a4a4a] leading-relaxed">
          The deployed instance ships with Scalar-powered docs at{" "}
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#F38020] hover:text-[#e6731d] transition-colors inline-flex items-center gap-1"
          >
            {url}
            <ExternalLink className="w-3 h-3" />
          </Link>
          , so you can try every endpoint without cloning the repo.
        </p>

        {quickStart && quickStart.length > 0 && (
          <div className="border border-[#dcdcdc] bg-[#fafafa] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Rocket className="w-4 h-4 text-[#F38020] shrink-0 mt-2" />
              <h4 className="text-xs font-semibold uppercase tracking-wide text-[#1c1c1c]">
                Quick Start
              </h4>
            </div>
            <p className="text-xs text-[#5e5e5e] mb-3 leading-relaxed">
              Get started in minutes: follow these steps to set up your own Kevi
              instance.
            </p>
            <div className="bg-white border border-[#e5e5e5] p-2">
              <p className="text-xs font-mono text-[#1a1a1a] ">
                {quickStart.join(" → ")}
              </p>
            </div>
          </div>
        )}

        {docs && docs.length > 0 && (
          <div className="border border-[#dcdcdc] bg-[#fafafa] p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-[#F38020] shrink-0 mt-2" />
              <h4 className="text-xs font-semibold uppercase tracking-wide text-[#1c1c1c]">
                Documentation Hub
              </h4>
            </div>
            <p className="text-xs text-[#5e5e5e] mb-3 leading-relaxed">
              Deep dives covering architecture, configuration, and public key
              patterns.
            </p>
            <div className="space-y-2">
              {docs.map((doc) => {
                const docUrl = doc.url || getDocUrl(doc.path);
                return (
                  <Link
                    key={doc.path}
                    href={docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white border border-[#e5e5e5] p-2 hover:border-[#F38020] hover:bg-[#fff2e7] transition-colors group no-underline"
                  >
                    <span className="text-xs font-medium text-[#1a1a1a] group-hover:text-[#F38020] transition-colors">
                      {doc.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-[#5e5e5e] font-mono bg-[#f6f6f6] px-1.5 py-0.5 group-hover:bg-[#ffe8d1] transition-colors">
                        {doc.path}
                      </span>
                      <ExternalLink className="w-3 h-3 text-[#5e5e5e] group-hover:text-[#F38020] transition-colors shrink-0" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {apiExplorer && (
          <div className="border border-[#dcdcdc] bg-[#fafafa] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-[#F38020] shrink-0 mt-2" />
              <h4 className="text-xs font-semibold uppercase tracking-wide text-[#1c1c1c]">
                API Explorer
              </h4>
            </div>
            <p className="text-xs text-[#5e5e5e] mb-3 leading-relaxed">
              Interactive API documentation with Scalar UI. Test endpoints with
              built-in authentication helpers.
            </p>
            <div className="space-y-2">
              {apiExplorer.local && (
                <div className="flex items-center justify-between bg-white border border-[#e5e5e5] p-2">
                  <span className="text-xs font-medium text-[#1a1a1a]">
                    Local Development
                  </span>
                  <span className="text-[10px] text-[#5e5e5e] font-mono bg-[#f6f6f6] px-1.5 py-0.5">
                    {apiExplorer.local}
                  </span>
                </div>
              )}
              {apiExplorer.production && (
                <div className="flex items-center justify-between bg-white border border-[#e5e5e5] p-2 hover:border-[#F38020]/30 transition-colors">
                  <span className="text-xs font-medium text-[#1a1a1a]">
                    Production
                  </span>
                  <Link
                    href={apiExplorer.production}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] text-[#F38020] font-mono hover:text-[#e6731d] transition-colors no-underline"
                  >
                    {apiExplorer.production}
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-[#e5e5e5]">
          <p className="text-xs text-[#5e5e5e] leading-relaxed">
            When you need infra details, the docs also walk through Wrangler
            login, namespace creation, admin/master tokens, and typegen, so you
            can replicate the setup exactly rather than guess.
          </p>
        </div>
      </div>
    </div>
  );
}
