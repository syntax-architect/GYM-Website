import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  supabase,
  isSupabaseConfigured,
  uploadToSupabaseStorage,
} from '../lib/supabase';

// ==============================================================================
// TYPE DEFINITIONS
// ==============================================================================

export interface BrandSettings {
  gymName: string;
  tagline: string;
  locationShort: string;
  fullAddress: string;
  plusCode: string;
  phone: string;
  whatsapp: string;
  hours: string;
  googleRating: number;
  reviewCount: number;
  primaryColor: string;
  secondaryColor: string;
  canvasColor: string;
  darkColor: string;
  heroLoopVideoUrl: string;
  momentumVideoUrl: string;
  portalVideoUrl: string;
  liveOccupancyOverride: number | null;
}

export interface DisciplineItem {
  id: string;
  number: string;
  badge: string;
  title: string;
  serifTitle: string;
  subtitle: string;
  description: string;
  image: string;
  video?: string;
  specs: { label: string; value: string }[];
  ctaText: string;
  planName: string;
}

export interface TrainerMember {
  id: string;
  number: string;
  positionCode: string;
  name: string;
  role: string;
  specialtyTag: string;
  experience: string;
  image: string;
  quote: string;
  accentColor: string;
  stats: {
    label: string;
    value: number;
  }[];
}

export interface TransformationCase {
  id: 'fitness' | 'salon' | 'bridal';
  tabLabel: string;
  tag: string;
  title: string;
  serifTitle: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  metrics: { value: string; label: string }[];
  quote: string;
  author: string;
  planName: string;
}

export interface MembershipTier {
  id: string;
  code: string;
  badge: string;
  name: string;
  serifName: string;
  monthlyPrice: string;
  annualPrice: string;
  subtitle: string;
  featured: boolean;
  features: string[];
  cta: string;
}

export interface TimetableSlot {
  id: string;
  day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN' | 'ALL';
  time: string;
  duration: string;
  title: string;
  coach: string;
  zone: string;
  slotsLeft: number;
  category: 'strength' | 'cardio' | 'keratin' | 'bridal';
}

export interface GalleryStreamItem {
  src: string;
  alt: string;
  category: 'gym' | 'salon';
}

export interface LeadInquiry {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  selectedTrack?: string;
  timeWindow?: string;
  notes?: string;
  status: 'NEW' | 'CONTACTED' | 'TRIAL_BOOKED' | 'CONVERTED';
}

export interface HourlyTelemetry {
  hour: string;
  timeLabel: string;
  density: number;
  status: 'QUIET' | 'MODERATE' | 'PRIME' | 'PEAK';
  note: string;
}

// ==============================================================================
// INITIAL FACTORY DEFAULTS (Shilpa's Gym & Beauty Salon)
// ==============================================================================

export const DEFAULT_BRAND_SETTINGS: BrandSettings = {
  gymName: "SHILPA'S GYM & BEAUTY SALON",
  tagline: 'WHERE STRENGTH MEETS GLAMOUR',
  locationShort: 'RAHARA · KHARDAHA · KOLKATA',
  fullAddress: 'Naskarhat Madhya Para, Halder Bagan, Rahara, Khardaha, Kolkata 700118',
  plusCode: 'P9FM+4V RAHARA · KHARDAHA',
  phone: '074397 61994',
  whatsapp: '917439761994',
  hours: '06:00 AM – 10:00 PM DAILY',
  googleRating: 4.7,
  reviewCount: 355,
  primaryColor: '#D9381E', // Infrared Crimson
  secondaryColor: '#C5A059', // Brushed Champagne Gold
  canvasColor: '#F4F1EA', // Warm Alabaster
  darkColor: '#0D0D0E', // Obsidian Carbon
  heroLoopVideoUrl: '/assets/videos/v01-hero-loop.mp4',
  momentumVideoUrl: '/assets/videos/v03-momentum.mp4',
  portalVideoUrl: '/assets/videos/v09-portal.mp4',
  liveOccupancyOverride: null,
};

