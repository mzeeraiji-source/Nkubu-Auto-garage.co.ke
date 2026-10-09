import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { SignUpForm } from "./sign-up-form";

export const metadata: Metadata = { title: "Create account" };

export default async function SignUpPage({ searchParams }: PageProps<"/auth/sign-up">) {
  const { next } = await searchParams;
  const nextPath = typeof next === "string" && next.startsWith("/") && !next.startsWith("//") ? next : "/book";

  return (
    <AuthShell title="Create your account" subtitle="Takes a minute. You'll use it to book and track repairs.">
      <SignUpForm next={nextPath} />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href={`/auth/login?next=${encodeURIComponent(nextPath)}`} className="font-semibold text-foreground underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
