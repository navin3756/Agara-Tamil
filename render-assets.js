import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ASSETS_DIR = './assets';
const WEB_ICONS_DIR = './public/icons';
const ANDROID_RES_DIR = './android/app/src/main/res';
const ANDROID_MIPMAPS = {
  ldpi: 36,
  mdpi: 48,
  hdpi: 72,
  xhdpi: 96,
  xxhdpi: 144,
  xxxhdpi: 192,
};

// Create assets directory if it doesn't exist
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}
if (!fs.existsSync(WEB_ICONS_DIR)) {
  fs.mkdirSync(WEB_ICONS_DIR, { recursive: true });
}
for (const density of Object.keys(ANDROID_MIPMAPS)) {
  fs.mkdirSync(path.join(ANDROID_RES_DIR, 'mipmap-' + density), { recursive: true });
}

function collectSplashResources(dir) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectSplashResources(fullPath));
    } else if (entry.isFile() && entry.name === 'splash.png') {
      results.push(fullPath);
    }
  }
  return results;
}

// 1. Definition for Background (Full flat square with premium gradient)
const bgSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1024" height="1024">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f97316" />
      <stop offset="50%" stop-color="#ea580c" />
      <stop offset="100%" stop-color="#b91c1c" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="512" height="512" fill="url(#bgGrad)" />
</svg>
`;

// 2. Definition for Foreground (Transparent background, with sparkles, rays, "அ", and smile)
const fgSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1024" height="1024">
  <defs>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#f97316" stop-opacity="0.2" />
    </linearGradient>
    <linearGradient id="sunRayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </linearGradient>
    <filter id="dropShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#000000" flood-opacity="0.3" />
    </filter>
    <filter id="sparkleGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <path d="M 0 0 L 250 0 C 180 180, 180 320, 0 512 Z" fill="url(#sunRayGrad)" />
  <circle cx="430" cy="90" r="160" fill="#ffffff" opacity="0.06" />
  <circle cx="80" cy="420" r="120" fill="#ffffff" opacity="0.04" />
  <path d="M 400 120 L 405 135 L 420 140 L 405 145 L 400 160 L 395 145 L 380 140 L 395 135 Z" fill="#fef08a" filter="url(#sparkleGlow)" />
  <path d="M 440 180 L 442 187 L 450 190 L 442 193 L 440 200 L 438 193 L 430 190 L 438 187 Z" fill="#ffffff" opacity="0.9" />
  <path d="M 100 340 L 104 350 L 115 354 L 104 358 L 100 368 L 96 358 L 85 354 L 96 350 Z" fill="#fef08a" filter="url(#sparkleGlow)" opacity="0.8" />
  <rect x="15" y="15" width="482" height="482" rx="105" fill="none" stroke="url(#borderGrad)" stroke-width="8" opacity="0.5" />
  <text x="50%" y="54%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        font-weight="900"
        font-size="285"
        fill="#ffffff"
        filter="url(#dropShadow)">அ</text>
  <path d="M 210 405 Q 256 425 302 405" fill="none" stroke="#fef08a" stroke-width="8" stroke-linecap="round" opacity="0.9" filter="url(#sparkleGlow)" />
</svg>
`;