export const DEFAULT_DISCIPLINES: DisciplineItem[] = [
  {
    id: 'strength',
    number: '#1',
    badge: 'GYM FLOOR',
    title: 'UNISEX STRENGTH &',
    serifTitle: 'Calibrated Iron.',
    subtitle: 'Calibrated Machinery & Free Weights',
    description:
      'Biomechanical selectorized stations, Olympic squat racks, dumbbells, and cable systems engineered for safe muscular hypertrophy and joint alignment.',
    image: '/assets/images/i09-macro-plate.webp',
    video: '/assets/videos/v06-strength.mp4',
    specs: [
      { label: 'MACHINERY', value: 'Imported Biomechanical' },
      { label: 'ATMOSPHERE', value: 'Air-Conditioned Unisex' },
      { label: 'SUPERVISION', value: 'On-Floor Form Coaching' },
    ],
    ctaText: 'RESERVE GYM FLOOR PASS',
    planName: 'Unisex Gym Access (₹1,499/mo)',
  },
  {
    id: 'coaching',
    number: '#2',
    badge: '1-ON-1 COACHING',
    title: 'FAT LOSS & PERSONAL',
    serifTitle: 'Transformation.',
    subtitle: 'Targeted Weight Loss & Custom Nutrition',
    description:
      'Dedicated 1-on-1 personal training with certified male and female coaches. Structured metabolic conditioning, battle-rope intervals, and custom high-protein Indian meal blueprints.',
    image: '/assets/images/i05-conditioning-still.webp',
    video: '/assets/videos/v05-conditioning.mp4',
    specs: [
      { label: 'TRAINERS', value: 'Male & Female Certified' },
      { label: 'FOCUS', value: 'Hypertrophy & Fat Loss' },
      { label: 'NUTRITION', value: 'Custom Macro Blueprint' },
    ],
    ctaText: 'INQUIRE ABOUT 1-ON-1 COACHING',
    planName: 'PT Transformation (₹3,499/mo)',
  },
  {
    id: 'keratin',
    number: '#3',
    badge: 'PRIVATE SALON',
    title: 'KERATIN & HAIR SPA',
    serifTitle: 'Sanctuary.',
    subtitle: 'Hair Smoothing & Restorative Care',
    description:
      'Formaldehyde-free keratin smoothing, deep hair botox, protein spa, and restorative scalp therapies administered by senior salon technicians in a private suite.',
    image: '/assets/showcase/shilpas_salon_hair_spa.jpg',
    specs: [
      { label: 'FORMULA', value: 'Formaldehyde-Free Botox & Keratin' },
      { label: 'PRIVACY', value: 'Dedicated Salon Suite' },
      { label: 'OUTCOME', value: 'Silky Shine & Zero Frizz' },
    ],
    ctaText: 'BOOK KERATIN & HAIR SPA',
    planName: 'Keratin & Hair Spa Lounge',
  },
  {
    id: 'bridal',
    number: '#4',
    badge: 'BEAUTY STUDIO',
    title: 'BRIDAL & MAKEUP',
    serifTitle: 'Artistry.',
    subtitle: 'HD Celebration Glamour & Skin Grooming',
    description:
      'High-definition waterproof bridal artistry, reception styling, skin brightening facials, and unisex grooming crafted by founder Shilpa Roy and master aestheticians.',
    image: '/assets/showcase/shilpas_salon_glamour.jpg',
    specs: [
      { label: 'ARTISTRY', value: 'HD & Airbrush Bridal' },
      { label: 'CLIENTELE', value: 'Unisex Parlour & Skin Care' },
      { label: 'STANDARDS', value: 'Dermatologist Tested' },
    ],
    ctaText: 'BOOK BRIDAL / BEAUTY CONSULTATION',
    planName: 'Bridal & Makeup Studio Consultation',
  },
];

