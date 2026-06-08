import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const root = process.cwd();
const outputDir = path.join(root, 'play-store', 'assets');
const sourceIcon = path.join(root, 'assets', 'icon.png');

fs.mkdirSync(outputDir, { recursive: true });

const featureSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="500" viewBox="0 0 1024 500">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ff7f11"/>
      <stop offset="0.52" stop-color="#f97316"/>
      <stop offset="1" stop-color="#be123c"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.25" r="0.68">
      <stop offset="0" stop-color="#fff7ed" stop-opacity="0.42"/>
      <stop offset="1" stop-color="#fff7ed" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#7f1d1d" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect width="1024" height="500" fill="url(#bg)"/>
  <rect width="1024" height="500" fill="url(#glow)"/>
  <circle cx="72" cy="76" r="178" fill="#ffffff" opacity="0.10"/>
  <circle cx="918" cy="430" r="220" fill="#ffffff" opacity="0.08"/>
  <path d="M806 70l9 27 28 9-28 9-9 28-9-28-28-9 28-9z" fill="#fef08a" opacity="0.9"/>
  <path d="M135 366l7 20 21 7-21 7-7 22-7-22-21-7 21-7z" fill="#ffffff" opacity="0.65"/>
  <g filter="url(#shadow)">
    <rect x="84" y="84" width="230" height="230" rx="54" fill="#ffffff" opacity="0.16"/>
    <rect x="102" y="102" width="194" height="194" rx="46" fill="#f97316" stroke="#fef3c7" stroke-width="6"/>
    <text x="199" y="229" text-anchor="middle"
      font-family="Nirmala UI, Latha, Arial, sans-serif"
      font-size="132" font-weight="900" fill="#ffffff">அ</text>
  </g>
  <text x="370" y="168" font-family="Baloo Thambi 2, Nirmala UI, Arial, sans-serif"
    font-size="72" font-weight="900" fill="#ffffff">Agara Tamil</text>
  <text x="372" y="229" font-family="Baloo Thambi 2, Nirmala UI, Arial, sans-serif"
    font-size="34" font-weight="800" fill="#fff7ed">Learn letters, words, stories, and speaking</text>
  <g font-family="Baloo Thambi 2, Nirmala UI, Arial, sans-serif" font-weight="900">
    <rect x="372" y="282" width="142" height="58" rx="29" fill="#fff7ed"/>
    <text x="443" y="321" text-anchor="middle" font-size="24" fill="#c2410c">KG</text>
    <rect x="530" y="282" width="190" height="58" rx="29" fill="#fff7ed" opacity="0.9"/>
    <text x="625" y="321" text-anchor="middle" font-size="24" fill="#c2410c">Grammar</text>
    <rect x="736" y="282" width="158" height="58" rx="29" fill="#fff7ed" opacity="0.82"/>
    <text x="815" y="321" text-anchor="middle" font-size="24" fill="#c2410c">Practice</text>
  </g>
</svg>
`;

await sharp(sourceIcon)
  .resize(512, 512)
  .png()
  .toFile(path.join(outputDir, 'app-icon-512.png'));

await sharp(Buffer.from(featureSvg))
  .png({ palette: false })
  .toFile(path.join(outputDir, 'feature-graphic-1024x500.png'));

console.log(`Generated Play Store assets in ${outputDir}`);
