<div align="center">
<img width="1200" height="475" alt="Agara Tamil Learning" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Agara Tamil Learning

Agara is a Tamil learning web and Android app exported from Google AI Studio and hardened for a no-backend launch path. The app now uses built-in local learning helpers instead of Gemini API calls, so it can run on Vercel, Android, and local devices without a server API key.

View the original AI Studio app: https://ai.studio/apps/32297d23-382d-4fff-9256-bddadf0d6f7d

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. Run the app: `npm run dev`
3. Open `http://localhost:3000`

## Build Targets

- Web production bundle: `npm run build:web`
- Vercel deployment: deploy the repo root; no API key is required
- Android emulator/debug APK: `npm run android:dev`
- Android production bundle: `npm run android:build`

Speech uses the browser/device speech synthesis fallback when available. AI-style practice feedback, sentence forming, prompts, and simple stories are handled locally in `services/geminiService.ts`.

See [docs/SDLC_RELEASE_PLAN.md](docs/SDLC_RELEASE_PLAN.md) for architecture, security, frontend, Android, and release checklist notes.