export const DEFAULT_TRAINERS: TrainerMember[] = [
  {
    id: 'rajesh-sen',
    number: '01',
    positionCode: 'HC',
    name: 'COACH RAJESH SEN',
    role: 'HEAD BIOMECHANICS & STRENGTH',
    specialtyTag: 'BIOMECHANICS & CALIBRATED RACKS',
    experience: '8+ Years Experience',
    image: '/assets/images/i08-coach-portrait.webp',
    quote:
      'Calibrated form over ego. We guide every member on precision posture, joint safety, and progressive overload.',
    accentColor: '#D9381E',
    stats: [
      { label: 'BIOMECHANICS', value: 99 },
      { label: 'STRENGTH PROGRAMMING', value: 97 },
      { label: 'JOINT REHAB & SAFETY', value: 96 },
    ],
  },
  {
    id: 'priya-mukherjee',
    number: '02',
    positionCode: 'SF',
    name: 'COACH PRIYA MUKHERJEE',
    role: 'SENIOR WOMEN’S FITNESS & POSTURE',
    specialtyTag: 'PROGRESSIVE OVERLOAD & NUTRITION',
    experience: '6+ Years Experience',
    image: '/assets/images/i07-coaching-still.webp',
    quote:
      'A welcoming, supportive environment where everyone feels confident lifting weights and hitting their target body composition.',
    accentColor: '#D9381E',
    stats: [
      { label: 'BODY RECOMPOSITION', value: 98 },
      { label: 'POSTURE ALIGNMENT', value: 97 },
      { label: 'CUSTOM MACRO DESIGN', value: 95 },
    ],
  },
  {
    id: 'shilpa-roy',
    number: '03',
    positionCode: 'MA',
    name: 'SHILPA ROY',
    role: 'FOUNDER & MASTER AESTHETICIAN',
    specialtyTag: 'HD BRIDAL MAKEOVERS & STYLING',
    experience: '10+ Years Experience',
    image: '/assets/showcase/shilpas_salon_glamour.jpg',
    quote:
      'Strength on the training floor paired with rejuvenating salon care. Total physical wellness and self-confidence under one roof.',
    accentColor: '#C5A059',
    stats: [
      { label: 'HD BRIDAL ARTISTRY', value: 99 },
      { label: 'SKIN LUMINESCENCE', value: 98 },
      { label: 'STUDIO DIRECTION', value: 99 },
    ],
  },
  {
    id: 'tania-roy',
    number: '04',
    positionCode: 'KS',
    name: 'TANIA ROY',
    role: 'SENIOR HAIR SPA & KERATIN SPECIALIST',
    specialtyTag: 'FORMALDEHYDE-FREE HAIR BOTOX & SPA',
    experience: '7+ Years Experience',
    image: '/assets/showcase/shilpas_salon_hair_spa.jpg',
    quote:
      'Premium treatments, hygienic suites, and restorative self-care designed to revitalize you after intense workouts.',
    accentColor: '#C5A059',
    stats: [
      { label: 'KERATIN SMOOTHING', value: 99 },
      { label: 'PROTEIN HAIR BOTOX', value: 97 },
      { label: 'FRIZZ ELIMINATION', value: 98 },
    ],
  },
];

export const DEFAULT_TRANSFORMATIONS: Record<'fitness' | 'salon' | 'bridal', TransformationCase> = {
  fitness: {
    id: 'fitness',
    tabLabel: 'FITNESS',
    tag: '16-WEEK BIOMECHANICAL HYPERTROPHY',
    title: 'LEAN ATHLETIC RECOMPOSITION &',
    serifTitle: 'Core Power.',
    description:
      'Structured progressive overload on plate-loaded machinery combined with caloric deficit and dedicated posture realignment under Shilpa’s head floor coach.',
    beforeLabel: 'WEEK 0 · BASELINE FORM',
    afterLabel: 'WEEK 16 · CALIBRATED POWER',
    beforeImage: '/assets/images/i10-community-wide.webp',
    afterImage: '/assets/images/i05-conditioning-still.webp',
    metrics: [
      { value: '-12.8 kg', label: 'Body Fat Reduction' },
      { value: '+4.2 kg', label: 'Lean Mass Gained' },
      { value: '+45 kg', label: 'Squat 1RM Increase' },
    ],
    quote:
      'The trainers here don’t let you ego-lift. Every movement was corrected down to joint angles. Best gym in North 24 Parganas.',
    author: 'Subhadip Banerjee · Verified Member (Rahara, Khardaha)',
    planName: 'PT Transformation (₹3,499/mo)',
  },
  salon: {
    id: 'salon',
    tabLabel: 'SALON & SPA',
    tag: 'SINGLE-SESSION LUXURY HAIR THERAPY',
    title: 'MIRROR-GLOSS KERATIN SMOOTHING &',
    serifTitle: 'Hair Spa.',
    description:
      'Transformative zero-formaldehyde keratin infusion restoring damaged cuticles with deep botanical moisture bath in our private luxury salon wing.',
    beforeLabel: 'BEFORE · DAMAGED CUTICLES',
    afterLabel: 'AFTER · MIRROR KERATIN SHEEN',
    beforeImage: '/assets/images/i06-mobility-still.webp',
    afterImage: '/assets/showcase/shilpas_salon_hair_spa.jpg',
    metrics: [
      { value: '100%', label: 'Frizz Reduction' },
      { value: '5+ Months', label: 'Silk Longevity' },
      { value: '2.5 Hours', label: 'Suite Treatment' },
    ],
    quote:
      'Completely separated from the gym noise. Hygienic, cool AC, and the keratin results are smoother than high-end South Kolkata salons.',
    author: 'Ananya Mukherjee · Verified Member (Khardaha Railway Station Rd)',
    planName: 'Keratin & Hair Spa Suite',
  },
  bridal: {
    id: 'bridal',
    tabLabel: 'BRIDAL',
    tag: 'FULL BRIDAL HD ARTISTRY PACKAGE',
    title: 'SIGNATURE BENGALI HD BRIDAL',
    serifTitle: 'Makeover.',
    description:
      'Waterproof HD airbrush base, traditional Chandan artistry, sculpted eye contouring, and bridal hair styling with fresh floral jasmine setting.',
    beforeLabel: 'PRE-PREP SESSION',
    afterLabel: 'FINAL HD BRIDAL REVEAL',
    beforeImage: '/assets/library/A03_philosophy_recovery.jpeg',
    afterImage: '/assets/showcase/shilpas_salon_glamour.jpg',
    metrics: [
      { value: '18h Wear', label: 'Humidity Proof' },
      { value: 'Flawless HD', label: '4K Camera Finish' },
      { value: 'Included', label: 'Trial Consultation' },
    ],
    quote:
      'Shilpa did my bridal makeover personally. Not a crease or smudge throughout the entire wedding night. 10/10.',
    author: 'Priyanka Sen · Verified Member (Sodepur, Kolkata)',
    planName: 'Bridal & HD Makeup Consultation',
  },
};

