import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const variants = {
  primary: "bg-accent text-accent-foreground hover:brightness-95",
  dark: "bg-ink text-ink-foreground hover:bg-ink/90",
  outline: "border border-border bg-card text-foreground hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
};
const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50 disabled:pointer-events-none";

type Variant = keyof typeof variants;

export function Button({ variant = "primary", className, ...props }: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={cn(base, variants[variant], className)} {...props} />;
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-ink focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-ink focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:border-ink focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: ComponentProps<"label">) {
  return <label className={cn("mb-1.5 block text-sm font-medium", className)} {...props} />;
}

export function Alert({ tone = "danger", children }: { tone?: "danger" | "success"; children: React.ReactNode }) {
  return (
    <p
      role={tone === "danger" ? "alert" : "status"}
      className={cn(
        "rounded-md border px-3 py-2 text-sm",
        tone === "danger" ? "border-danger/30 bg-danger/10 text-danger" : "border-success/30 bg-success/10 text-success",
      )}
    >
      {children}
    </p>
  );
}
