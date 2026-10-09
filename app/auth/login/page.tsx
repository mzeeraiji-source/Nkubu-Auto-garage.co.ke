import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: PageProps<"/auth/login">) {
  const { next } = await searchParams;
  const nextPath = typeof next === "string" && next.startsWith("/") && !next.startsWith("//") ? next : "/book";

  return (
    <AuthShell title="Sign in" subtitle="Sign in to book a slot and see your bookings.">
      <LoginForm next={nextPath} />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        New here?{" "}
        <Link href={`/auth/sign-up?next=${encodeURIComponent(nextPath)}`} className="font-semibold text-foreground underline">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
