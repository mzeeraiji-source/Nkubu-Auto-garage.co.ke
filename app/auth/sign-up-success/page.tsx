import { AuthShell } from "@/components/auth-shell";

export default function SignUpSuccessPage() {
  return (
    <AuthShell title="Check your email">
      <p className="text-sm text-muted-foreground">
        We sent you a confirmation link. Open it on this device to finish creating your account, then you can book your slot.
      </p>
    </AuthShell>
  );
}