export const DEFAULT_MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'gym-access',
    code: 'PASS // 01',
    badge: '06:00 AM – 10:00 PM DAILY',
    name: 'UNISEX GYM',
    serifName: 'Access.',
    monthlyPrice: '1,499',
    annualPrice: '1,199',
    subtitle: 'Unlimited floor access to imported machinery & free weights.',
    featured: false,
    features: [
      'Full access to air-conditioned unisex fitness floor',
      'Imported biomechanical selectorized & cable stations',
      'Olympic free-weight and power rack lifting zones',
      'Locker room, clean showers & hygienic changing suites',
      'General floor trainer guidance for proper form',
    ],
    cta: 'SELECT UNISEX GYM ACCESS',
  },
  {
    id: 'pt-transformation',
    code: 'PASS // 02',
    badge: 'RESERVED PRIORITY HOURS',
    name: 'PT',
    serifName: 'Transformation.',
    monthlyPrice: '3,499',
    annualPrice: '2,899',
    subtitle: 'Dedicated 1-on-1 certified trainer & custom Indian nutrition blueprint.',
    featured: true,
    features: [
      'Everything included in Unisex Gym Access',
      'Dedicated personal trainer (Male & Female available)',
      'Customized fat loss, toning, or hypertrophy diet plan',
      'Weekly body composition & strength PR tracking',
      'Complimentary monthly hair spa / salon service',
      'Priority slot reservations',
    ],
    cta: 'SELECT PT TRANSFORMATION',
  },
  {
    id: 'all-access',
    code: 'PASS // 03',
    badge: 'VIP DUAL SANCTUARY',
    name: 'ALL-ACCESS:',
    serifName: 'Gym + Salon.',
    monthlyPrice: '4,999',
    annualPrice: '3,999',
    subtitle: 'The flagship fitness & glamour membership for complete lifestyle care.',
    featured: false,
    features: [
      'Unlimited Gym Access + Dedicated Trainer Support',
      'Monthly Keratin smoothing or Hair Botox Spa treatment',
      'Aesthetic facial & skin grooming in private salon suite',
      'Exclusive 20% privilege on all bridal & party makeup packages',
      'Complimentary pre-workout refreshments & towel service',
      'Priority appointment booking for salon & makeup studio',
    ],
    cta: 'SELECT ALL-ACCESS: GYM + SALON',
  },
];

