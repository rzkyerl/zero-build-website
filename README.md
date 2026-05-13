# Zero — Compress. Stay Sharp.

> Hybrid media compressor — photos run entirely in your browser, videos via secure cloud. No account, no upload for photos, no tracking.

**Live:** [zero-build.site](https://www.zero-build.site)

---

## Overview

Zero is a web-based media compression tool built for creators who care about output quality. It uses a hybrid architecture: image compression runs client-side via the Canvas API (zero upload, fully private), while video compression is handled through a secure cloud API to avoid the performance cost of running FFmpeg in the browser.

---

## Features

| Feature | Detail |
|---|---|
| **Photo compression** | Canvas API — runs 100% in-browser, files never leave your device |
| **Video compression** | Secure cloud API (ApyHub) — no FFmpeg download, no waiting |
| **4 presets** | Instagram Ready, WhatsApp Ready, Smart Auto, Custom |
| **Output formats** | JPEG, WebP, PNG (photos) · MP4 H.264 (video) |
| **No account required** | Open and compress immediately |
| **Zero telemetry** | No analytics, no data collection on photos |
| **Android app** | Full offline experience available as APK |

---

## Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org) (App Router) + React 19
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4 + CSS custom properties
- **Fonts** — [Geist](https://vercel.com/font) (Sans + Mono)
- **Smooth scroll** — [Lenis](https://lenis.darkroom.engineering)
- **Image compression** — Browser Canvas API (`OffscreenCanvas`)
- **Video compression** — [ApyHub](https://apyhub.com) cloud API (direct upload from browser)
- **Deployment** — [Vercel](https://vercel.com)
- **Analytics** — Vercel Analytics + Speed Insights

---

## Project Structure

```
app/
├── api/
│   ├── chat/              # AI assistant streaming endpoint (NVIDIA NIM)
│   ├── compress-token/    # Vends ApyHub token to client (keeps key server-side)
│   └── compress-video/    # Legacy proxy route (unused — direct upload bypasses Vercel 4.5MB limit)
├── layout.tsx             # Root layout, fonts, metadata
└── page.tsx               # Home page — assembles all sections

src/
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── sections/          # Hero, Compressor, Features, About, Download, MarqueeStrip
│   └── ui/                # ChatWidget, Cursor, Noise, PageLoader, ScrollProgress, SmoothScroll
├── features/
│   ├── compressor/        # compress-image.ts, compress-video.ts, presets.ts
│   └── uploader/          # use-upload.ts (drag & drop / file input handler)
├── hooks/                 # use-file.ts, use-processing.ts
├── lib/                   # constants.ts, format-size.ts, scroll.ts
├── styles/                # theme.css (design tokens, animations)
└── types/                 # file.ts, preset.ts, global.d.ts

public/
├── ffmpeg/                # FFmpeg WASM assets (cached, not actively used in prod)
└── preview-mobile/        # Android app screenshot
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Install

```bash
git clone https://github.com/rzkyerl/zero-build-website.git
cd zero-build-website
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
# ApyHub API token — used for video compression
APYHUB_TOKEN=your_apyhub_token_here

# NVIDIA NIM API key — used for the AI chat assistant
NVIDIA_API_KEY=your_nvidia_nim_key_here
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## How Compression Works

### Photos

1. File is read locally via `FileReader` / drag-and-drop — never uploaded
2. `createImageBitmap()` decodes the image
3. `OffscreenCanvas` redraws at the target resolution
4. `canvas.convertToBlob()` encodes to JPEG / WebP / PNG at the preset quality
5. Output is served as an object URL for download

### Videos

1. Client fetches a short-lived ApyHub token from `/api/compress-token` (keeps the key server-side)
2. Client uploads the video **directly** to ApyHub — bypasses Vercel's 4.5 MB serverless body limit
3. ApyHub returns a compressed MP4 (H.264)
4. Output is served as an object URL for download

---

## Presets

| Preset | Photo Quality | Video CRF | Max Dimension |
|---|---|---|---|
| Instagram Ready | 88% | CRF 18 | 1920px |
| WhatsApp Ready | 72% | CRF 26 | 1600px |
| Smart Auto | 82% | CRF 22 | 2560px |
| Custom | User-defined | User-defined | Scales with quality |

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

---

## Android App

A native Android APK is available on the [Releases](https://github.com/rzkyerl/zero-build-website/releases) page.

- Fully offline — no network required for photo compression
- Same 4 presets as the web version
- Before/after size comparison
- Auto Save + Share via system sheet
- Requires Android API 24+ (Android 7.0)

---

## License

MIT © [CTRLBuild](https://www.zero-build.site)
