import Link from "next/link";
import { ExternalLink } from "lucide-react";

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
    <div className="my-8 rounded-md border border-rule bg-paper p-6">
      <h3 className="mb-4 text-caption text-ink-2">
        Explore the hosted docs and API explorer
      </h3>

      <div className="space-y-4">
        <p className="text-small text-ink-2">
          The deployed instance ships with Scalar-powered docs at{" "}
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-ink transition-colors hover:text-ink-2"
          >
            {url}
            <ExternalLink className="h-3 w-3" />
          </Link>
          , so you can try every endpoint without cloning the repo.
        </p>

        {quickStart && quickStart.length > 0 && (
          <div className="rounded-md bg-well p-4">
            <h4 className="mb-2 text-small font-medium text-ink">
              Quick start
            </h4>
            <p className="mb-3 text-caption text-ink-2">
              Get started in minutes: follow these steps to set up your own Kevi
              instance.
            </p>
            <div className="rounded border border-rule bg-paper p-2">
              <p className="font-mono text-caption text-ink">
                {quickStart.join(" → ")}
              </p>
            </div>
          </div>
        )}

        {docs && docs.length > 0 && (
          <div className="rounded-md bg-well p-4">
            <h4 className="mb-2 text-small font-medium text-ink">
              Documentation hub
            </h4>
            <p className="mb-3 text-caption text-ink-2">
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
                    className="group flex items-center justify-between rounded border border-rule bg-paper p-2 no-underline transition-colors hover:border-ink-3"
                  >
                    <span className="text-caption text-ink-2 transition-colors group-hover:text-ink">
                      {doc.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-well px-1.5 py-0.5 font-mono text-caption text-ink-3">
                        {doc.path}
                      </span>
                      <ExternalLink className="h-3 w-3 shrink-0 text-ink-3 transition-colors group-hover:text-ink" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {apiExplorer && (
          <div className="rounded-md bg-well p-4">
            <h4 className="mb-2 text-small font-medium text-ink">
              API explorer
            </h4>
            <p className="mb-3 text-caption text-ink-2">
              Interactive API documentation with Scalar UI. Test endpoints with
              built-in authentication helpers.
            </p>
            <div className="space-y-2">
              {apiExplorer.local && (
                <div className="flex items-center justify-between rounded border border-rule bg-paper p-2">
                  <span className="text-caption text-ink-2">
                    Local development
                  </span>
                  <span className="rounded bg-well px-1.5 py-0.5 font-mono text-caption text-ink-3">
                    {apiExplorer.local}
                  </span>
                </div>
              )}
              {apiExplorer.production && (
                <div className="flex items-center justify-between rounded border border-rule bg-paper p-2 transition-colors hover:border-ink-3">
                  <span className="text-caption text-ink-2">Production</span>
                  <Link
                    href={apiExplorer.production}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-mono text-caption text-ink no-underline transition-colors hover:text-ink-2"
                  >
                    {apiExplorer.production}
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="border-t border-rule pt-4">
          <p className="text-caption text-ink-2">
            When you need infra details, the docs also walk through Wrangler
            login, namespace creation, admin/master tokens, and typegen, so you
            can replicate the setup exactly rather than guess.
          </p>
        </div>
      </div>
    </div>
  );
}