export const DEFAULT_TIMETABLE_SLOTS: TimetableSlot[] = [
  {
    id: 's1',
    day: 'ALL',
    time: '06:00 – 08:30',
    duration: 'FULL ACCESS',
    title: 'MORNING IRON & BIOMECHANICAL STRENGTH CIRCUIT',
    coach: 'Coach Rajesh Sen',
    zone: 'Gym Floor A',
    slotsLeft: 8,
    category: 'strength',
  },
  {
    id: 's2',
    day: 'ALL',
    time: '08:30 – 10:30',
    duration: '60 MIN',
    title: 'FAT LOSS & METABOLIC CONDITIONING SURGE',
    coach: 'Coach Priya Mukherjee',
    zone: 'Cardio & Turf Zone',
    slotsLeft: 5,
    category: 'cardio',
  },
  {
    id: 's3',
    day: 'ALL',
    time: '11:00 – 14:00',
    duration: '60 MIN',
    title: '1-ON-1 PERSONAL TRAINING & BODY RECOMPOSITION',
    coach: 'Dedicated PT Specialist',
    zone: 'Private PT Bay',
    slotsLeft: 2,
    category: 'strength',
  },
  {
    id: 's4',
    day: 'ALL',
    time: '12:00 – 17:00',
    duration: '90–120 MIN',
    title: 'FORMALDEHYDE-FREE KERATIN & HAIR BOTOX LOUNGE',
    coach: 'Tania Roy',
    zone: 'Private Salon Suite',
    slotsLeft: 3,
    category: 'keratin',
  },
  {
    id: 's5',
    day: 'ALL',
    time: '15:00 – 18:00',
    duration: 'BY APPOINTMENT',
    title: 'HD BRIDAL MAKEOVER & SKIN LUMINESCENCE STUDIO',
    coach: 'Shilpa Roy',
    zone: 'Bridal Artistry Wing',
    slotsLeft: 2,
    category: 'bridal',
  },
  {
    id: 's6',
    day: 'ALL',
    time: '17:30 – 22:00',
    duration: 'FULL ACCESS',
    title: 'EVENING PEAK MUSCLE HYPERTROPHY & HEAVY IRON',
    coach: 'Lead Floor Trainers',
    zone: 'Olympic Lifting Floor',
    slotsLeft: 6,
    category: 'strength',
  },
];

export const DEFAULT_GALLERY_IMAGES: GalleryStreamItem[] = [
  { src: '/assets/images/i04-strength-still.webp', alt: 'Olympic Barbell Strength Floor', category: 'gym' },
  { src: '/assets/images/i05-conditioning-still.webp', alt: 'Metabolic Battle Rope Conditioning', category: 'gym' },
  { src: '/assets/images/i07-coaching-still.webp', alt: '1-on-1 Biomechanical Personal Coaching', category: 'gym' },
  { src: '/assets/images/i09-macro-plate.webp', alt: 'Calibrated Competition Plates', category: 'gym' },
  { src: '/assets/images/i10-community-wide.webp', alt: 'Unisex Fitness Studio Floor', category: 'gym' },
  { src: '/assets/showcase/shilpas_salon_glamour.jpg', alt: 'Bridal & HD Glamour Artistry', category: 'salon' },
  { src: '/assets/showcase/shilpas_salon_hair_spa.jpg', alt: 'Formaldehyde-Free Keratin & Hair Spa Suite', category: 'salon' },
  { src: '/assets/showcase/shilpas_salon_glamour.jpg', alt: 'HD Makeup & Skin Brightening Suite', category: 'salon' },
  { src: '/assets/showcase/shilpas_salon_hair_spa.jpg', alt: 'Private Salon Sanctuary', category: 'salon' },
  { src: '/assets/showcase/shilpas_salon_glamour.jpg', alt: 'Aesthetic Transformation Studio', category: 'salon' },
];

export const DEFAULT_HOURLY_CURVE: HourlyTelemetry[] = [
  { hour: '06', timeLabel: '06:00', density: 34, status: 'MODERATE', note: 'Early morning iron lifters arriving' },
  { hour: '07', timeLabel: '07:00', density: 72, status: 'PRIME', note: 'Peak morning fat loss & strength sessions' },
  { hour: '08', timeLabel: '08:00', density: 88, status: 'PEAK', note: 'Heavy compound racks & conditioning zone' },
  { hour: '09', timeLabel: '09:00', density: 64, status: 'PRIME', note: 'Metabolic conditioning circuits active' },
  { hour: '10', timeLabel: '10:00', density: 42, status: 'MODERATE', note: 'Morning cooldown & salon prep suites' },
  { hour: '11', timeLabel: '11:00', density: 24, status: 'QUIET', note: 'Ideal time for open bench & squat racks' },
  { hour: '12', timeLabel: '12:00', density: 38, status: 'QUIET', note: 'Dedicated salon keratin & hair botox hours' },
  { hour: '13', timeLabel: '13:00', density: 30, status: 'QUIET', note: 'Private 1-on-1 coaching bays available' },
  { hour: '14', timeLabel: '14:00', density: 22, status: 'QUIET', note: 'Sanitized floor, quiet lifting conditions' },
  { hour: '15', timeLabel: '15:00', density: 28, status: 'QUIET', note: 'Bridal consultation & makeup artistry slot' },
  { hour: '16', timeLabel: '16:00', density: 46, status: 'MODERATE', note: 'Afternoon strength trainees check-in' },
  { hour: '17', timeLabel: '17:00', density: 68, status: 'PRIME', note: 'Evening rush begins on selectorized lines' },
  { hour: '18', timeLabel: '18:00', density: 92, status: 'PEAK', note: 'Full house: Olympic lifting & coaching' },
  { hour: '19', timeLabel: '19:00', density: 94, status: 'PEAK', note: 'High motivation peak energy floor' },
  { hour: '20', timeLabel: '20:00', density: 78, status: 'PRIME', note: 'Hypertrophy circuits & cool down sets' },
  { hour: '21', timeLabel: '21:00', density: 44, status: 'MODERATE', note: 'Late night lifting & showers before 22:00' },
];

