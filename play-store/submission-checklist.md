# Google Play Submission Checklist

## Release Artifact

- Package name: `com.abcdschoolofbollywood.agara`
- Version name: `1.0`
- Version code: `1`
- Target SDK: `36`
- Upload artifact: `android/app/build/outputs/bundle/release/app-release.aab`
- Release copy: `release/google-play/Agara-Tamil-Learning-v1.0-1.aab`
- Release checksum: `release/google-play/Agara-Tamil-Learning-v1.0-1.sha256.txt`
- Keep the upload keystore safe: `C:\Users\nalin\.agara\android\agara-upload-key.jks`

## Store Listing

- App icon: `play-store/assets/app-icon-512.png`
- Feature graphic: `play-store/assets/feature-graphic-1024x500.png`
- Phone screenshots: `play-store/assets/screenshots/`
- Listing copy: `play-store/listing-en-US.md`
- Release notes: `play-store/release-notes-en-US.txt`
- Privacy policy: `https://agara-tamil.vercel.app/privacy-policy.html`
- Support page: `https://agara-tamil.vercel.app/support.html`

## Play Console Setup

1. Create the app in Play Console as an Education app.
2. Choose free or paid before publishing. This cannot be changed from free to paid later.
3. Accept Play App Signing.
4. Upload the signed `.aab`.
5. Fill the main store listing using the copy and assets above.
6. Complete App content: privacy policy, data safety, target audience, ads, content rating, and government apps declaration.
7. Use internal testing first, then closed/open testing or production according to the account requirements.

## Publishing Automation

No Play Console service-account key or fastlane/Gradle Play Publisher configuration is currently present. To automate upload later, create a Play Console service account JSON key outside the repo and wire it through CI secrets.
