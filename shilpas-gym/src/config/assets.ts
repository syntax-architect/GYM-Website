export interface PulseformAsset {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  category: 'hero' | 'momentum' | 'sculpture' | 'training' | 'coaching' | 'community' | 'portal';
  type: 'image' | 'video' | 'sequence';
  src: string;
  poster?: string;
  alt: string;
  aspectRatio: string;
  description?: string;
}

export const PULSEFORM_ASSETS: Record<string, PulseformAsset> = {
  // Hero Stills & Videos
  I01: {
    id: 'I01',
    name: 'Desktop Hero Keyframe',
    title: 'Sculptural Training Object',
    subtitle: 'Persimmon & Periwinkle Dual Powder-Coated Metal',
    category: 'hero',
    type: 'image',
    src: '/assets/images/i01-hero-still.webp',
    alt: 'PULSEFORM sculptural dumbbell hovering above mineral-white studio plinth',
    aspectRatio: '16/9',
  },
  V01: {
    id: 'V01',
    name: 'Desktop Hero Loop',
    title: 'Atmospheric Object Drift',
    subtitle: '12-degree yaw rotation with broad softbox reflections',
    category: 'hero',
    type: 'video',
    src: '/assets/videos/v01-hero-loop.mp4',
    poster: '/assets/images/i01-hero-still.webp',
    alt: 'Ambient looping video of sculptural dumbbell floating in mineral cyclorama',
    aspectRatio: '16/9',
  },
  V02: {
    id: 'V02',
    name: 'Mobile Hero Loop',
    title: 'Vertical Object Drift',
    subtitle: 'Vertical composition tuned for phone viewports',
    category: 'hero',
    type: 'video',
    src: '/assets/videos/v02-mobile-hero.mp4',
    poster: '/assets/images/i01-hero-still.webp',
    alt: 'Vertical mobile loop of sculptural dumbbell',
    aspectRatio: '9/16',
  },

  // Momentum Film
  V03: {
    id: 'V03',
    name: 'Momentum Training Film',
    title: 'Momentum is Engineered',
    subtitle: 'Close side tracking shot of barbell chalking and grip under daylight',
    category: 'momentum',
    type: 'video',
    src: '/assets/videos/v03-momentum.mp4',
    poster: '/assets/images/i04-strength-still.webp',
    alt: 'Athlete chalking hands and securely gripping barbell in sunlit mineral studio',
    aspectRatio: '16/9',
  },

  // Signature 3D Sequence
  V04: {
    id: 'V04',
    name: '3D Signature Scroll Sequence',
    title: 'Sculptural Turntable Move',
    subtitle: 'Continuous camera orbit revealing grip and dual chamfered heads',
    category: 'sculpture',
    type: 'sequence',
    src: '/assets/sequences/v04-sculpture',
    poster: '/assets/sequences/v04-sculpture/poster.webp',
    alt: 'Camera orbit around the custom persimmon and periwinkle dumbbell sculpture',
    aspectRatio: '16/9',
  },

  // Training Modes (I04-I07 & V05-V07)
  I04: {
    id: 'I04',
    name: 'Training Mode: Strength',
    title: 'Structural Strength',
    subtitle: 'Biomechanical loading, compound progression, calibrated plates',
    category: 'training',
    type: 'image',
    src: '/assets/images/i04-strength-still.webp',
    alt: 'Athlete loading calibrated powder-coated plate onto barbell',
    aspectRatio: '4/5',
  },
  V06: {
    id: 'V06',
    name: 'Strength Detail Loop',
    title: 'Plate Loading Precision',
    subtitle: 'Macro barbell loading loop',
    category: 'training',
    type: 'video',
    src: '/assets/videos/v06-strength.mp4',
    poster: '/assets/images/i04-strength-still.webp',
    alt: 'Close-up video of plate loading',
    aspectRatio: '9/16',
  },
  I05: {
    id: 'I05',
    name: 'Training Mode: Conditioning',
    title: 'Kinetic Conditioning',
    subtitle: 'High-output energy system development & rhythmic wave frequency',
    category: 'training',
    type: 'image',
    src: '/assets/images/i05-conditioning-still.webp',
    alt: 'Athlete executing high-amplitude battle-rope wave in bright training studio',
    aspectRatio: '4/5',
  },
  V05: {
    id: 'V05',
    name: 'Conditioning Wave Loop',
    title: 'Battle-Rope Frequency',
    subtitle: 'Rhythmic wave loop in front of periwinkle wall panel',
    category: 'training',
    type: 'video',
    src: '/assets/videos/v05-conditioning.mp4',
    poster: '/assets/images/i05-conditioning-still.webp',
    alt: 'Controlled battle-rope wave in studio',
    aspectRatio: '9/16',
  },
  I06: {
    id: 'I06',
    name: 'Training Mode: Mobility',
    title: 'Structural Mobility',
    subtitle: 'Joint integrity, end-range stabilization, functional kinetic chain',
    category: 'training',
    type: 'image',
    src: '/assets/images/i06-mobility-still.webp',
    alt: 'Athlete performing deep lunge mobility drill on cloud-blue mat',
    aspectRatio: '4/5',
  },
  V07: {
    id: 'V07',
    name: 'Mobility Flow Loop',
    title: 'Hip-Flexor & Lunge Flow',
    subtitle: 'Gentle lateral drift and calm breathing cadence',
    category: 'training',
    type: 'video',
    src: '/assets/videos/v07-mobility.mp4',
    poster: '/assets/images/i06-mobility-still.webp',
    alt: 'Controlled mobility stretch',
    aspectRatio: '9/16',
  },
  I07: {
    id: 'I07',
    name: 'Training Mode: Personal Coaching',
    title: 'Precision Coaching',
    subtitle: 'Direct kinetic correction, load management, individualized protocols',
    category: 'training',
    type: 'image',
    src: '/assets/images/i07-coaching-still.webp',
    alt: 'Coach guiding adult athlete through setup cue beside a rack',
    aspectRatio: '4/5',
  },

  // Coaches & Atmosphere
  I08: {
    id: 'I08',
    name: 'Head Coach Portrait',
    title: 'Julian Mercer',
    subtitle: 'Head of Biomechanics & Human Performance',
    category: 'coaching',
    type: 'image',
    src: '/assets/images/i08-coach-portrait.webp',
    alt: 'Head Coach Julian Mercer in botanical green technical apparel',
    aspectRatio: '3/4',
  },
  I09: {
    id: 'I09',
    name: 'Material Macro: Plate Edge',
    title: 'Tactile Manufacturing',
    subtitle: 'Powder-coated persimmon plate with realistic chamfered edge',
    category: 'training',
    type: 'image',
    src: '/assets/images/i09-macro-plate.webp',
    alt: 'Extreme macro product photograph of powder-coated persimmon training plate',
    aspectRatio: '1/1',
  },
  I10: {
    id: 'I10',
    name: 'Community Studio Wide',
    title: 'The Mineral Studio',
    subtitle: 'Architectural daylight, expansive training bays, botanical details',
    category: 'community',
    type: 'image',
    src: '/assets/images/i10-community-wide.webp',
    alt: 'Small-group training session in bright mineral-white studio architecture',
    aspectRatio: '16/9',
  },
  V10: {
    id: 'V10',
    name: 'Studio Atmosphere Loop',
    title: 'Continuous Studio Motion',
    subtitle: 'Steady lateral dolly through the open training floor',
    category: 'community',
    type: 'video',
    src: '/assets/videos/v10-community.mp4',
    poster: '/assets/images/i10-community-wide.webp',
    alt: 'Wide lateral camera move through bright fitness studio',
    aspectRatio: '16/9',
  },

  // Closing Portal
  I11: {
    id: 'I11',
    name: 'Closing Portal Still',
    title: 'Architectural Portal',
    subtitle: 'Oversized persimmon and periwinkle curved forms',
    category: 'portal',
    type: 'image',
    src: '/assets/images/i11-portal-still.webp',
    alt: 'Sculptural architectural doorway into training space',
    aspectRatio: '16/9',
  },
  V09: {
    id: 'V09',
    name: 'Closing Portal Camera Push',
    title: 'The Threshold',
    subtitle: 'Slow camera push into bright mineral-white studio beyond',
    category: 'portal',
    type: 'video',
    src: '/assets/videos/v09-portal.mp4',
    poster: '/assets/images/i11-portal-still.webp',
    alt: 'Camera push through sculptural persimmon and periwinkle portal',
    aspectRatio: '16/9',
  },
};

export const getPulseformAsset = (id: string): PulseformAsset => {
  const asset = PULSEFORM_ASSETS[id];
  if (!asset) {
    throw new Error(`Asset ${id} not found in PULSEFORM_ASSETS`);
  }
  return asset;
};

export type VisualAsset = PulseformAsset;
export const getAsset = getPulseformAsset;


