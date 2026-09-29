# T.R.A.C.E. Command Center

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Build the production bundle with `npm run build`.

## Application routes

- `/` — public programme briefing, FAQ, counters, and subscription UI
- `/dashboard` — operational overview
- `/dashboard/integrity` — DailyBench / FPD dataset integrity scan
- `/dashboard/model-audit` — model audit and access-mode interface
- `/dashboard/ledger` — cryptographic inference provenance and tamper simulation
- `/dashboard/security` — security posture and audit event log

## FastAPI handoff

All currently mocked, asynchronous backend-shaped adapters live in `lib/mock-api.ts`.
Replace them with a small `fetch` wrapper targeting the intended services: dataset scans use
`POST /api/v1/scan-dataset`; model audits use `POST /api/v1/audit-model`; and secure
inference uses `POST /api/v1/secure-inference`.

Set `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000` in `.env.local` and use it in that adapter when the backend is available. Avoid sending operational imagery or signatures to any service outside the authorized deployment boundary.
