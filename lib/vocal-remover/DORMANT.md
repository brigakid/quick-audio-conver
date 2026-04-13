# AI Vocal Remover — Dormant Feature

The Vocal Remover feature is fully implemented but disabled by default.
All code is preserved. No Redis, Demucs, or worker process is required
while the feature is off.

## Current state

- Nav link: removed from `components/layout/Header.tsx`
- Page (`/vocal-remover`): returns 404 when flag is off
- API routes (`/api/vocal-remover/*`): return 404 when flag is off
- Worker (`worker/vocal-remover-worker.ts`): not started automatically — run manually only when needed

## To re-enable

### 1. Set the feature flag

In `.env.local`:
```
ENABLE_VOCAL_REMOVER=true
```

### 2. Add the nav link back

In `components/layout/Header.tsx`, add to `NAV_LINKS`:
```ts
{ href: '/vocal-remover', label: 'Vocal Remover' },
```
(between Converters and Formats)

### 3. Install and configure dependencies

```bash
# Redis (required)
# Install Redis locally or point REDIS_URL at a hosted instance

# Demucs (required — runs the AI separation)
pip install demucs
# Verify: demucs --version

# Node dependencies (already in package.json, install if missing)
npm install
```

### 4. Set environment variables

In `.env.local`:
```
REDIS_URL=redis://localhost:6379
DEMUCS_PATH=demucs         # path to binary if not in PATH
DEMUCS_MODEL=htdemucs      # model to use
VR_MAX_FILE_SIZE_MB=100
VR_JOB_TTL_HOURS=1
VR_JOB_TIMEOUT_MS=600000
VR_JOB_ATTEMPTS=2
VR_MAX_CONCURRENT_JOBS=2
VR_MAX_CONCURRENT_UPLOADS=3
```

### 5. Start the worker

In a separate terminal alongside `npm run dev`:
```bash
npm run worker:vocal-remover
```

The worker must be running for jobs to be processed.
The Next.js server alone is not enough.

### 6. Verify

- Navigate to `/vocal-remover` — the page should render.
- Upload a short audio file and confirm the job progresses through `queued → processing → completed`.
- Download both stems and verify playback.
