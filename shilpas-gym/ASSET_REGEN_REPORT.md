# GOOGLE FLOW ASSET REGENERATION REPORT FOR GEMINI

## SUMMARY
- Total Assets Audited: 24
- Fixed via CSS/Optical Grading & Showcase Asset Integration: 6
- Require Regeneration in Google Flow (Imagen 3 / Veo 2): 8 Major Asset Packs (covering 200+ rendered frames)

---

## ASSETS REQUIRING REGENERATION (PRIORITY ORDER)

### [ASSET_01]
- **Target File Path to Replace:** `public/assets/sequences/v04-sculpture/0001.webp` to `0192.webp` (and mobile `public/assets/sequences/v04-sculpture/mobile/0001.webp` to `0096.webp`)
- **Used In Component:** `src/components/sections/SignatureScroll.tsx`
- **Asset Type:** 192-Frame Turntable Sequence (.webp) + 96-Frame Mobile Sequence
- **Required Aspect Ratio & Resolution:** 16:9 (1920x1080) transparent WebP/PNG or exact `#E8E4DC` / `#F4F1EA` Alabaster matte background
- **Why Current Asset Fails:** The existing 192-frame sequence was inherited from a template with persimmon orange and periwinkle blue dumbbell coatings set against an artificial pure-white studio cyclorama. When rendered over our `#E8E4DC` Warm Alabaster section background, it creates an uncalibrated white rectangle that clashes with the luxury Obsidian Carbon (`#0D0D0E`), Infrared Crimson (`#D9381E`), and Brushed Champagne Gold (`#C5A059`) brand system.
- **Required Subject & Scene for Google Flow:** High-precision 360-degree turntable product render of a bespoke luxury Olympic dumbbell. Precision 216,000 PSI high-tensile steel shaft with aggressive volcano knurling, dual chamfered hexagonal dumbbell heads in matte obsidian black anodized titanium, precision beveled chamfers in brushed champagne gold (`#C5A059`), and an infrared crimson (`#D9381E`) laser-etched collar ring reading "SHILPA'S ATELIER · 20KG".
- **Camera, Lighting & Color Directives:** 85mm macro product lens, centered framing. Soft directional 3200K studio key light generating crisp specular reflections along the knurled grip and champagne bevels. Background must be transparent alpha channel or seamless `#E8E4DC` warm alabaster tone with zero white rim halos.
- **Motion / Continuity Notes:** 192 evenly-spaced frames completing an exact 360-degree clockwise orbit at 24fps. Frame 0192 must transition imperceptibly back to Frame 0001.

---

### [ASSET_02]
- **Target File Path to Replace:** `public/assets/videos/v01-hero-loop.mp4` & `public/assets/images/i01-hero-still.webp`
- **Used In Component:** `src/components/sections/HeroMaster.tsx`
- **Asset Type:** Seamless Looping Video (.mp4, H.264) & Keyframe Poster (.webp)
- **Required Aspect Ratio & Resolution:** 16:9 (1920x1080, 24fps, 6–8 second seamless loop)
- **Why Current Asset Fails:** The current video loop displays a floating dumbbell on a stark white background in bright orange and periwinkle blue. It lacks the atmosphere, depth, and dual-sanctuary identity of Shilpa's Gym & Beauty Salon in Khardaha, Kolkata.
- **Required Subject & Scene for Google Flow:** Ultra-luxury atmospheric slow tracking shot inside Shilpa's Atelier in Rahara, Khardaha. A matte-black Olympic barbell rested on a heavy-gauge power rack with precision infrared crimson and brushed champagne competition plates. In the soft-focus background, warm architectural arches lead into the adjoining private beauty salon wing where glowing backlit brass vanity mirrors and plush leather styling chairs are visible.
- **Camera, Lighting & Color Directives:** ARRI Alexa Mini LF look, 35mm anamorphic prime lens, shallow depth of field (f/1.8). Warm 3000K tungsten interior lighting mixed with morning window daylight. Deep obsidian carbon shadows (`#0D0D0E`), warm alabaster wall plaster (`#F4F1EA`), and rich champagne gold highlights (`#C5A059`).
- **Motion / Continuity Notes:** Butter-smooth camera push forward with a gentle 3-degree clockwise pan. The final frame must match the first frame perfectly for an imperceptible infinite loop.

