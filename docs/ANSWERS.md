# ANSWERS (final) - read before coding. Do not ask the owner again for anything here.

## Business
- Name: Nkubu Auto Garage. Tagline: Honest repairs. Fast service. Nkubu, Meru. Domain: nkubuautogarage.com. Established 2019.
- Address: Nkubu town, opposite Tims Garage, Meru County.
- Hours (EAT): Mon-Sat 08:00-17:00. Closed Sundays and public holidays.
- Bays: 3. Mechanics: 5. Social handle: NkubuAutoGarage (all platforms; URLs pending).
- Contact values live in `site_settings.business` (editable in admin). Never hardcode them.

## OPEN DATA ISSUES (read from site_settings; UI hides a field while null)
- Public phone: owner gave 071814443 (9 digits, invalid). Using WhatsApp number +254718144143 for both until confirmed.
- Public email: owner gave "nkubugarage.gmail.com" (invalid, no @). Null. Hide email UI; booking emails use the admin's address.
- GPS: owner gave text, not coordinates. Null. Contact page shows address text and an OpenStreetMap search link; map pin appears when admin sets lat/lng.
- Admin email and GitHub username: not given. Admin bootstrap = first login whose email matches env `ADMIN_EMAIL`.
- Privacy contact: murangirijunior46@gmail.com. Use for Privacy page and Data Protection requests.
- M-Pesa Till/Paybill, KRA PIN, towing fee: null.

## Services and vehicles
- Services (seed.sql): full service, oil and filter, brakes, tyres and alignment, diesel injection, electrical and battery, AC, suspension, engine overhaul, hydraulics. Durations are defaults.
- Vehicles: cars, pickups, trucks, matatus, motorbikes, tractors, heavy machinery. Fuel: petrol, diesel, hybrid, electric.
- Brands: Toyota, Nissan, Mazda, Subaru, Isuzu, Mitsubishi, Suzuki, Honda, Ford, Mercedes, Volkswagen, Hino, Fuso.
- Specialties: diesel engines, hydraulics, diagnostics. Sells parts, tracks stock. Pick-up/drop-off: yes. Towing: around Meru County.
- **Prices hidden. Quote only.** `price_from_kes` stays null. UI shows "Request quote". **AI must not state any price or estimate** (decision: ai_price_estimates=false, resolves the conflict).

## Booking
- Auto-confirm if slot free. Slot 60 min default (service duration overrides). Max 30 days ahead. Free cancel up to 4h before. Walk-ins: 1 bay reserved. No deposit.
- Form fields: name, phone, plate, make/model, service, date/time, notes, photos, pick-up request. Reminders: 24h and 2h via email, push, WhatsApp link.

## Payments and loyalty
- Cash and M-Pesa. M-Pesa STK in Phase 7. Loyalty: 1 point per KES 100, 100 points = KES 100 off. Referral: KES 200 off for both. Fleet accounts: yes.

## AI
- Languages: English, Swahili, Sheng. Tone: street-smart but respectful, short. Add `src/data/sheng-glossary.json` (50+ terms) into the Support prompt.
- Escalation: WhatsApp, phone call, admin panel. Human hours Mon-Sat 08:00-17:00.
- Refuse: legal advice, medical advice, competitor pricing.
- Diagnostics: symptom wizard, code lookup, warning-light photo, OBD.
- **OBD: owner's adapter is classic Bluetooth ELM327. Web Bluetooth cannot use it.** Build BLE path + manual fallback now. Web Serial path for desktop is optional, Phase 4 stretch.

## Team and admin
- Roles: admin, receptionist, mechanic, parts_clerk (schema_patch_roles.sql). Alerts: email, push, WhatsApp link. Daily summary. All 12 agents enabled.
- Admin MFA: required. Captcha (Turnstile): yes. Backup: **daily** (GitHub Action dumps Supabase to a private repo).

## Brand and pages
- Black #0A0A0A, white #FFFFFF, yellow #FFD500. Dark default. Text logo. Placeholder images until owner uploads.
- Headline: "Your car. Fixed right. In Nkubu."
- Pages: Home, Services, Book, Diagnose, Chat, Parts, Quote, SOS, Gallery, About, Contact, Reviews, FAQ, Tips, Careers (add `/careers` + `/privacy` + `/terms`).

## Technical
- Hosting: Cloudflare Pages (commercial-use safe). Code stays Vercel-compatible.
- **Analytics: Cloudflare Web Analytics (free).** Owner picked Vercel Analytics, which only works on Vercel hosting; change back if hosting moves to Vercel.
- Devices: Android phones, low-end phones, desktop. Expected traffic under 2,000/month. Retention: bookings 3 years, chats 1 year.
