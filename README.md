# Sackboy Studio

Sackboy Studio is a playful web app that allows you to transform photos into a cute
knitted burlap plush style and add captions directly on the result. It uses
Next.js 14 with the App Router, React, TypeScript and Tailwind CSS for the
frontend and exposes a minimal API route that proxies calls to the OpenAI
Images API. All image manipulation for captions happens client‑side via the
Canvas API.

## Features

- **Upload images**: Drag and drop PNG/JPG/WebP files up to 8 MB.
- **Craft aesthetic**: Convert the entire scene into a whimsical knitted burlap
  plush look with optional miniature diorama backgrounds.
- **Adjustable styles**: Select from low/medium/high stylization and choose the
  output dimensions (512×512, 768×768 or 1024×1024).
- **Caption editor**: Overlay captions on the generated image with font,
  size, colour and outline controls. Drag to reposition on the canvas.
- **Download/share**: Export the final composite as PNG; optional blob storage
  allows shareable links when enabled.

## Getting started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Create a `.env` file** by copying `.env.example` and setting your
   `OPENAI_API_KEY` (and optionally `STORAGE_MODE`/`BLOB_READ_WRITE_TOKEN`).

3. **Run locally**:

   ```bash
   npm run dev
   ```

   Then open `http://localhost:3000` in your browser.

4. **Build for production**:

   ```bash
   npm run build
   npm start
   ```

5. **Deploy**: The project is designed for easy deployment to Vercel. The
   serverless API route is Edge compatible. Be sure to set the same env
   variables on your deployed environment.

## Project structure

```
sackboy-studio/
├─ app/
│  ├─ layout.tsx               – Global layout and Tailwind styles
│  ├─ page.tsx                 – Main page where the UI lives
│  └─ api/
│     └─ stylize/route.ts      – Edge route proxying requests to OpenAI
├─ components/                 – Reusable UI components
├─ lib/                        – Helper functions (prompt builder, OpenAI client, image utils)
├─ types/                      – Custom TypeScript declarations
├─ public/                     – Static assets (optional)
├─ package.json               – Scripts and dependencies
├─ tailwind.config.js         – Tailwind configuration
├─ tsconfig.json              – TypeScript compiler options
└─ .env.example               – Example environment variables
```

## Notes

- The API route uses `fetch` to call the OpenAI Images API. When running
  locally, your API key is read from `process.env.OPENAI_API_KEY` and never
  exposed to the client.
- This repository is just a starting point. Feel free to extend the
  functionality or adjust the styling to your liking.

---

Made with ❤️  for knitted craft aficionados.