---

### [ASSET_03]
- **Target File Path to Replace:** `public/assets/images/i10-community-wide.webp` (Before) & `public/assets/images/i05-conditioning-still.webp` (After)
- **Used In Component:** `src/components/sections/TransformationVisualizer.tsx` (`fitness` tab)
- **Asset Type:** Locked Before/After Still Image Pair (.webp)
- **Required Aspect Ratio & Resolution:** 16:10 (1920x1200)
- **Why Current Asset Fails:** The Before slot displays a wide-angle room full of gym visitors, while the After slot shows a single male athlete doing battle ropes. The two images feature different people, different scales, different lighting, and different compositions, completely breaking the credibility of the split-screen comparison scanner.
- **Required Subject & Scene for Google Flow:**
  - **Before (Week 0 Baseline):** 28-year-old South Asian male, 5'10", standing in a neutral athletic pose beside an Olympic squat rack. Posture exhibits slight anterior pelvic tilt and rounded shoulders; wearing grey athletic shorts and a black t-shirt. Authentic gym floor lighting.
  - **After (Week 16 Calibrated Power):** Exact same 28-year-old South Asian male, identical facial structure, height, standing in the exact same spot and camera angle. Noticeably leaner body composition (-12kg body fat, +4kg lean muscle), erect athletic posture, defined shoulder caps, muscular chest, and vascular forearms in premium black fitted training apparel.
- **Camera, Lighting & Color Directives:** 50mm portrait prime at eye level. Consistent studio lighting (3500K) with a subtle infrared crimson rim light (`#D9381E`) along the physique. Background must show calibrated gym plates and power racks.
- **Motion / Continuity Notes:** Subject Lock is mandatory. Eye line, shoulder width, scale, and background perspective must align to the millimeter across both frames so the interactive vertical split-screen divider cleanly reveals the physical transformation.

---

### [ASSET_04]
- **Target File Path to Replace:** `public/assets/images/i06-mobility-still.webp` (Before) & `public/assets/showcase/shilpas_salon_hair_spa.jpg` (After)
- **Used In Component:** `src/components/sections/TransformationVisualizer.tsx` (`salon` tab)
- **Asset Type:** Locked Before/After Still Image Pair (.webp)
- **Required Aspect Ratio & Resolution:** 16:10 (1920x1200)
- **Why Current Asset Fails:** The current Before slot uses an athlete stretching in a gym lunge (`i06-mobility-still.webp`), which is a fitness photo having nothing to do with hair restoration. The interactive scanner requires a macro before-and-after demonstration of hair cuticle transformation.
- **Required Subject & Scene for Google Flow:**
  - **Before (Damaged Cuticles & Severe Humidity Frizz):** Close-up rear-three-quarter portrait of an Indian woman's long thick dark hair before treatment. Shows visible split ends, unmanageable humidity frizz, dull coarse texture, and faded luster under salon evaluation light.
  - **After (Mirror-Gloss Keratin Sheen):** Exact same Indian woman in the exact same salon chair, same angle and camera distance, after undergoing Shilpa's signature formaldehyde-free keratin smoothing and protein hair botox treatment. Hair is mirror-reflective, liquid-silk texture, ultra-sleek, deep obsidian black with luminous champagne highlights, with 100% frizz eliminated.
- **Camera, Lighting & Color Directives:** 85mm f/2.0 macro portrait lens. Overhead directional warm salon spotlight (3200K) accentuating cuticle light refraction. Smoked espresso leather styling chair and warm alabaster interior background (`#141311`, `#F4F1EA`).
- **Motion / Continuity Notes:** Exact head angle, shoulder height, and camera distance locked between Before and After for split-screen slider scrubbing.