export const THEME_PRESETS = [
  {
    name: 'Atelier Crimson & Gold (Default)',
    primary: '#D9381E',
    secondary: '#C5A059',
    canvas: '#F4F1EA',
    dark: '#0D0D0E',
  },
  {
    name: 'Equinox Obsidian & Silver',
    primary: '#FFFFFF',
    secondary: '#94A3B8',
    canvas: '#F8FAFC',
    dark: '#09090B',
  },
  {
    name: 'Cyber Volt & Carbon',
    primary: '#CCFF00',
    secondary: '#00F0FF',
    canvas: '#F3F4F6',
    dark: '#111827',
  },
  {
    name: 'Emerald & Champagne',
    primary: '#059669',
    secondary: '#D4AF37',
    canvas: '#F7F7F2',
    dark: '#061A14',
  },
  {
    name: 'Royal Sapphire & Rose Gold',
    primary: '#2563EB',
    secondary: '#E0A96D',
    canvas: '#F8FAFC',
    dark: '#0F172A',
  },
];

// Apply root CSS variables for dynamic live theme switching
export function applyThemeToDom(brand: BrandSettings) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--persimmon', brand.primaryColor);
  root.style.setProperty('--periwinkle', brand.secondaryColor);
  root.style.setProperty('--canvas', brand.canvasColor);
  root.style.setProperty('--carbon', brand.darkColor);
}

// ==============================================================================
// ZUSTAND CMS STORE INTERFACE
// ==============================================================================

export interface CmsStoreState {
  brand: BrandSettings;
  disciplines: DisciplineItem[];
  trainers: TrainerMember[];
  transformations: Record<'fitness' | 'salon' | 'bridal', TransformationCase>;
  membershipTiers: MembershipTier[];
  timetableSlots: TimetableSlot[];
  galleryImages: GalleryStreamItem[];
  hourlyCurve: HourlyTelemetry[];
  inquiries: LeadInquiry[];
  isSupabaseLive: boolean;