// 3. Definition for standard full square clean icon (For iOS and general Stores)
const fullIconSquareSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1024" height="1024">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f97316" />
      <stop offset="50%" stop-color="#ea580c" />
      <stop offset="100%" stop-color="#b91c1c" />
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#f97316" stop-opacity="0.2" />
    </linearGradient>
    <linearGradient id="sunRayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </linearGradient>
    <filter id="dropShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#000000" flood-opacity="0.3" />
    </filter>
    <filter id="sparkleGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect x="0" y="0" width="512" height="512" fill="url(#bgGrad)" />
  <path d="M 0 0 L 250 0 C 180 180, 180 320, 0 512 Z" fill="url(#sunRayGrad)" />
  <circle cx="430" cy="90" r="160" fill="#ffffff" opacity="0.06" />
  <circle cx="80" cy="420" r="120" fill="#ffffff" opacity="0.04" />
  <path d="M 400 120 L 405 135 L 420 140 L 405 145 L 400 160 L 395 145 L 380 140 L 395 135 Z" fill="#fef08a" filter="url(#sparkleGlow)" />
  <path d="M 440 180 L 442 187 L 450 190 L 442 193 L 440 200 L 438 193 L 430 190 L 438 187 Z" fill="#ffffff" opacity="0.9" />
  <path d="M 100 340 L 104 350 L 115 354 L 104 358 L 100 368 L 96 358 L 85 354 L 96 350 Z" fill="#fef08a" filter="url(#sparkleGlow)" opacity="0.8" />
  <rect x="15" y="15" width="482" height="482" rx="105" fill="none" stroke="url(#borderGrad)" stroke-width="8" opacity="0.5" />
  <text x="50%" y="54%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        font-weight="900"
        font-size="285"
        fill="#ffffff"
        filter="url(#dropShadow)">அ</text>
  <path d="M 210 405 Q 256 425 302 405" fill="none" stroke="#fef08a" stroke-width="8" stroke-linecap="round" opacity="0.9" filter="url(#sparkleGlow)" />
</svg>
`;

// 4. Definition for Splash Screen (2732x2732 with centered squircle logo on rich gradient and ambient background sparkles)
const splashSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2732 2732" width="2732" height="2732">
  <defs>
    <!-- Rich Orange to Red Background Gradient for full screen -->
    <linearGradient id="splashBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff7f11" />
      <stop offset="40%" stop-color="#ea580c" />
      <stop offset="100%" stop-color="#991b1b" />
    </linearGradient>

    <!-- Custom gradients and filters for logo inside -->
    <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f97316" />
      <stop offset="100%" stop-color="#ea580c" />
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#f97316" stop-opacity="0.3" />
    </linearGradient>
    <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="25" stdDeviation="25" flood-color="#000000" flood-opacity="0.35" />
    </filter>
    <filter id="textShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="12" flood-color="#000000" flood-opacity="0.4" />
    </filter>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Solid/Gradient Backdrop -->
  <rect x="0" y="0" width="2732" height="2732" fill="url(#splashBg)" />

  <!-- Gorgeous ambient sparkles in the backdrop -->
  <!-- Top Left Sparkle -->
  <path d="M 400 350 L 415 390 L 455 405 L 415 420 L 400 460 L 385 420 L 345 405 L 385 390 Z" fill="#fef08a" opacity="0.3" filter="url(#glow)" />
  <!-- Bottom Right Sparkle -->
  <path d="M 2300 2300 L 2315 2340 L 2355 2355 L 2315 2370 L 2300 2410 L 2285 2370 L 2245 2355 L 2285 2340 Z" fill="#fef08a" opacity="0.3" filter="url(#glow)" />

  <!-- Massive Background Radial Circle elements mapping ambient shapes -->
  <circle cx="1366" cy="1366" r="850" fill="#ffffff" opacity="0.02" />
  <circle cx="1366" cy="1366" r="650" fill="#ffffff" opacity="0.03" />

  <!-- The Centered Squircle Logo Frame (650x650 width, rounded rx=160) -->
  <g filter="url(#logoShadow)">
    <rect x="1041" y="941" width="650" height="650" rx="160" fill="url(#logoBg)" stroke="url(#borderGrad)" stroke-width="12" />

    <!-- Background visual patterns inside the logo -->
    <path d="M 1041 941 L 1380 941 C 1290 1180, 1290 1340, 1041 1591 Z" fill="#ffffff" opacity="0.12" />
    <circle cx="1600" cy="1050" r="200" fill="#ffffff" opacity="0.07" />

    <!-- Core Tamil character "அ" centered perfectly -->
    <text x="1366" y="1250"
          dominant-baseline="middle"
          text-anchor="middle"
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          font-weight="900"
          font-size="360"
          fill="#ffffff"
          filter="url(#textShadow)">அ</text>

    <!-- Adorable little smiling visual shape -->
    <path d="M 1296 1420 Q 1366 1450 1436 1420" fill="none" stroke="#fef08a" stroke-width="12" stroke-linecap="round" opacity="0.9" />
  </g>

  <!-- Sparkles surrounding the main logo -->
  <path d="M 1780 1020 L 1792 1055 L 1827 1067 L 1792 1079 L 1780 1114 L 1768 1079 L 1733 1067 L 1768 1055 Z" fill="#fef08a" filter="url(#glow)" opacity="0.8" />
  <path d="M 940 1550 L 950 1578 L 978 1588 L 950 1598 L 940 1626 L 930 1598 L 902 1588 L 930 1578 Z" fill="#ffffff" filter="url(#glow)" opacity="0.7" />

  <!-- Premium Application Slogan / Title underneath -->
  <text x="1366" y="1720"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="system-ui, -apple-system, sans-serif"
        font-weight="bold"
        font-size="64"
        fill="#ffffff"
        letter-spacing="4">AGARA</text>

  <text x="1366" y="1795"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="system-ui, -apple-system, sans-serif"
        font-weight="500"
        font-size="34"
        fill="#fef08a"
        opacity="0.9"
        letter-spacing="6">TAMIL LEARNING COMPANION</text>
</svg>
`;

async function main() {
  try {
    console.log('Rendering high-density assets...');

    // 1. Render icon.png
    console.log('Rendering assets/icon-only.png...');
    await sharp(Buffer.from(fullIconSquareSvg))
      .png()
      .toFile(path.join(ASSETS_DIR, 'icon-only.png'));

    console.log('Rendering assets/icon.png...');
    await sharp(Buffer.from(fullIconSquareSvg))
      .png()
      .toFile(path.join(ASSETS_DIR, 'icon.png'));

    // 2. Render icon-background.png
    console.log('Rendering assets/icon-background.png...');
    await sharp(Buffer.from(bgSvg))
      .png()
      .toFile(path.join(ASSETS_DIR, 'icon-background.png'));

    // 3. Render icon-foreground.png
    console.log('Rendering assets/icon-foreground.png...');
    await sharp(Buffer.from(fgSvg))
      .png()
      .toFile(path.join(ASSETS_DIR, 'icon-foreground.png'));

    // 4. Render splash.png
    console.log('Rendering assets/splash.png...');
    const splashPng = await sharp(Buffer.from(splashSvg))
      .png()
      .toBuffer();
    await sharp(splashPng)
      .toFile(path.join(ASSETS_DIR, 'splash.png'));

    for (const splashPath of collectSplashResources(ANDROID_RES_DIR)) {
      console.log('Rendering Android splash resource ' + splashPath + '...');
      await sharp(splashPng)
        .png()
        .toFile(splashPath);
    }

    for (const size of [48, 72, 96, 128, 192, 256, 512]) {
      console.log(`Rendering public/icons/icon-${size}.webp...`);
      await sharp(Buffer.from(fullIconSquareSvg))
        .resize(size, size)
        .webp({ quality: 92 })
        .toFile(path.join(WEB_ICONS_DIR, `icon-${size}.webp`));
    }

    for (const [density, size] of Object.entries(ANDROID_MIPMAPS)) {
      const mipmapDir = path.join(ANDROID_RES_DIR, `mipmap-${density}`);
      console.log(`Rendering Android launcher PNGs for ${density}...`);
      await sharp(Buffer.from(fullIconSquareSvg))
        .resize(size, size)
        .png()
        .toFile(path.join(mipmapDir, 'ic_launcher.png'));
      await sharp(Buffer.from(fullIconSquareSvg))
        .resize(size, size)
        .png()
        .toFile(path.join(mipmapDir, 'ic_launcher_round.png'));
      await sharp(Buffer.from(bgSvg))
        .resize(size, size)
        .png()
        .toFile(path.join(mipmapDir, 'ic_launcher_background.png'));
      await sharp(Buffer.from(fgSvg))
        .resize(size, size)
        .png()
        .toFile(path.join(mipmapDir, 'ic_launcher_foreground.png'));
    }

    console.log('Successfully rendered all core assets!');
  } catch (error) {
    console.error('Error generating design assets:', error);
    process.exit(1);
  }
}

main();
