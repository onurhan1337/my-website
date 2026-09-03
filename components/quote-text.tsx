import { cn } from "@/lib/utils";
import type { QuoteStanza } from "@/lib/quotes";

interface QuoteTextProps {
  stanzas: QuoteStanza[];
  className?: string;
  stanzaClassName?: string;
}

export function QuoteText({
  stanzas,
  className,
  stanzaClassName,
}: QuoteTextProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {stanzas.map((stanza, stanzaIndex) => (
        <p key={stanzaIndex} className={stanzaClassName}>
          {stanza.map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              {line.map((segment, segmentIndex) =>
                segment.href ? (
                  <a
                    key={segmentIndex}
                    href={segment.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-ink-3 decoration-1 underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    {segment.text}
                  </a>
                ) : (
                  <span key={segmentIndex}>{segment.text}</span>
                )
              )}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
