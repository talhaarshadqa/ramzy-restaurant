# Ramzy Restaurant — Website, CMS & CRM

Next.js (App Router, TypeScript) + PostgreSQL (Prisma) + Tailwind CSS + Auth.js.

## What's included

- **Public site** (`/`, `/menu`, `/blog`) — reads menu, prices, opening hours, and nearly all
  homepage copy and photos live from the database.
- **CMS** — staff can edit, without a developer:
    - `/admin/menu` — categories, items, prices, availability, and which items/categories are
      featured on the homepage ("Signatures", "Cuisine" tiles).
    - `/admin/gallery` — every photo used on the site (hero slider, gallery grid, masterpieces
      row, room photo) — add, reorder, hide, or swap any image path.
    - `/admin/blog` — blog posts.
    - `/admin/settings` — business info (name, address, phone, Google rating, etc.), opening
      hours, and the copy for every homepage section (hero, story, room, stats, and more).
- **CRM** (`/admin/inquiries`) — the public "Request a Table" form writes to the database; staff
  track each one through NEW → CONTACTED → CONFIRMED → CLOSED/CANCELLED.
- **Reservation emails** — when someone submits the form, they get a confirmation email (if they
  gave an email address) and the owner gets a notification email (if an owner notification
  address is set in `/admin/settings`). Requires a `RESEND_API_KEY` and, for customer emails, a
  verified sending domain — see below.
- **Admin auth** — single/few staff accounts via email + password (Auth.js Credentials provider).

## Local development

Requirements: Node 20+, a PostgreSQL database.

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL, AUTH_SECRET, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Generate `AUTH_SECRET` with `npx auth secret` or `openssl rand -base64 33`.

## Reservation emails (Resend)

1. Create a free account at [resend.com](https://resend.com) and generate an API key.
2. Set `RESEND_API_KEY` in your environment (`.env` locally, Vercel env vars in production).
3. Set the **owner notification email** in `/admin/settings` (under "Reservation Email
   Notifications") — this is where new table requests get emailed. Leave it blank to disable
   owner notifications.

**Important limitation without a verified domain**: Resend's sandbox mode (the default, using
`onboarding@resend.dev` as the sender) can only deliver to the email address you signed up to
Resend with — nothing else. In practice that means:

- The **owner notification** email only works if the owner-notification address in
  `/admin/settings` is set to that exact Resend signup address.
- **Customer confirmation emails do not work at all** in sandbox mode, since every customer has a
  different address.

To send real confirmation emails to customers (and notify an owner address that isn't the Resend
signup address), you need a **verified sending domain**:

1. In Resend, go to Domains → Add Domain, enter a domain you control.
2. Add the DNS records Resend gives you (at your domain registrar / DNS provider).
3. Once verified, set `EMAIL_FROM` to an address on that domain, e.g.
   `Ramzy Restaurant <reservations@yourdomain.com>`.

Without `RESEND_API_KEY` set at all, reservations still work normally — email sending is skipped
with a console warning, nothing breaks.

## Deploying (Vercel + a managed Postgres)

1. **Database**: create a Postgres database reachable from the internet — the easiest options are
   [Neon](https://neon.tech) (free tier) or Vercel's own Postgres storage (Storage tab in a
   Vercel project, powered by Neon). Copy its connection string.
2. **Vercel project**: import this GitHub repo at [vercel.com/new](https://vercel.com/new).
   Vercel auto-detects Next.js — no extra config needed.
3. **Environment variables** (Project Settings → Environment Variables), for Production:
    - `DATABASE_URL` — the connection string from step 1
    - `AUTH_SECRET` — a fresh secret, **do not reuse the one from local `.env`**
    - `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — only needed once, to run the seed script
    - `RESEND_API_KEY` / `EMAIL_FROM` — optional, for reservation emails (see above)
4. **Deploy.** The build runs `prisma migrate deploy` automatically before `next build`, so the
   schema is applied on every deploy.
5. **Seed the production database once**, from your machine, pointing at the production
   `DATABASE_URL`:

    ```bash
    DATABASE_URL="<production connection string>" SEED_ADMIN_EMAIL="..." SEED_ADMIN_PASSWORD="..." npx prisma db seed
    ```

    After this, **change the admin password** by re-running the seed with a new
    `SEED_ADMIN_PASSWORD` — there's no in-app password change in v1.

    **Whenever a schema change adds new content** (new table, new columns with seed data), the
    production database must be seeded again — Next.js statically generates pages at _build_
    time, so if the seed runs after the deploy, the first deploy will show empty content. Seed
    first, or redeploy once more right after seeding.

## Known gaps / next steps (intentionally out of v1 scope)

- Opening hours: the printed menu says "11am – 6pm" but the live Google listing showed "Closes
  7pm" on the day this was checked — the discrepancy is unresolved; fix it via `/admin/settings`
  once confirmed with the client.
- Gallery/About photos are free-license stock placeholders — swap the image paths in
  `/admin/gallery` for real photos once the client approves the site.
- No image **upload** UI — adding a photo means uploading a file to `public/images/` (or an
  external host) and entering its path in `/admin/gallery`, not a drag-and-drop uploader.
- No live Google rating sync — the rating/review count in `/admin/settings` is a manually-entered
  snapshot, update it there if it changes.
- No in-app admin password change — rotate it by re-running the seed script with a new
  `SEED_ADMIN_PASSWORD`.
- Reservation confirmation emails to customers don't send yet — Resend needs a verified domain
  first (see "Reservation emails" above). Owner notifications work today, but only to the Resend
  account's own signup email until a domain is verified.
