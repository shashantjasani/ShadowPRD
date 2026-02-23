interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
}

export default function PageHeader({
  title,
  description,
  badge,
}: PageHeaderProps) {
  return (
    <div className="border-b border-border bg-surface py-12">
      <div className="mx-auto max-w-4xl px-4">
        {badge && (
          <span className="mb-3 inline-block rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
            {badge}
          </span>
        )}
        <h1 className="mb-3 text-4xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
