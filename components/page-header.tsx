export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-balance font-display text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-ink-foreground/75">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
