import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const workspaceRoot = path.resolve(projectRoot, '..');
const sourceAssetsDir = path.join(workspaceRoot, 'Images and videos');

console.log('[PULSEFORM ASSET PROCESSOR]');
console.log('Source Directory:', sourceAssetsDir);
console.log('Target Project:', projectRoot);

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
      // ignore
    }
  }
  throw new Error('FFmpeg not found.');
}

const FFMPEG = getFfmpegPath();
console.log('Using FFmpeg at:', FFMPEG);

// Destination dirs
const destImgDir = path.join(projectRoot, 'public/assets/images');
const destVidDir = path.join(projectRoot, 'public/assets/videos');
const destSeqDir = path.join(projectRoot, 'public/assets/sequences');
const destAudioDir = path.join(projectRoot, 'public/assets/audio');

[destImgDir, destVidDir, destSeqDir, destAudioDir].forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

// 1. Identify source files
const files = fs.readdirSync(sourceAssetsDir);

const fileMap = {
  // Stills
  i01_hero_still: files.find(f => f.startsWith('Sculptural_dumbbell_on_white_bac') && f.endsWith('.jpg')),
  i05_conditioning_still: files.find(f => f.startsWith('Athlete_performing_battle-rope_wave') && f.endsWith('.jpg')),
  i06_mobility_still: files.find(f => f.startsWith('Athlete_performing_deep_lunge_mo') && f.endsWith('.jpg')),
  i07_coaching_still: files.find(f => f.startsWith('Coach_guiding_adult_athlete') && f.endsWith('.jpg')),
  i08_coach_portrait: files.find(f => f.startsWith('Coach_portrait_in_training_studio') && f.endsWith('.jpg')),
  i09_macro_plate: files.find(f => f.startsWith('Macro_product_photograph_of_trai') && f.endsWith('.jpg')),
  i10_community_wide: files.find(f => f.startsWith('Adults_training_in_fitness_studio') && f.endsWith('.jpg')),
  i11_portal_still: files.find(f => f.startsWith('Architectural_portal_in_studio') && f.endsWith('.jpg')),

  // Videos
  v01_hero_loop: files.find(f => f.startsWith('Dumbbell_hovering_above_white_pl') && f.endsWith('.mp4')),
  v02_mobile_hero: files.find(f => f.startsWith('Mobile_hero_loop_vertical') && f.endsWith('.mp4')),
  v03_momentum: files.find(f => f.startsWith('Athlete_gripping_barbell_in_studio') && f.endsWith('.mp4')),
  v04_sculpture_move: files.find(f => f.startsWith('Camera_move_around_sculptural_du') && f.endsWith('.mp4')),
  v05_conditioning: files.find(f => f.startsWith('Athlete_performing_battle-rope_wave') && f.endsWith('.mp4') && f.includes('175939')),
  v06_strength: files.find(f => f.startsWith('Athlete_loading_barbell_plate') && f.endsWith('.mp4')),
  v07_mobility: files.find(f => f.startsWith('Athlete_performing_mobility_stretch') && f.endsWith('.mp4')),
  v08_transition: files.find(f => f.startsWith('Resin_ribbon_sweeping_white_surface') && f.endsWith('.mp4')),
  v09_portal: files.find(f => f.startsWith('Camera_push_through_architectura') && f.endsWith('.mp4')),
  v10_community: files.find(f => f.startsWith('Group_exercising_in_fitness_studio') && f.endsWith('.mp4')),
};

console.log('Identified files:', fileMap);

// 2. Convert JPG to WebP and copy
for (const [key, filename] of Object.entries(fileMap)) {
  if (!filename || !filename.endsWith('.jpg')) continue;
  const srcPath = path.join(sourceAssetsDir, filename);
  const outWebpName = `${key.replace(/_/g, '-')}.webp`;
  const outWebpPath = path.join(destImgDir, outWebpName);
  const outJpgName = `${key.replace(/_/g, '-')}.jpg`;
  const outJpgPath = path.join(destImgDir, outJpgName);

  // Copy original jpg
  fs.copyFileSync(srcPath, outJpgPath);

  // Convert to WebP using ffmpeg
  console.log(`Converting ${filename} -> ${outWebpName}`);
  execFileSync(FFMPEG, [
    '-y',
    '-i', srcPath,
    '-c:v', 'libwebp',
    '-quality', '86',
    outWebpPath
  ], { stdio: 'ignore' });
}

// Extract I04 Strength Still from V06 or V03
if (fileMap.v06_strength) {
  const v06Path = path.join(sourceAssetsDir, fileMap.v06_strength);
  const outWebp = path.join(destImgDir, 'i04-strength-still.webp');
  const outJpg = path.join(destImgDir, 'i04-strength-still.jpg');
  console.log('Extracting I04 Strength still from V06 video...');
  execFileSync(FFMPEG, [
    '-y',
    '-ss', '00:00:01.500',
    '-i', v06Path,
    '-vframes', '1',
    '-c:v', 'libwebp',
    '-quality', '88',
    outWebp
  ], { stdio: 'ignore' });
  execFileSync(FFMPEG, [
    '-y',
    '-ss', '00:00:01.500',
    '-i', v06Path,
    '-vframes', '1',
    outJpg
  ], { stdio: 'ignore' });
}

