# 📱 Agara Tamil Learning — Android Build & Google Play Store Guide

This guide describes how to build, compile, and package your **Agara Tamil Learning** React & Capacitor web application into a fully certified native **Android App (.apk or .aab)**, ready for distribution on the **Google Play Store**.

---

## 🛠️ Step 1: Exporting and Downloading the App
1. Open the **Settings** menu in the top-right corner of Google AI Studio.
2. Select **Export to ZIP** or **GitHub** to download the complete source code to your computer.
3. Unzip the downloaded file onto your local machine.

---

## 💻 Step 2: Local Pre-requisites
To compile the Android app, ensure you have the following installed on your machine:
1. **Node.js**: (LTS version is recommended).
2. **Java JDK 17**: Needed to compile Gradle configurations.
3. **Android Studio**: The official development platform for Android.

---

## 🚀 Step 3: Fast Native Syncing & Launching
In your project directory, we have configured automation scripts in the `package.json` file. Run these commands using your terminal:

1. **Install Local Dependencies**:
   ```bash
   npm install
   ```

2. **Sync Web Code to Android Project**:
   This compiles your React application and pushes the optimized static assets into the native Android folder structure:
   ```bash
   npm run android:sync
   ```

3. **Open Android Studio Directly**:
   This launches Android Studio with your Capacitor Android project pre-loaded:
   ```bash
   npm run android:open
   ```

---

## 📦 Step 4: Compiling for Testing (Debug APK)
If you want to test the app on a physical Android device or an Emulator:
1. Open the project in Android Studio.
2. Connect your Android phone with **USB Debugging** enabled, or start a Virtual Device Emulator.
3. Click the green **Run (Play)** button at the top toolbar of Android Studio.
4. To export a shareable test APK: Go to `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`.

---

## 🎖️ Step 5: Packaging for the Google Play Store (Production AAB)
Google Play requires submissions to be in the **Android App Bundle (.aab)** format.

### 🔑 Group A: Create a Upload Keystore Profile
1. In Android Studio, select **Build** > **Generate Signed Bundle / APK...**
2. Choose **Android App Bundle**, then click **Next**.
3. Under **Key store path**, click **Create new...**
4. Set a path to save the keystore file (e.g., `my-release-key.jks`), choose password phrases, define an alias (e.g., `upload-key`), and fill in the certificate organization name. Keep this key safe, as you will use it for all future updates.

### 📦 Group B: Build the Production Bundle
1. In the same **Generate Signed Bundle** window, select your newly created keystore.
2. Enter the keystore password, Key alias, and Key password.
3. Click **Next** and select **release** as the Build Variant.
4. Click **Create** / **Finish**.
5. Once complete, Android Studio will notify you. Click **Locate** to find your `.aab` file!

---

## 🌐 Play Store Publishing Checklist
1. Go to the [Google Play Console](https://play.google.com/console).
2. Create a developer account and click **Create App**.
3. Upload the generated release-signed `.aab` file under **Dashboard** > **Production**.
4. Set up the Store Listing with details, high-quality graphics, screenshots, and privacy policy parameters.
5. Publish! Your app will go under review and will soon be live for kids and students globally on Android.