---

### [ASSET_05]
- **Target File Path to Replace:** `public/assets/library/A03_philosophy_recovery.jpeg` (Before) & `public/assets/showcase/shilpas_salon_glamour.jpg` (After)
- **Used In Component:** `src/components/sections/TransformationVisualizer.tsx` (`bridal` tab)
- **Asset Type:** Locked Before/After Still Image Pair (.webp)
- **Required Aspect Ratio & Resolution:** 16:10 (1920x1200)
- **Why Current Asset Fails:** The Before slot displays a tired workout athlete resting on rubber gym flooring (`A03_philosophy_recovery.jpeg`). The section promises "Signature Bengali HD Bridal Makeover" with "Waterproof HD airbrush base, traditional Chandan artistry, sculpted eye contouring, and fresh floral jasmine setting".
- **Required Subject & Scene for Google Flow:**
  - **Before (Pre-Prep Skin Evaluation):** Radiant 25-year-old Bengali bride-to-be seated in the luxury bridal suite with clean, bare skin pre-makeup, wearing a simple cream silk robe, hair gently pinned back.
  - **After (Final HD Bridal Reveal):** Exact same Bengali bride in the exact same seated posture and camera framing, fully transformed in breathtaking traditional Bengali bridal regalia: crimson red Banarasi silk saree with ornate gold zari embroidery, intricate white-and-red Chandan sandalwood artistry delicately drawn across her forehead, dewy airbrushed HD makeup, dramatic winged kohl eyeliner, traditional gold Mukut (tiara), gold nath (nose ring), and fresh white jasmine flowers cascading down her bridal bun.
- **Camera, Lighting & Color Directives:** Hasselblad medium format portrait aesthetic, 90mm lens. Warm luxury vanity mirror illumination with golden ambient rim light (`#C5A059`) and vibrant bridal crimson textile reflections (`#D9381E`).
- **Motion / Continuity Notes:** Head tilt, facial position, and camera framing locked between Before and After so the split-screen drag divider reveals the authentic bridal artistry.

---

### [ASSET_06]
- **Target File Path to Replace:** `public/assets/images/coaches/shilpa-roy-portrait.webp` & `public/assets/images/coaches/tania-roy-portrait.webp`
- **Used In Component:** `src/components/sections/CoachingAction.tsx` (`#03 Shilpa Roy` & `#04 Tania Roy`)
- **Asset Type:** Executive Portrait Stills (.webp)
- **Required Aspect Ratio & Resolution:** 3:4 Vertical Portrait (1200x1600)
- **Why Current Asset Fails:** The original code referenced fitness coach photos (`A11_female_coach.jpeg` and `A13_female_coaching_interaction.jpeg`) showing athletic women lifting weights in gym apparel instead of the founder & master aesthetician or hair spa specialist. While temporarily redirected to showcase files, dedicated high-fashion executive portraits are required for the 3D flip roster cards.
- **Required Subject & Scene for Google Flow:**
  - **Shilpa Roy (Founder & Master Aesthetician):** Elegant, commanding 34-year-old Indian woman and studio director. Wearing a sharp tailored obsidian black blazer over a champagne silk top with refined gold jewelry. Standing in her private salon and makeup atelier in Rahara, surrounded by warm alabaster walls, illuminated vanity mirrors, and premium cosmetic tools. Warm, authoritative, welcoming gaze directly into the lens.
  - **Tania Roy (Senior Keratin & Hair Spa Specialist):** Poised 28-year-old Indian woman with healthy, gleaming, perfectly-styled hair. Wearing chic black salon stylist attire with sleek apron. Standing in the private hair spa suite with imported treatment basins and botanical bottles in the background.