// 3. Copy MP4 videos with clean naming
const videoMappings = [
  { key: 'v01_hero_loop', dest: 'v01-hero-loop.mp4' },
  { key: 'v02_mobile_hero', dest: 'v02-mobile-hero.mp4' },
  { key: 'v03_momentum', dest: 'v03-momentum.mp4' },
  { key: 'v04_sculpture_move', dest: 'v04-sculpture-move.mp4' },
  { key: 'v05_conditioning', dest: 'v05-conditioning.mp5'.replace('.mp5', '.mp4') },
  { key: 'v06_strength', dest: 'v06-strength.mp4' },
  { key: 'v07_mobility', dest: 'v07-mobility.mp4' },
  { key: 'v08_transition', dest: 'v08-transition.mp4' },
  { key: 'v09_portal', dest: 'v09-portal.mp4' },
  { key: 'v10_community', dest: 'v10-community.mp4' },
];

for (const mapping of videoMappings) {
  const file = fileMap[mapping.key];
  if (!file) continue;
  const src = path.join(sourceAssetsDir, file);
  const dest = path.join(destVidDir, mapping.dest);
  console.log(`Copying video ${mapping.key} -> ${mapping.dest}`);
  fs.copyFileSync(src, dest);
}

// 4. Extract Audio
if (fileMap.v10_community) {
  console.log('Extracting ambient audio from V10...');
  const v10Path = path.join(sourceAssetsDir, fileMap.v10_community);
  const audioOut = path.join(destAudioDir, 'pulseform-ambient.mp3');
  try {
    execFileSync(FFMPEG, [
      '-y',
      '-i', v10Path,
      '-vn',
      '-acodec', 'libmp3lame',
      '-q:a', '2',
      audioOut
    ], { stdio: 'ignore' });
    console.log('-> Audio extracted to pulseform-ambient.mp3');
  } catch (err) {
    console.warn('Audio extract note:', err.message);
  }
}

if (fileMap.v03_momentum) {
  console.log('Extracting kinetic audio from V03...');
  const v03Path = path.join(sourceAssetsDir, fileMap.v03_momentum);
  const audioOut = path.join(destAudioDir, 'pulseform-kinetic.mp3');
  try {
    execFileSync(FFMPEG, [
      '-y',
      '-i', v03Path,
      '-vn',
      '-acodec', 'libmp3lame',
      '-q:a', '2',
      audioOut
    ], { stdio: 'ignore' });
    console.log('-> Audio extracted to pulseform-kinetic.mp3');
  } catch (err) {
    console.warn('Audio extract note:', err.message);
  }
}

// 5. Extract Scroll Sequence from V04 (Sculpture Dumbbell Move)
console.log('\n[EXTRACTING SCROLL SEQUENCE V04 SCULPTURAL DUMBBELL]');
const v04Src = fileMap.v04_sculpture_move ? path.join(sourceAssetsDir, fileMap.v04_sculpture_move) : null;
if (v04Src) {
  const seqDir = path.join(destSeqDir, 'v04-sculpture');
  const mobSeqDir = path.join(seqDir, 'mobile');
  fs.mkdirSync(seqDir, { recursive: true });
  fs.mkdirSync(mobSeqDir, { recursive: true });

  // Clean old frames
  fs.readdirSync(seqDir).filter(f => /^\d{4}\.webp$/.test(f)).forEach(f => fs.unlinkSync(path.join(seqDir, f)));
  fs.readdirSync(mobSeqDir).filter(f => /^\d{4}\.webp$/.test(f)).forEach(f => fs.unlinkSync(path.join(mobSeqDir, f)));

  // Desktop sequence: 24 fps, 960x540 (lightweight & crisp), quality 80
  console.log('Extracting Desktop sequence frames...');
  execFileSync(FFMPEG, [
    '-y',
    '-i', v04Src,
    '-vf', 'fps=24,scale=960:540:flags=lanczos',
    '-c:v', 'libwebp',
    '-quality', '78',
    '-compression_level', '5',
    path.join(seqDir, '%04d.webp')
  ], { stdio: 'inherit' });

  // Mobile sequence: 12 fps, 640x360, quality 72
  console.log('Extracting Mobile sequence frames...');
  execFileSync(FFMPEG, [
    '-y',
    '-i', v04Src,
    '-vf', 'fps=12,scale=640:360:flags=lanczos',
    '-c:v', 'libwebp',
    '-quality', '72',
    '-compression_level', '5',
    path.join(mobSeqDir, '%04d.webp')
  ], { stdio: 'inherit' });

  // Poster
  const posterPath = path.join(seqDir, 'poster.webp');
  const firstFrame = path.join(seqDir, '0001.webp');
  if (fs.existsSync(firstFrame)) {
    fs.copyFileSync(firstFrame, posterPath);
  }

  const deskFrames = fs.readdirSync(seqDir).filter(f => /^\d{4}\.webp$/.test(f)).sort();
  const mobFrames = fs.readdirSync(mobSeqDir).filter(f => /^\d{4}\.webp$/.test(f)).sort();

  const manifest = {
    id: 'v04-sculpture',
    name: 'PULSEFORM 3D Signature Sculptural Dumbbell Sequence',
    aspectRatio: '16:9',
    generatedAt: new Date().toISOString(),
    desktop: {
      frameCount: deskFrames.length,
      fps: 24,
      width: 960,
      height: 540,
      pattern: '%04d.webp',
      sampleFile: deskFrames[0],
    },
    mobile: {
      frameCount: mobFrames.length,
      fps: 12,
      width: 640,
      height: 360,
      subDir: 'mobile',
      pattern: 'mobile/%04d.webp',
      sampleFile: mobFrames[0],
    },
    poster: 'poster.webp',
  };

  fs.writeFileSync(path.join(seqDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`Generated sequence with ${deskFrames.length} desktop frames, ${mobFrames.length} mobile frames.`);
}

console.log('\nAll assets successfully processed and configured for PULSEFORM!');
