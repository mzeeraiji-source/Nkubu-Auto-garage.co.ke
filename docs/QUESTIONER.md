# AUTOMATIC QUESTIONER

**AI instruction:** Ask these in groups of 5, one group per message. Show the default beside each. Save answers to `docs/ANSWERS.md`. If the owner says "skip" or "default", use the default and continue. Do not code until Groups A-C are answered or defaulted.

## A. Business (default in brackets)
1. Official garage name, tagline, logo available? [Nkubu Auto Garage, no logo -> text logo]
2. Exact address / landmark in Nkubu + GPS pin? [ask]
3. Opening hours and closed days/holidays? [Mon-Sat 8:00-17:00 EAT, closed Sun]
4. Phone, WhatsApp number, email, social links? [ask]
5. How many bays and mechanics work at once? [3 bays, 3 mechanics]

## B. Services and prices
6. List of services (name, price or range in KES, duration)? [seed: service, oil change, brakes, tyres/alignment, diesel injection, electrical, AC, suspension, engine overhaul, hydraulics]
7. Vehicle types served (cars, pickups, trucks, matatus, motorbikes, tractors/heavy machinery)? [cars, pickups, trucks, matatus]
8. Show prices publicly or "from KES X"? [from KES X]
9. Do you sell parts? Stock managed in-app? [yes, simple stock]
10. Pick-up/drop-off and towing offered? Radius and fee? [yes, ask fee]

## C. Booking and payments
11. Deposit required? M-Pesa Till or Paybill number? [no deposit, phase 4 later]
12. Cancellation / reschedule rule? [free up to 4h before]
13. Walk-ins allowed alongside bookings? [yes, 1 bay reserved]
14. Who confirms bookings: automatic or admin approval? [auto if slot free]
15. Business registered / KRA PIN for receipts? [ask, optional]

## D. AI and diagnostics
16. Languages for chatbot: English, Swahili, Sheng? [EN + SW]
17. Chat escalation: WhatsApp, phone call, or in-app admin reply? [WhatsApp + admin panel]
18. Should AI give price estimates? [range only, marked "estimate"]
19. Do you have an OBD-II scanner / which adapter model (BLE or classic)? [BLE ELM327 assumed]
20. Common vehicle brands customers bring? [Toyota, Nissan, Mazda, Subaru, Isuzu, Mitsubishi, Suzuki]

## E. Admin and team
21. Admin users (names, emails)? [owner only]
22. Staff roles needed (admin, receptionist, mechanic)? [all three]
23. Admin alerts via email, push, or WhatsApp link? [email + push]
24. Reports wanted (daily, weekly, monthly)? [daily summary]

## F. Content and brand
25. Photos of garage/work for gallery (can you upload 10+)? [placeholder illustrations -> owner swaps]
26. Customer reviews to import? [none, start fresh]
27. Competitors / sites you like? [none]
28. Tone: formal, friendly, or street-smart? [friendly, short]
29. Brand yellow exact shade ok at #FFD500? [yes]

## G. Technical and legal
30. Domain nkubuautogarage.com already registered, where? [ask]
31. GitHub account/org name and Vercel vs Cloudflare Pages? [Cloudflare Pages if commercial-use concern]
32. Who owns the Supabase/Gemini accounts? [owner]
33. Privacy contact for Data Protection Act requests? [owner email]
34. Expected monthly visitors / bookings? [<2,000 visitors, <300 bookings]

## H. Future (record only, don't build)
35. Second branch? Mobile app store release? Loyalty program details?
