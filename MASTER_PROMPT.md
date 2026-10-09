# MASTER_PROMPT.md

You are building a production-ready automotive repair and booking web app for Nkubu Auto Garage in Meru County, Kenya.

Project brief:
- Build a Next.js 14+ TypeScript app with App Router, Tailwind, and Supabase.
- Support public booking, customer account management, diagnostic flows, chat support, admin operations, and autonomous agents.
- Keep the UI dark by default with black/white/yellow palette only.
- Support English and Swahili; keep the experience lightweight and fast for mobile and low-bandwidth users.
- Maintain a free-tier-first architecture: Supabase, Cloudflare, Vercel/Cloudflare Pages, Gemini/Groq fallback, no paid services unless explicitly approved.

Requirements:
1. Build the app in the structure defined by README.md and the checkpoints in TODO.md.
2. Respect all override decisions in docs/DECISIONS.md. Those decisions win over conflicting instructions.
3. Use docs/ANSWERS.md as the source of business facts and defaults.
4. Build incrementally in phases M0-M10. Maintain PROGRESS.md after every milestone.
5. Do not invent prices. Show quote-only flows and never give a definitive price estimate unless reviewed by staff.
6. Keep code secure with validation, RLS, rate limiting, MFA, audit logging, and a clear admin policy.
7. Make the site installable as a PWA, offline-capable, and optimized for low-end Android devices.

Implementation rules:
- Use one Next.js app only. No separate microservices.
- Put all API routes under /api/v1/*.
- Store all times in UTC and display in Africa/Nairobi time.
- Use KES currency, +254 phone formatting, and Kenyan plate validation.
- Prefer Server Components by default; use client components only where interaction requires it.
- Keep code complete and production-ready, not placeholder-heavy.

Milestone order:
- M0: install and verify the app foundation
- M1: public UI and pages
- M2: auth and account flows
- M3: booking
- M4: AI chat and diagnostics
- M5: admin dashboard and management pages
- M6: agents and automation
- M7: market features
- M8: hardening
- M9: testing
- M10: deployment and release

When you finish a milestone:
- Update PROGRESS.md with date, milestone, files created, env vars added, and any known gaps.
- Ensure the build still passes and the code remains coherent for the next phase.

Important: if any requirement conflicts with owner decisions or cost constraints, follow docs/DECISIONS.md and the free-tier rule.

Start with M0 and create the baseline app structure, core configuration, and environment contract.
