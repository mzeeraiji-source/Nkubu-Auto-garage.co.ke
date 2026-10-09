# TODO - ONE RUN, 11 CHECKPOINTS (M0-M10). Tick as you go. Do not skip.

## Supplied (already written - import, do not rewrite)
- [x] `supabase/schema.sql`, `schema_patch_roles.sql`, `seed.sql`, `phase2.sql`, `rls-tests.sql`
- [x] `src/lib/{http,audit,ratelimit,turnstile,plate,validate,auth}.ts`, `validate.test.ts`
- [x] `src/app/auth/callback/route.ts`
- [x] `src/app/api/v1/{auth/magic-link,profile,vehicles,vehicles/[id],account/consent,account/export,account/delete}/route.ts`
- [x] Reference: `docs/design-preview.html`, all `docs/*.md`

## M0 Setup  (exit: `npm run dev` + `npm run build` pass)
- [ ] Next.js 14 + TS + Tailwind tokens, tree per README, `.env.example`, ESLint/Prettier, Vitest
- [ ] `lib/supabase.ts` (3 exports), `middleware.ts`, Dependabot, `agents-cron.yml`
- [ ] Run SQL in order: schema -> schema_patch_roles -> seed -> phase2 -> rls-tests (PASS)

## M1 Public UI  (exit: all public pages render, 360px ok, offline page works)
- [ ] TopNav, Drawer, BottomTabs, WhatsAppFab, Footer, Breadcrumbs, theme, language
- [ ] Home, Services, Service detail, About, Contact, Gallery, FAQ, Tips, Reviews, Careers, Privacy, Terms, Offline, 404
- [ ] PWA, service worker, install prompt, SEO + JSON-LD, sitemap, i18n EN/SW

## M2 Auth and accounts  (exit: login works, guards work, delete-my-data works)
- [ ] Login, consent, cookie banner, Profile, Vehicles, Settings, MFA, guards, session refresh

## M3 Booking  (exit: end-to-end booking with confirmation)
- [ ] slots + bookings + upload-url APIs, wizard, My Bookings, push, email, WhatsApp links, receipts

## M4 AI  (exit: chat answers from FAQ, diagnose gives result, no price ever stated)
- [ ] llm fallback chain, chat API + widget + page, escalation
- [ ] Diagnose: wizard, DTC lookup, photo, BLE OBD, booking prefill, Sheng glossary

## M5 Admin  (exit: every admin page loads, MFA enforced)
- [ ] dashboard, bookings (calendar/kanban/waitlist), customers, services, parts, staff, invoices, chats, agents, reviews, content, security, settings, CSV export

## M6 Agents  (exit: booking insert triggers Booking Agent within seconds; runs logged)
- [ ] runner, registry, 12 agents, tick endpoint, cron wiring, kill switches, alerts

## M7 Market features
- [ ] Parts, Quote, SOS, Reviews, loyalty/referral, fleet, service-due reminders, M-Pesa (only if Till set)

## M8 Hardening
- [ ] RLS tests, rate-limit + injection tests, CSP, backups, free-tier alerts, a11y + Lighthouse

## M9 Test
- [ ] Unit + E2E booking, 360px, 3G, Opera Mini no-JS pages

## M10 Deploy
- [ ] README deploy guide, env checklist, DNS, Search Console, Google Business Profile, soft launch, rollback

## Blocked (paid) - skipped
- SMS gateway, Google Maps API, paid LLMs, paid monitoring, automatic WhatsApp sending