- **Camera, Lighting & Color Directives:** 85mm f/1.8 portrait lens, crisp focus on eyes with soft background bokeh. Warm 3200K key light with subtle infrared rim light (`#D9381E`) along the shoulder contour.
- **Motion / Continuity Notes:** Upper-body portrait centered in the frame (`object-[50%_20%]`) so faces fit inside the `h-[440px] sm:h-[490px]` 3D flip card windows without forehead or chin clipping.

---

### [ASSET_07]
- **Target File Path to Replace:** `public/assets/images/i08-coach-portrait.webp` & `public/assets/images/i07-coaching-still.webp`
- **Used In Component:** `src/components/sections/CoachingAction.tsx` (`#01 Coach Rajesh Sen` & `#02 Coach Priya Mukherjee`)
- **Asset Type:** Fitness Coach Portrait Stills (.webp)
- **Required Aspect Ratio & Resolution:** 3:4 Vertical Portrait (1200x1600)
- **Why Current Asset Fails:** The current assets depict Caucasian fitness models from the US Pulseform template ("Julian Mercer"). The atelier is an Indian-owned gym in Rahara, Khardaha, Kolkata. Authenticity requires portraits representing certified Indian trainers.
- **Required Subject & Scene for Google Flow:**
  - **Coach Rajesh Sen (Head Biomechanics & Strength):** Disciplined, athletic 32-year-old Bengali male coach with powerful, sculpted physique. Wearing a fitted black technical shirt with subtle red and gold trim. Standing with crossed arms on the gym floor beside calibrated Olympic power racks in Rahara. Serious, motivating, technique-focused expression.
  - **Coach Priya Mukherjee (Senior Women's Fitness & Posture):** Inspiring, fit 29-year-old Indian female strength coach with toned physique. Wearing high-performance obsidian training apparel. Standing beside calibrated dumbbells with a confident, encouraging smile.
- **Camera, Lighting & Color Directives:** 85mm f/2.0 prime lens. Dramatic rim lighting cutting against the dark studio floor background. Warm key light with obsidian shadow depth (`#0D0D0E`) and infrared crimson badge accents (`#D9381E`).
- **Motion / Continuity Notes:** Framing scaled to 3:4 aspect ratio with subject's head positioned comfortably in upper third.

---

### [ASSET_08]
- **Target File Path to Replace:** `public/assets/videos/v09-portal.mp4` & `public/assets/images/i11-portal-still.webp`
- **Used In Component:** `src/components/sections/ClosingPortal.tsx`
- **Asset Type:** Seamless Architectural Camera Push Video (.mp4, 6s loop) & Keyframe Poster (.webp)
- **Required Aspect Ratio & Resolution:** 16:9 (1920x1080, 24fps)
- **Why Current Asset Fails:** The existing video displays abstract geometric circular portals in bright electric blue and neon orange. It directly clashes with the Indian luxury Warm Alabaster (`#F4F1EA`), Obsidian Carbon (`#0D0D0E`), and Infrared Crimson (`#D9381E`) identity of Shilpa's Gym & Beauty Salon.
- **Required Subject & Scene for Google Flow:** Hypnotic cinematic architectural walkthrough connecting the dual sanctuaries of Shilpa's Atelier in Rahara, Khardaha. The camera glides forward through a moody, obsidian-clad strength floor with gleaming barbell racks and subtle crimson floor uplighting, passing through a magnificent rounded architectural archway into a warmly-illuminated, serene alabaster and champagne gold beauty salon suite with arched mirrors, marble accents, and fresh jasmine florals.
- **Camera, Lighting & Color Directives:** 24mm wide architectural lens, stabilized slow dolly forward. Lighting shifts organically from cool obsidian and crimson power (`#0D0D0E`, `#D9381E`) into warm 2800K alabaster luminescence and brushed gold luxury (`#F4F1EA`, `#C5A059`).
- **Motion / Continuity Notes:** Slow, continuous linear forward motion. The camera passes through the archway such that the final frame loops cleanly back to the beginning of the corridor.