  // Actions
  updateBrandSettings: (partial: Partial<BrandSettings>) => void;
  updateDiscipline: (id: string, data: Partial<DisciplineItem>) => void;
  updateTrainer: (id: string, data: Partial<TrainerMember>) => void;
  addTrainer: (trainer: TrainerMember) => void;
  removeTrainer: (id: string) => void;
  updateTransformation: (
    key: 'fitness' | 'salon' | 'bridal',
    data: Partial<TransformationCase>
  ) => void;
  updateMembershipTier: (id: string, data: Partial<MembershipTier>) => void;
  updateTimetableSlot: (id: string, data: Partial<TimetableSlot>) => void;
  addTimetableSlot: (slot: TimetableSlot) => void;
  deleteTimetableSlot: (id: string) => void;
  updateGalleryImages: (images: GalleryStreamItem[]) => void;
  updateHourlyOccupancy: (
    hour: string,
    data: Partial<HourlyTelemetry>
  ) => void;
  setLiveOccupancyOverride: (override: number | null) => void;
  addLeadInquiry: (lead: Omit<LeadInquiry, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateLeadStatus: (id: string, status: LeadInquiry['status']) => void;
  uploadMediaFile: (file: File) => Promise<string>;
  loadFromSupabase: () => Promise<void>;
  exportClientConfigJson: () => string;
  importClientConfigJson: (jsonStr: string) => boolean;
  resetToDefaults: () => void;
}

export const useCmsStore = create<CmsStoreState>()(
  persist(
    (set, get) => ({
      brand: DEFAULT_BRAND_SETTINGS,
      disciplines: DEFAULT_DISCIPLINES,
      trainers: DEFAULT_TRAINERS,
      transformations: DEFAULT_TRANSFORMATIONS,
      membershipTiers: DEFAULT_MEMBERSHIP_TIERS,
      timetableSlots: DEFAULT_TIMETABLE_SLOTS,
      galleryImages: DEFAULT_GALLERY_IMAGES,
      hourlyCurve: DEFAULT_HOURLY_CURVE,
      inquiries: [],
      isSupabaseLive: isSupabaseConfigured(),

      loadFromSupabase: async () => {
        if (!supabase) return;
        try {
          const { data: settings } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();
          if (settings) {
            set((state) => ({
              brand: {
                ...state.brand,
                gymName: settings.gym_name || state.brand.gymName,
                tagline: settings.tagline || state.brand.tagline,
                locationShort: settings.location_short || state.brand.locationShort,
                fullAddress: settings.full_address || state.brand.fullAddress,
                plusCode: settings.plus_code || state.brand.plusCode,
                phone: settings.phone || state.brand.phone,
                whatsapp: settings.whatsapp || state.brand.whatsapp,
                hours: settings.hours || state.brand.hours,
                googleRating: settings.google_rating ?? state.brand.googleRating,
                reviewCount: settings.review_count ?? state.brand.reviewCount,
                primaryColor: settings.primary_color || state.brand.primaryColor,
                secondaryColor: settings.secondary_color || state.brand.secondaryColor,
                canvasColor: settings.canvas_color || state.brand.canvasColor,
                darkColor: settings.dark_color || state.brand.darkColor,
                heroLoopVideoUrl: settings.hero_loop_video_url || state.brand.heroLoopVideoUrl,
                momentumVideoUrl: settings.momentum_video_url || state.brand.momentumVideoUrl,
                portalVideoUrl: settings.portal_video_url || state.brand.portalVideoUrl,
                liveOccupancyOverride: settings.live_occupancy_override ?? state.brand.liveOccupancyOverride,
              },
            }));
          }
        } catch (err) {
          console.warn('[Supabase hydration skipped]:', err);
        }
      },

      updateBrandSettings: (partial) => {
        set((state) => {
          const newBrand = { ...state.brand, ...partial };
          applyThemeToDom(newBrand);
          if (supabase) {
            supabase
              .from('site_settings')
              .upsert({
                id: 'current',
                gym_name: newBrand.gymName,
                tagline: newBrand.tagline,
                location_short: newBrand.locationShort,
                full_address: newBrand.fullAddress,
                plus_code: newBrand.plusCode,
                phone: newBrand.phone,
                whatsapp: newBrand.whatsapp,
                hours: newBrand.hours,
                google_rating: newBrand.googleRating,
                review_count: newBrand.reviewCount,
                primary_color: newBrand.primaryColor,
                secondary_color: newBrand.secondaryColor,
                canvas_color: newBrand.canvasColor,
                dark_color: newBrand.darkColor,
                hero_loop_video_url: newBrand.heroLoopVideoUrl,
                momentum_video_url: newBrand.momentumVideoUrl,
                portal_video_url: newBrand.portalVideoUrl,
                live_occupancy_override: newBrand.liveOccupancyOverride,
                updated_at: new Date().toISOString(),
              })
              .then(({ error }) => {
                if (error) console.warn('[Supabase Sync Brand Error]:', error);
              });
          }
          return { brand: newBrand };
        });
      },

      updateDiscipline: (id, data) => {
        set((state) => ({
          disciplines: state.disciplines.map((d) =>
            d.id === id ? { ...d, ...data } : d
          ),
        }));
      },

      updateTrainer: (id, data) => {
        set((state) => ({
          trainers: state.trainers.map((t) =>
            t.id === id ? { ...t, ...data } : t
          ),
        }));
      },

      addTrainer: (trainer) => {
        set((state) => ({ trainers: [...state.trainers, trainer] }));
      },

      removeTrainer: (id) => {
        set((state) => ({ trainers: state.trainers.filter((t) => t.id !== id) }));
      },

      updateTransformation: (key, data) => {
        set((state) => ({
          transformations: {
            ...state.transformations,
            [key]: { ...state.transformations[key], ...data },
          },
        }));
      },

      updateMembershipTier: (id, data) => {
        set((state) => ({
          membershipTiers: state.membershipTiers.map((m) =>
            m.id === id ? { ...m, ...data } : m
          ),
        }));
      },

      updateTimetableSlot: (id, data) => {
        set((state) => ({
          timetableSlots: state.timetableSlots.map((s) =>
            s.id === id ? { ...s, ...data } : s
          ),
        }));
      },

      addTimetableSlot: (slot) => {
        set((state) => ({ timetableSlots: [...state.timetableSlots, slot] }));
      },

      deleteTimetableSlot: (id) => {
        set((state) => ({
          timetableSlots: state.timetableSlots.filter((s) => s.id !== id),
        }));
      },

      updateGalleryImages: (images) => {
        set({ galleryImages: images });
      },

      updateHourlyOccupancy: (hour, data) => {
        set((state) => ({
          hourlyCurve: state.hourlyCurve.map((h) =>
            h.hour === hour ? { ...h, ...data } : h
          ),
        }));
      },

      setLiveOccupancyOverride: (override) => {
        set((state) => {
          const brand = { ...state.brand, liveOccupancyOverride: override };
          return { brand };
        });
      },

      addLeadInquiry: async (lead) => {
        const newLead: LeadInquiry = {
          ...lead,
          id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          createdAt: new Date().toISOString(),
          status: 'NEW',
        };

        set((state) => ({ inquiries: [newLead, ...state.inquiries] }));

        if (supabase) {
          try {
            await supabase.from('inquiries').insert({
              name: lead.name,
              phone: lead.phone,
              email: lead.email,
              selected_track: lead.selectedTrack,
              time_window: lead.timeWindow,
              notes: lead.notes,
              status: 'NEW',
            });
          } catch (err) {
            console.warn('[Supabase Lead Insert Exception]:', err);
          }
        }
      },

      updateLeadStatus: (id, status) => {
        set((state) => ({
          inquiries: state.inquiries.map((l) =>
            l.id === id ? { ...l, status } : l
          ),
        }));

        if (supabase) {
          supabase
            .from('inquiries')
            .update({ status })
            .eq('id', id)
            .then(() => {});
        }
      },

      uploadMediaFile: async (file: File): Promise<string> => {
        if (isSupabaseConfigured()) {
          const remoteUrl = await uploadToSupabaseStorage(file);
          if (remoteUrl) return remoteUrl;
        }

        // Local Fallback: Convert to Base64 data URL for offline demo persistence
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result as string);
          };
          reader.onerror = () => {
            resolve(URL.createObjectURL(file));
          };
          reader.readAsDataURL(file);
        });
      },

