const fs = require('fs');
const path = require('path');

const srcImages = path.join(__dirname, 'Images');
const srcMobile = path.join(__dirname, 'mobile jpg/Neon_laser_sweeps_metal_scales_20260924212647_frames');
const srcDesktop = path.join(__dirname, 'web jpg/Black_metallic_wave_with_light_20260924212403_frames');

const destAssets = path.join(__dirname, 'shilpas-gym/public/assets');
const destMobile = path.join(__dirname, 'shilpas-gym/public/frames/mobile');
const destDesktop = path.join(__dirname, 'shilpas-gym/public/frames/desktop');

fs.mkdirSync(destAssets, { recursive: true });
fs.mkdirSync(destMobile, { recursive: true });
fs.mkdirSync(destDesktop, { recursive: true });

// Move images
fs.readdirSync(srcImages).forEach(file => {
    let destFile = file;
    if (file.endsWith('.jpg.jpeg')) {
        destFile = file.replace('.jpg.jpeg', '.jpg');
    }
    fs.copyFileSync(path.join(srcImages, file), path.join(destAssets, destFile));
});

// Move and rename mobile frames
fs.readdirSync(srcMobile).forEach(file => {
    const match = file.match(/frame_(\d+)\.jpg/);
    if (match) {
        const num = match[1].padStart(4, '0');
        fs.copyFileSync(path.join(srcMobile, file), path.join(destMobile, `frame_${num}.jpg`));
    }
});

// Move and rename desktop frames
fs.readdirSync(srcDesktop).forEach(file => {
    const match = file.match(/frame_(\d+)\.jpg/);
    if (match) {
        const num = match[1].padStart(4, '0');
        fs.copyFileSync(path.join(srcDesktop, file), path.join(destDesktop, `frame_${num}.jpg`));
    }
});

console.log('Assets organized successfully.');
