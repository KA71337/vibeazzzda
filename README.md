# VIBE AZ

Repository: **vibeazzz**.

Next.js storefront with a hidden, server-rendered catalog administrator at `/admin`. The public design, routes, phone flows and `/logo.jpeg` remain unchanged.

## Required environment variables
The admin panel reads two independent groups of variables:

| Group | Variables | Effect when absent |
|---|---|---|
| Auth | `ADMIN_PASSWORD`, `SESSION_SECRET` | The login form reports which variables are missing and refuses sign-in (`503`). |
| Catalog | `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO` | Sign-in still works; the product list and all mutations are unavailable and the panel says so. |

Optional: `GITHUB_BRANCH` (default `main`), `GITHUB_PRODUCTS_PATH` (default `data/products.json`).

`Сервер не настроен` / `Админ-доступ не настроен` on `/admin` always means one of these variables is unset or empty in the running environment. Values are read at process start, so restart `npm run dev` (or redeploy on Vercel) after changing them.

## Local setup
1. Copy `.env.example` to `.env.local` and fill in the variables above. Never commit this file; it is gitignored.
2. Generate `SESSION_SECRET` locally with `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`.
3. Create a fine-grained GitHub token restricted to exactly one catalog repository with **Contents: read/write**. Do not grant organization-wide or unrelated repository access.
4. Install and run development with `npm install && npm run dev`. Verify production locally with `npm run build && npm start`.

The canonical catalog is `data/products.json`; `src/data/products.ts` is the typed adapter used by existing pages. `data/order-products.json` is an immutable migration snapshot for resolving historical orders and must not be rewritten by admin CRUD. Catalog edits use the Git Data API to create blobs, one tree, one commit and a non-forced ref update. A stale base revision returns HTTP 409. Images are managed only below `public/products/admin/`.

## Vercel
Add every variable from `.env.example` under Settings → Environment Variables for **both** Production and Preview, then **redeploy** — existing deployments keep the environment they were built with, so a fresh deployment is required before `/admin` picks up new values. Do not use `NEXT_PUBLIC_` for secrets. Configure a Vercel Firewall rate-limit rule for `/api/admin/auth/login` (recommended: 5 requests per 5 minutes per IP) and a second rule for `/api/admin/products` (for example 30/minute/IP). The in-memory limiter is defense-in-depth only and is not reliable across serverless instances. GitHub commits can trigger the normal Vercel deployment so public static consumers receive the updated JSON; allow the normal Vercel build/deploy delay (typically a few minutes) before verifying storefront changes.

## Security
The administrator is intentionally absent from public navigation, but secrecy of the URL is not an access control. Authentication uses a signed, HttpOnly, Secure-in-production, SameSite=Strict 8-hour cookie. Password/signature comparisons are constant-time. Mutations require a valid session, exact same-origin request and CSRF header. Responses are `no-store`; GitHub credentials never reach client code. Use a long random admin password and rotate both it and the session secret when access changes.
