export function AuthShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
        <h1 className="font-display text-2xl font-extrabold">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
