# QuickAudioConvert

A production-ready online audio conversion tool built with Next.js, TypeScript, Tailwind CSS, and FFmpeg.

Convert MP4, WAV, M4A, FLAC, MP3, AAC, and OGG files between popular audio formats directly in the browser — no account required, no permanent storage.

---

## Features

- Convert MP4 → MP3, WAV → MP3, M4A → MP3, FLAC → MP3, MP3 → WAV, AAC → MP3, OGG → MP3
- Configurable MP3 bitrate: 128 / 192 / 320 kbps
- Drag-and-drop file upload
- File type and size validation
- Automatic temporary file cleanup
- Basic rate limiting on API endpoints
- Fully responsive (desktop + mobile)
- No account or sign-up required

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Audio Processing:** FFmpeg (via `fluent-ffmpeg`)
- **Runtime:** Node.js

---

## Prerequisites

### FFmpeg

FFmpeg must be installed on the system running this application.

**macOS (Homebrew):**
```bash
brew install ffmpeg
```

**Ubuntu / Debian:**
```bash
sudo apt update && sudo apt install -y ffmpeg
```

**Windows:**
Download from https://ffmpeg.org/download.html and add the `bin/` directory to your `PATH`.

**Verify installation:**
```bash
ffmpeg -version
```

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` to adjust settings (file size limit, TTL, rate limiting).

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `MAX_FILE_SIZE_MB` | `200` | Maximum upload file size in MB |
| `NEXT_PUBLIC_MAX_FILE_SIZE_MB` | `200` | Same value, exposed to the browser for UI display |
| `TEMP_FILE_TTL_MINUTES` | `30` | How long temp files are kept before deletion |
| `RATE_LIMIT_WINDOW_MS` | `60000` | Rate limit time window in milliseconds |
| `RATE_LIMIT_MAX_REQUESTS` | `10` | Max requests per IP per window |
| `FFMPEG_PATH` | (system PATH) | Optional: full path to ffmpeg binary |

---

## Project Structure

```
app/
  page.tsx                   # Homepage
  mp4-to-mp3/page.tsx
  wav-to-mp3/page.tsx
  m4a-to-mp3/page.tsx
  flac-to-mp3/page.tsx
  mp3-to-wav/page.tsx
  aac-to-mp3/page.tsx
  ogg-to-mp3/page.tsx
  privacy/page.tsx
  terms/page.tsx
  supported-formats/page.tsx
  contact/page.tsx
  api/
    upload/route.ts           # File upload endpoint
    convert/route.ts          # Conversion trigger endpoint
    status/route.ts           # Job status polling endpoint
    download/route.ts         # File download endpoint

components/
  layout/Header.tsx, Footer.tsx
  converter/ConverterBox.tsx, UploadArea.tsx, ...
  marketing/Hero.tsx, ToolsGrid.tsx, ...
  ui/Button.tsx, Card.tsx, Checkbox.tsx

lib/
  ffmpeg.ts                  # FFmpeg conversion helper
  file-validation.ts
  conversion-rules.ts
  temp-storage.ts
  cleanup.ts
  rate-limit.ts
  utils.ts

tmp/                         # Temp files (auto-created, gitignored)
```

---

## API Reference

### `POST /api/upload`
Accepts multipart form: `file`, `outputFormat`, `bitrate`.
Returns `{ success: true, jobId: "..." }`.

### `POST /api/convert`
Body: `{ jobId: "..." }`. Triggers async conversion.

### `GET /api/status?jobId=<id>`
Returns job status: `uploaded | processing | done | failed`.

### `GET /api/download?jobId=<id>`
Returns converted file as binary download.

---

## Production Deployment

### Node.js / VPS

```bash
npm run build
npm start
```

Use `pm2` for process management, Nginx as a reverse proxy.

### Docker

```dockerfile
FROM node:20-alpine AS builder
RUN apk add --no-cache ffmpeg
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
RUN apk add --no-cache ffmpeg
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
RUN mkdir -p /app/tmp
EXPOSE 3000
CMD ["npm", "start"]
```

### Serverless Note (Vercel, etc.)

FFmpeg does not work on standard serverless platforms out of the box. For production, use a container-based platform: **Railway**, **Fly.io**, **Render**, or a VPS. These support system FFmpeg binaries and are the recommended deployment targets.
