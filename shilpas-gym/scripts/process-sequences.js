import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Helper to find ffmpeg
function getFfmpegPath() {
  const possiblePaths = [
    'ffmpeg',
    'C:\\Users\\Pc\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg.Essentials_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.1-essentials_build\\bin\\ffmpeg.exe',
  ];

  for (const p of possiblePaths) {
    try {
      execSync(`"${p}" -version`, { stdio: 'ignore' });
      return p;
    } catch {
      // Continue searching
    }
  }

  throw new Error('FFmpeg not found. Please install ffmpeg or add it to PATH.');
}

const FFMPEG_BIN = getFfmpegPath();
console.log(`[PIPELINE] Using FFmpeg at: ${FFMPEG_BIN}`);

// Sequence configurations
export const SEQUENCE_DEFINITIONS = {
  a01: {
    id: 'a01-hero',
    name: 'A01 Hero Scroll Master',
    masterFile: path.join(projectRoot, 'public/assets/video-masters/A01_hero_scroll_master.mp4'),
    outputDir: path.join(projectRoot, 'public/assets/sequences/a01-hero'),
    desktop: {
      fps: 24,
      totalExpectedFrames: 192,
      // Source native is 848x478 (16:9). We maintain crisp 1:1 pixel rendering without artificial upscaling blur
      width: 848,
      height: 478,
      quality: 78,
      compressionLevel: 5,
    },
    mobile: {
      fps: 12, // 50% frame density for mobile efficiency (96 frames total)
      totalExpectedFrames: 96,
      width: 640,
      height: 360,
      quality: 72,
      compressionLevel: 5,
    },
    posterFrameNumber: 1,
    posterQuality: 85,
    aspectRatio: '16:9',
  },
  a08: {
    id: 'a08-signature',
    name: 'A08 Signature Scroll Sequence',
    masterFile: path.join(projectRoot, 'public/assets/video-masters/A08_signature_scroll_sequence.mp4'),
    outputDir: path.join(projectRoot, 'public/assets/sequences/a08-signature'),
    desktop: {
      fps: 24,
      totalExpectedFrames: 192,
      width: 848,
      height: 478,
      quality: 78,
      compressionLevel: 5,
    },
    mobile: {
      fps: 12,
      totalExpectedFrames: 96,
      width: 640,
      height: 360,
      quality: 72,
      compressionLevel: 5,
    },
    posterFrameNumber: 1,
    posterQuality: 85,
    aspectRatio: '16:9',
  },
  a19: {
    id: 'a19',
    name: 'A19 Locked Reel',
    masterFile: path.join(projectRoot, 'public/assets/video-masters/A19_locked.mp4'),
    outputDir: path.join(projectRoot, 'public/assets/sequences/a19'),
    desktop: {
      fps: 24,
      totalExpectedFrames: 192,
      width: 848,
      height: 478,
      quality: 78,
      compressionLevel: 5,
    },
    mobile: {
      fps: 12,
      totalExpectedFrames: 96,
      width: 640,
      height: 360,
      quality: 72,
      compressionLevel: 5,
    },
    posterFrameNumber: 1,
    posterQuality: 85,
    aspectRatio: '16:9',
  },
};

/**
 * Process a single video sequence
 */
