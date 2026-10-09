"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Alert, Button, Input, Label } from "@/components/ui";

function friendlyError(code?: string, status?: number) {
  if (code === "email_not_confirmed") return "Please confirm your email first. Check your inbox for the link.";
  if (code === "invalid_credentials") return "Invalid email or password.";
  if (status === 429) return "Too many attempts. Please wait a minute and try again.";
  return "Something went wrong. Please try again.";
}

export function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setPending(true);
    setError(null);
    const { error } = await createClient().auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    if (error) {
      setError(friendlyError(error.code, error.status));
      setPending(false);
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required autoComplete="current-password" />
      </div>
      {error && <Alert>{error}</Alert>}
      <Button type="submit" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
