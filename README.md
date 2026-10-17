# Benefits Gap Check

A single static page that takes a handful of paycheck numbers and lists the workplace-benefit dollars the published rules say may still be open this year: 401(k) room, employer match lost by front-loading, after-tax 401(k) space (mega backdoor Roth), ESPP discount, RSU withholding shortfall, HSA room. Each finding shows an amount or range, a deadline, the sentence to ask HR or payroll, and a link to the rule's source (IRS, U.S. Code, California FTB/EDD).

- English by default, one-click Chinese.
- All math runs in the browser. No account, no cookies, no third-party scripts.
- The Worker keeps four anonymous daily counters (`open`, `calc`, `src`, `return`) in D1. No IP addresses, no user agents, no IDs. `GET /api/stats` shows them.
- Rules and sources: [RULES.md](RULES.md) (checked 2026-10-16). Every number on the page points at a row there.
- Not tax, legal, or investment advice.
- Feedback: open an issue. Say which rule is wrong and link the source if you have one.

## Run

```bash
wrangler d1 execute benefits-gap-counts --local --file worker/schema.sql
wrangler dev
```

Add `?today=YYYY-MM-DD` to the URL to test another date, `?lang=zh` for Chinese.

## Deploy

```bash
wrangler d1 execute benefits-gap-counts --remote --file worker/schema.sql   # once
wrangler deploy
```

## Layout

- `public/` — `index.html`, `app.js`, `style.css`, `_headers` (strict CSP)
- `worker/index.js` — counter endpoints, falls through to static assets
- `RULES.md` — the rules, one line each with source URL and verification date

MIT.
