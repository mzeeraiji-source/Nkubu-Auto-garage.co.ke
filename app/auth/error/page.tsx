import { AuthShell } from "@/components/auth-shell";
import { ButtonLink } from "@/components/ui";

export default function AuthErrorPage() {
  return (
    <AuthShell title="That link didn't work">
      <p className="text-sm text-muted-foreground">The link may have expired or already been used. Please sign in again.</p>
      <ButtonLink href="/auth/login" className="mt-6 w-full">
        Go to sign in
      </ButtonLink>
    </AuthShell>
  );
}
