import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`py-16 ${className}`}>
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-2 text-3xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="mb-8 text-lg text-muted">{subtitle}</p>}
        {!subtitle && <div className="mb-8" />}
        {children}
      </div>
    </section>
  );
}
