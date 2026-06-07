# 📱 Agara Tamil Learning — Mobile App Packaging & Submission Guide

This guide describes how to build, sync, compile, and package your **Agara Tamil Learning** React & Capacitor web application into fully certified native mobile apps for the **Google Play Store (Android)** and the **Apple App Store (iOS)**.

---

## 🛠️ Step 1: Exporting and Downloading the App
1. Open the **Settings** menu in the top-right corner of Google AI Studio.
2. Select **Export to ZIP** or **GitHub** to download the complete source code to your computer.
3. Unzip the downloaded file onto your local machine.

---

## 💻 Step 2: Local Pre-requisites
To compile the mobile applications locally:
1. **Node.js**: (LTS version is recommended).
2. **For Android**:
   * **Java JDK 17**: Required to compile Gradle scripts.
   * **Android Studio**: The official development platform for Android.
3. **For iOS** (Requires macOS):
   * **Xcode**: The official development platform for iOS.
   * **Cocoapods**: Dependency manager for native iOS extensions (`sudo gem install cocoapods` or `brew install cocoapods`).

---

## 🚀 Step 3: Fast Native Syncing & Launching
In your project directory, run these commands inside your local command terminal:

1. **Install Local Dependencies**:
   ```bash
   npm install
   ```

2. **Sync Web Code to Mobile Platforms**:
   This compiles your React application and pushes the optimized static web assets and native plugins into both the `/android` and `/ios` directories:
   ```bash
   # Android sync
   npm run android:sync

   # General iOS sync & update
   npm run build
   npx cap sync ios
   ```

3. **Open the Projects in Android Studio / Xcode**:
   You can open the native projects directly using the Capacitor CLI:
   ```bash
   # Opens Android Studio with the Android folder pre-loaded
   npm run android:open

   # Opens Xcode with the iOS folder pre-loaded
   npx cap open ios
   ```

---

## 🤖 Part A: Google Play Store Packaging

### 📦 1. Compiling a Debug APK (For Testing)
* Open the project in Android Studio.
* Connect a physical Android phone with **USB Debugging** enabled, or start a Virtual Device Emulator.
* Click the green **Run (Play)** button on the top toolbar.
* Alternatively, to extract a debug `.apk` to test on devices: Go to `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`.

### 🎖️ 2. Packaging the Production App Bundle (.aab)
Google Play requires submissions in the **Android App Bundle (.aab)** format.

#### 🔑 Create an Upload Keystore Profile
1. In Android Studio, select **Build** > **Generate Signed Bundle / APK...**
2. Choose **Android App Bundle**, then click **Next**.
3. Under **Key store path**, click **Create new...**
4. Set a path to save the keystore file (e.g., `my-release-key.jks`), define password phrases, set an alias (e.g., `upload-key`), and fill in certificate organization attributes. Save this key in a secure place.

#### 📦 Build the Dual-release Signed Bundle
1. In the same Generate Signed Bundle window, select your newly created keystore.
2. Enter the passwords and the alias.
3. Click **Next**, choose **release** as the Build Variant, and click **Finish**.
4. Once completed, simple click **Locate** on the Android Studio dialogue popup to find your compiled release `.aab` file!

---

## 🍏 Part B: Apple App Store Packaging

### 📦 1. Compiling for Testing (Simulator or TestFlight)
1. In terminal, compile the project and open Xcode:
   ```bash
   npx cap open ios
   ```
2. On Xcode's left sidebar, click `App`. Under the **Signing & Capabilities** tab:
   * Tick **Automatically manage signing**.
   * Select your **Apple Developer Team**.
3. Select your Simulator (e.g., iPhone 15) or connected device from the top toolbar list and click the **Play** button to build and run!

### 🎖️ 2. Packaging the Production iOS Application Archive (.ipa)
1. Select **Any iOS Device (arm64)** as the target in the top toolbar in Xcode.
2. Go to **Product** > **Archive**. Xcode will compile and package the application.
3. Once the Organizer window pops up, click **Distribute App**.
4. Select **App Store Connect** and follow the prompts to complete the automated signing validation and direct server upload!

---

## 🌟 Beautiful Automated Asset Pipeline
We have fully automated the icon generation workflow. If you ever update the logo vector again inside `/icon.svg` or `/public/icon.svg`, simply execute:
```bash
# Render high definition SVGs into Android, iOS, and PWA icon assets
npm run assets:generate
```
All mipmaps, drawable splash themes, Apple icon profiles, and PWA assets will immediately synchronize perfectly.
