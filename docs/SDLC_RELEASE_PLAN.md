# Agara SDLC Release Plan

## Architecture

Agara ships as one static Vite React application with Capacitor mobile shells. The web build deploys to Vercel as static assets from `dist/`. The app does not require a backend API or Gemini key for launch.

## Built-In Learning Engine

- `services/geminiService.ts` keeps the existing async function names used by the UI.
- Sentence checks, sentence forming, writing prompts, simple stories, and Tamil speech fallback now run locally.
- `generateTamilSpeech` intentionally returns `null` so UI components use browser/device speech synthesis instead of a remote TTS API.

## Frontend

- Vite build command: `npm run build:web`.
- Main app entry remains `index.tsx` and `App.tsx`.
- The app remains installable as a PWA and syncs into Capacitor for Android.

## Android

- Android builds no longer require `AGARA_API_BASE_URL` or `VITE_API_BASE_URL`.
- Android release signing is wired through environment variables: `AGARA_ANDROID_KEYSTORE_PATH`, `AGARA_ANDROID_KEYSTORE_PASSWORD`, `AGARA_ANDROID_KEY_ALIAS`, and `AGARA_ANDROID_KEY_PASSWORD`. Before Play Store release, create the upload keystore, set those variables in the build environment, bump `versionCode`/`versionName`, and decide whether to enable minification/proguard.

## Security

- There are no Gemini/server API secrets in the app runtime.
- Vercel security headers set CSP, frame protections, `nosniff`, referrer policy, permissions policy, and HSTS.
- Firebase browser config is public by design; restrict the Firebase web API key in Google Cloud, add the production Vercel domain to Firebase Auth authorized domains, and enable Firebase App Check where practical.
- Firestore rules restrict user documents to the expected fields and validate basic shape.

## Release Checklist

1. Run `npm run lint`.
2. Run `npx tsc --noEmit`.
3. Run `npm audit --audit-level=high`.
4. Run `npm run build:web`.
5. Deploy to Vercel.
6. For Android production, set the release signing environment variables and run `npm run android:build`.
7. Push the release branch to GitHub.
