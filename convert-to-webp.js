/**
 * PNG → WebP Batch Converter
 * Converts all frame PNG images to WebP format (75-85% smaller)
 * Usage: node convert-to-webp.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Install sharp if not present
try {
  require.resolve('sharp');
} catch (e) {
  console.log('📦 Installing sharp...');
  execSync('npm install sharp --save-dev', { stdio: 'inherit' });
}

const sharp = require('sharp');

const FOLDERS = [
  'public/assets/heroframes',
  'public/assets/secondframes',
  'public/assets/finalframe',
];

const WEBP_QUALITY = 82; // 80-85 is sweet spot for quality vs size

async function convertFolder(folderPath) {
  const fullPath = path.join(__dirname, folderPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Skipping (not found): ${folderPath}`);
    return;
  }

  const files = fs.readdirSync(fullPath).filter(f => f.toLowerCase().endsWith('.png'));
  console.log(`\n📁 ${folderPath} → ${files.length} PNG files`);

  let converted = 0;
  let savedBytes = 0;

  for (let i = 0; i < files.length; i++) {
    const pngFile = path.join(fullPath, files[i]);
    const webpFile = pngFile.replace(/\.png$/i, '.webp');

    if (fs.existsSync(webpFile)) {
      // Already converted
      converted++;
      continue;
    }

    try {
      const pngSize = fs.statSync(pngFile).size;
      await sharp(pngFile)
        .webp({ quality: WEBP_QUALITY, effort: 4 })
        .toFile(webpFile);

      const webpSize = fs.statSync(webpFile).size;
      savedBytes += (pngSize - webpSize);
      converted++;

      if (i % 20 === 0 || i === files.length - 1) {
        const pct = Math.round((converted / files.length) * 100);
        process.stdout.write(`\r  ⏳ ${pct}% (${converted}/${files.length}) - Saved: ${(savedBytes / 1024 / 1024).toFixed(1)} MB`);
      }
    } catch (err) {
      console.error(`\n  ❌ Error on ${files[i]}:`, err.message);
    }
  }

  console.log(`\n  ✅ Done! Converted ${converted} files`);
  return savedBytes;
}

async function main() {
  console.log('🚀 Starting PNG → WebP conversion...');
  console.log('   Quality:', WEBP_QUALITY, '(80-85 is ideal)');
  console.log('   This will KEEP original PNGs (safe to verify first)\n');

  let totalSaved = 0;
  for (const folder of FOLDERS) {
    const saved = await convertFolder(folder);
    totalSaved += (saved || 0);
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✨ Total space saved: ${(totalSaved / 1024 / 1024).toFixed(1)} MB`);
  console.log('\n📋 NEXT STEPS:');
  console.log('  1. Update your JSX files to use .webp instead of .png');
  console.log('  2. Delete old .png files from public/assets/');
  console.log('  3. Run: npm run build && git add . && git commit && git push');
  console.log('='.repeat(50));
}

main().catch(console.error);