      exportClientConfigJson: () => {
        const state = get();
        const exportData = {
          brand: state.brand,
          disciplines: state.disciplines,
          trainers: state.trainers,
          transformations: state.transformations,
          membershipTiers: state.membershipTiers,
          timetableSlots: state.timetableSlots,
          galleryImages: state.galleryImages,
          hourlyCurve: state.hourlyCurve,
          exportedAt: new Date().toISOString(),
          version: '1.0.0',
        };
        return JSON.stringify(exportData, null, 2);
      },

      importClientConfigJson: (jsonStr: string) => {
        try {
          const parsed = JSON.parse(jsonStr);
          if (!parsed.brand || !parsed.disciplines) {
            return false;
          }
          set({
            brand: parsed.brand || DEFAULT_BRAND_SETTINGS,
            disciplines: parsed.disciplines || DEFAULT_DISCIPLINES,
            trainers: parsed.trainers || DEFAULT_TRAINERS,
            transformations: parsed.transformations || DEFAULT_TRANSFORMATIONS,
            membershipTiers: parsed.membershipTiers || DEFAULT_MEMBERSHIP_TIERS,
            timetableSlots: parsed.timetableSlots || DEFAULT_TIMETABLE_SLOTS,
            galleryImages: parsed.galleryImages || DEFAULT_GALLERY_IMAGES,
            hourlyCurve: parsed.hourlyCurve || DEFAULT_HOURLY_CURVE,
          });
          applyThemeToDom(parsed.brand);
          return true;
        } catch {
          return false;
        }
      },

      resetToDefaults: () => {
        set({
          brand: DEFAULT_BRAND_SETTINGS,
          disciplines: DEFAULT_DISCIPLINES,
          trainers: DEFAULT_TRAINERS,
          transformations: DEFAULT_TRANSFORMATIONS,
          membershipTiers: DEFAULT_MEMBERSHIP_TIERS,
          timetableSlots: DEFAULT_TIMETABLE_SLOTS,
          galleryImages: DEFAULT_GALLERY_IMAGES,
          hourlyCurve: DEFAULT_HOURLY_CURVE,
        });
        applyThemeToDom(DEFAULT_BRAND_SETTINGS);
      },
    }),
    {
      name: 'shilpas-gym-cms-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
