interface PageTitleProps {
  title: string;
  description?: string;
}

export function PageTitle({ title, description }: PageTitleProps) {
  return (
    <header className="mb-16">
      <h1 className="text-title">{title}</h1>
      {description && <p className="mt-3 text-ink-2">{description}</p>}
    </header>
  );
}
