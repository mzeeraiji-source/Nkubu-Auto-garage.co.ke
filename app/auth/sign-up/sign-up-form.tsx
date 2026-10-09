"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { normalizePhone } from "@/lib/phone";
import { Alert, Button, Input, Label } from "@/components/ui";

function friendlyError(code?: string, status?: number) {
  if (code === "weak_password") return "Please choose a stronger password (at least 8 characters).";
  if (code === "email_address_invalid") return "Please use a real email address.";
  if (status === 429 || code === "over_email_send_rate_limit") return "Too many attempts. Please wait a few minutes.";
  return "We couldn't create your account. Please try again.";
}

export function SignUpForm({ next }: { next: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const phone = normalizePhone(String(form.get("phone") ?? ""));
    const password = String(form.get("password"));
    if (!phone) return setError("Please enter a valid Kenyan phone number.");
    if (password !== String(form.get("confirm"))) return setError("Passwords do not match.");
    if (!form.get("consent")) return setError("Please accept the privacy notice to continue.");

    setPending(true);
    setError(null);
    const callback =
      process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`;
    const { error } = await createClient().auth.signUp({
      email: String(form.get("email")),
      password,
      options: {
        emailRedirectTo: `${callback}?next=${encodeURIComponent(next)}`,
        data: { full_name: String(form.get("full_name")).trim(), phone },
      },
    });
    if (error) {
      setError(friendlyError(error.code, error.status));
      setPending(false);
      return;
    }
    router.push("/auth/sign-up-success");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="full_name">Full name</Label>
        <Input id="full_name" name="full_name" required maxLength={100} autoComplete="name" />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" required placeholder="07xx xxx xxx" autoComplete="tel" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" />
      </div>
      <div>
        <Label htmlFor="confirm">Confirm password</Label>
        <Input id="confirm" name="confirm" type="password" required minLength={8} autoComplete="new-password" />
      </div>
      <label className="flex items-start gap-2 text-sm text-muted-foreground">
        <input type="checkbox" name="consent" required className="mt-1 accent-[var(--accent)]" />
        <span>
          I agree that Nkubu Auto Garage may store my details to manage my bookings, as described in the{" "}
          <Link href="/privacy" className="underline">
            privacy notice
          </Link>
          .
        </span>
      </label>
      {error && <Alert>{error}</Alert>}
      <Button type="submit" disabled={pending}>
        {pending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
