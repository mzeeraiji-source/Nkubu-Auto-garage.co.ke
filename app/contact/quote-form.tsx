"use client";

import { useActionState } from "react";
import { submitQuote, type QuoteState } from "./actions";
import { Alert, Button, Input, Label, Textarea } from "@/components/ui";

export function QuoteForm({ defaultName, defaultPhone }: { defaultName: string; defaultPhone: string }) {
  const [state, action, pending] = useActionState<QuoteState, FormData>(submitQuote, {});

  if (state.ok) {
    return (
      <div className="mt-4">
        <Alert tone="success">Thanks! We received your request and will call or WhatsApp you shortly.</Alert>
      </div>
    );
  }

  return (
    <form action={action} className="mt-4 flex flex-col gap-4">
      <div>
        <Label htmlFor="q-name">Your name</Label>
        <Input id="q-name" name="name" defaultValue={defaultName} required maxLength={100} autoComplete="name" />
      </div>
      <div>
        <Label htmlFor="q-phone">Phone (for call or WhatsApp)</Label>
        <Input id="q-phone" name="phone" type="tel" defaultValue={defaultPhone} required placeholder="07xx xxx xxx" autoComplete="tel" />
      </div>
      <div>
        <Label htmlFor="q-desc">Vehicle and problem</Label>
        <Textarea
          id="q-desc"
          name="description"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          placeholder="e.g. Toyota Hilux 2015 diesel, white smoke on start-up and losing power on hills."
        />
      </div>
      {state.error && <Alert>{state.error}</Alert>}
      <Button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Send request"}
      </Button>
    </form>
  );
}
