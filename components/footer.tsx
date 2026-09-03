import Link from "next/link";

const sections = [
  { label: "Blog", href: "/blog" },
  { label: "Thoughts", href: "/thoughts" },
  { label: "Work", href: "/work" },
  { label: "Projects", href: "/projects" },
];

const elsewhere = [
  { label: "Email", href: "mailto:onurhandtr@gmail.com" },
  { label: "GitHub", href: "https://github.com/onurhan1337" },
  { label: "X", href: "https://x.com/onurhan1337" },
  { label: "YouTube", href: "https://youtube.com/@onurhandev" },
  { label: "RSS", href: "/feed.xml" },
];

export function Footer() {
  return (
    <footer className="mt-24 rule pt-8 text-small">
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {sections.map((item) => (
          <Link key={item.href} href={item.href} className="link">
            {item.label}
          </Link>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-caption">
        {elsewhere.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="text-ink-3 transition-colors hover:text-ink"
          >
            {item.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
