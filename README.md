# VIBE AZ

Next.js storefront with a hidden, server-rendered catalog administrator at `/admin`. The public design, routes, phone flows and `/logo.jpeg` remain unchanged.

## Local setup
1. Copy `.env.example` to `.env.local` and set unique secrets. Never commit this file.
2. Create a fine-grained GitHub token with **Contents: read/write** access only to the catalog repository.
3. Run `npm run dev`; production uses `npm run build && npm start`.

The canonical catalog is `data/products.json`; `src/data/products.ts` is the typed adapter used by existing pages. `data/order-products.json` is an immutable migration snapshot for resolving historical orders and must not be rewritten by admin CRUD. Catalog edits use the Git Data API to create blobs, one tree, one commit and a non-forced ref update. A stale base revision returns HTTP 409. Images are managed only below `public/products/admin/`.

## Vercel
Add every variable from `.env.example` to the Production/Preview environments. Do not use `NEXT_PUBLIC_` for secrets. Configure a Vercel Firewall rate-limit rule for `/api/admin/auth/login` (recommended: 5 requests per 5 minutes per IP) and a second rule for `/api/admin/products` (for example 30/minute/IP). The in-memory limiter is defense-in-depth only and is not reliable across serverless instances. GitHub commits can trigger the normal Vercel deployment so public static consumers receive the updated JSON.

## Security
The administrator is intentionally absent from public navigation, but secrecy of the URL is not an access control. Authentication uses a signed, HttpOnly, Secure-in-production, SameSite=Strict 8-hour cookie. Password/signature comparisons are constant-time. Mutations require a valid session, exact same-origin request and CSRF header. Responses are `no-store`; GitHub credentials never reach client code. Use a long random admin password and rotate both it and the session secret when access changes.