export function processSequence(sequenceKey) {
  const config = SEQUENCE_DEFINITIONS[sequenceKey];
  if (!config) {
    throw new Error(`Unknown sequence key: ${sequenceKey}. Available: ${Object.keys(SEQUENCE_DEFINITIONS).join(', ')}`);
  }

  console.log(`\n======================================================`);
  console.log(`[PROCESSING] ${config.name} (${config.id})`);
  console.log(`Source Master: ${config.masterFile}`);
  console.log(`Target Dir:    ${config.outputDir}`);
  console.log(`======================================================\n`);

  if (!fs.existsSync(config.masterFile)) {
    throw new Error(`Master file not found at: ${config.masterFile}`);
  }

  // Ensure directories exist
  const desktopDir = config.outputDir;
  const mobileDir = path.join(config.outputDir, 'mobile');
  fs.mkdirSync(desktopDir, { recursive: true });
  fs.mkdirSync(mobileDir, { recursive: true });

  // 1. EXTRACT DESKTOP FRAMES
  console.log(`[1/3] Extracting Desktop frames (${config.desktop.fps} fps, quality ${config.desktop.quality})...`);
  const desktopPattern = path.join(desktopDir, '%04d.webp');
  
  // Clean existing desktop webp frames
  const oldDesktopFiles = fs.readdirSync(desktopDir).filter(f => f.endsWith('.webp') && /^\d{4}\.webp$/.test(f));
  for (const f of oldDesktopFiles) {
    fs.unlinkSync(path.join(desktopDir, f));
  }

  const desktopArgs = [
    '-y',
    '-i', config.masterFile,
    '-vf', `fps=${config.desktop.fps},scale=${config.desktop.width}:${config.desktop.height}:flags=lanczos`,
    '-c:v', 'libwebp',
    '-quality', String(config.desktop.quality),
    '-compression_level', String(config.desktop.compressionLevel),
    desktopPattern,
  ];

  const startTime = Date.now();
  execFileSync(FFMPEG_BIN, desktopArgs, { stdio: 'inherit' });
  const desktopDuration = ((Date.now() - startTime) / 1000).toFixed(2);

  const desktopFrames = fs.readdirSync(desktopDir).filter(f => /^\d{4}\.webp$/.test(f)).sort();
  console.log(`-> Extracted ${desktopFrames.length} desktop frames in ${desktopDuration}s.`);

  // 2. EXTRACT MOBILE FRAMES
  console.log(`\n[2/3] Extracting Mobile frames (${config.mobile.fps} fps, ${config.mobile.width}x${config.mobile.height}, quality ${config.mobile.quality})...`);
  const mobilePattern = path.join(mobileDir, '%04d.webp');
  
  const oldMobileFiles = fs.readdirSync(mobileDir).filter(f => f.endsWith('.webp') && /^\d{4}\.webp$/.test(f));
  for (const f of oldMobileFiles) {
    fs.unlinkSync(path.join(mobileDir, f));
  }

  const mobileArgs = [
    '-y',
    '-i', config.masterFile,
    '-vf', `fps=${config.mobile.fps},scale=${config.mobile.width}:${config.mobile.height}:flags=lanczos`,
    '-c:v', 'libwebp',
    '-quality', String(config.mobile.quality),
    '-compression_level', String(config.mobile.compressionLevel),
    mobilePattern,
  ];

  const startMobTime = Date.now();
  execFileSync(FFMPEG_BIN, mobileArgs, { stdio: 'inherit' });
  const mobDuration = ((Date.now() - startMobTime) / 1000).toFixed(2);

  const mobileFrames = fs.readdirSync(mobileDir).filter(f => /^\d{4}\.webp$/.test(f)).sort();
  console.log(`-> Extracted ${mobileFrames.length} mobile frames in ${mobDuration}s.`);

  // 3. GENERATE POSTER
  console.log(`\n[3/3] Generating Master Poster frame (Frame #${config.posterFrameNumber})...`);
  const posterPath = path.join(desktopDir, 'poster.webp');
  const sourcePosterFrame = path.join(desktopDir, `${String(config.posterFrameNumber).padStart(4, '0')}.webp`);
  if (fs.existsSync(sourcePosterFrame)) {
    fs.copyFileSync(sourcePosterFrame, posterPath);
  } else {
    execFileSync(FFMPEG_BIN, [
      '-y',
      '-i', config.masterFile,
      '-vf', `select=eq(n\\,${config.posterFrameNumber - 1}),scale=${config.desktop.width}:${config.desktop.height}`,
      '-vframes', '1',
      '-c:v', 'libwebp',
      '-quality', String(config.posterQuality),
      posterPath,
    ]);
  }
  console.log(`-> Generated poster at: ${posterPath}`);

  // Compute metrics
  let totalDesktopBytes = 0;
  for (const f of desktopFrames) {
    totalDesktopBytes += fs.statSync(path.join(desktopDir, f)).size;
  }
  const avgDesktopKb = (totalDesktopBytes / desktopFrames.length / 1024).toFixed(2);
  const totalDesktopMb = (totalDesktopBytes / 1024 / 1024).toFixed(2);

  let totalMobileBytes = 0;
  for (const f of mobileFrames) {
    totalMobileBytes += fs.statSync(path.join(mobileDir, f)).size;
  }
  const avgMobileKb = (totalMobileBytes / mobileFrames.length / 1024).toFixed(2);
  const totalMobileMb = (totalMobileBytes / 1024 / 1024).toFixed(2);

  // Write manifest.json
  const manifest = {
    id: config.id,
    name: config.name,
    aspectRatio: config.aspectRatio,
    generatedAt: new Date().toISOString(),
    desktop: {
      frameCount: desktopFrames.length,
      fps: config.desktop.fps,
      width: config.desktop.width,
      height: config.desktop.height,
      pattern: '%04d.webp',
      sampleFile: desktopFrames[0],
      totalBytes: totalDesktopBytes,
      totalMb: Number(totalDesktopMb),
      avgKbPerFrame: Number(avgDesktopKb),
    },
    mobile: {
      frameCount: mobileFrames.length,
      fps: config.mobile.fps,
      width: config.mobile.width,
      height: config.mobile.height,
      subDir: 'mobile',
      pattern: 'mobile/%04d.webp',
      sampleFile: mobileFrames[0],
      totalBytes: totalMobileBytes,
      totalMb: Number(totalMobileMb),
      avgKbPerFrame: Number(avgMobileKb),
    },
    poster: 'poster.webp',
  };

  const manifestPath = path.join(desktopDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`-> Created sequence manifest at: ${manifestPath}`);

  // Summary Table
  console.log('\n================ SEQUENCE METRICS ================');
  console.table({
    Desktop: {
      Frames: desktopFrames.length,
      Resolution: `${config.desktop.width}x${config.desktop.height}`,
      TotalSize: `${totalDesktopMb} MB`,
      AvgFrame: `${avgDesktopKb} KB`,
      Format: 'WebP (Lossy q' + config.desktop.quality + ')',
    },
    Mobile: {
      Frames: mobileFrames.length,
      Resolution: `${config.mobile.width}x${config.mobile.height}`,
      TotalSize: `${totalMobileMb} MB`,
      AvgFrame: `${avgMobileKb} KB`,
      Format: 'WebP (Lossy q' + config.mobile.quality + ')',
    },
  });
  console.log('==================================================\n');

  return manifest;
}

// CLI Execution
const args = process.argv.slice(2);
const target = args[0] || 'a01';

if (target === '--all') {
  console.log('[PIPELINE] Processing all sequences...');
  for (const key of Object.keys(SEQUENCE_DEFINITIONS)) {
    processSequence(key);
  }
} else {
  const cleanKey = target.replace(/^--sequence=|^--sequence\s+|^--/, '').toLowerCase();
  processSequence(cleanKey);
}
