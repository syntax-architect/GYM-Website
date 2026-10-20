import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Lock,
  Unlock,
  Palette,
  Video,
  Users,
  Sparkles,
  Layers,
  CreditCard,
  Calendar,
  Inbox,
  Upload,
  Download,
  RotateCcw,
  Check,
  Plus,
  Trash2,
  Phone,
  MessageCircle,
  Activity,
} from 'lucide-react';
import {
  useCmsStore,
  THEME_PRESETS,
  type TrainerMember,
  type TimetableSlot,
  type LeadInquiry,
} from '../../store/cmsStore';
import { isSupabaseConfigured } from '../../lib/supabase';

type AdminTab =
  | 'brand'
  | 'media'
  | 'trainers'
  | 'transformations'
  | 'disciplines'
  | 'memberships'
  | 'timetable'
  | 'leads';

export const AdminPortalModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('brand');
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const importFileRef = useRef<HTMLInputElement>(null);

  const {
    brand,
    disciplines,
    trainers,
    transformations,
    membershipTiers,
    timetableSlots,
    galleryImages,
    inquiries,
    updateBrandSettings,
    updateDiscipline,
    updateTrainer,
    addTrainer,
    removeTrainer,
    updateTransformation,
    updateMembershipTier,
    updateTimetableSlot,
    addTimetableSlot,
    deleteTimetableSlot,
    updateGalleryImages,
    setLiveOccupancyOverride,
    updateLeadStatus,
    uploadMediaFile,
    exportClientConfigJson,
    importClientConfigJson,
    resetToDefaults,
  } = useCmsStore();

  const expectedPin = import.meta.env.VITE_ADMIN_PIN || '2026';
  const isSupabaseLive = isSupabaseConfigured();

  // Listen for keyboard shortcut (Ctrl+Shift+A or Cmd+Shift+A), URL hash #admin, or custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsOpen(true);
      }
    };

    const handleCustomTrigger = () => {
      setIsOpen(true);
    };

    if (window.location.hash === '#admin') {
      setIsOpen(true);
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('open-admin-portal', handleCustomTrigger);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('open-admin-portal', handleCustomTrigger);
    };
  }, []);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === expectedPin.trim() || pinInput.trim() === '2026') {
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onUrlReady: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadMediaFile(file);
      onUrlReady(url);
      showToast('Media uploaded & applied!');
    } catch {
      alert('Failed to process media file.');
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleExportConfig = () => {
    const json = exportClientConfigJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shilpas-gym-config-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Client config JSON exported successfully!');
  };

  const handleImportConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const ok = importClientConfigJson(content);
      if (ok) {
        showToast('Configuration successfully restored!');
      } else {
        alert('Invalid configuration JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-6 overflow-hidden">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#D9381E] text-white font-mono text-xs font-bold shadow-2xl animate-bounce">
          <Check className="w-4 h-4" />
          <span>{successToast}</span>
        </div>
      )}

      <div className="relative w-full max-w-7xl h-[94vh] bg-[#0D0D0E] text-[#F5F2EA] rounded-3xl border border-white/15 shadow-2xl flex flex-col overflow-hidden">
        {/* ============================================================================== */}
        {/* TOP STATUS BAR */}
        {/* ============================================================================== */}
        <div className="px-5 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0 bg-[#141311]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D9381E] text-white flex items-center justify-center font-display font-black text-sm">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-extrabold uppercase tracking-tight text-white">
                  {brand.gymName}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[#C5A059] font-mono text-[9px] font-bold">
                  SAAS ADMIN v2.0
                </span>
              </div>
              <p className="font-mono text-[10px] text-white/50 tracking-wider">
                STAFF CONTROL CENTER & REALTIME WHITE-LABEL CMS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Supabase Status Pill */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-wider ${
                isSupabaseLive
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isSupabaseLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span>{isSupabaseLive ? 'SUPABASE LIVE' : 'LOCAL DEMO MODE'}</span>
            </div>

            {isUploading && (
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/20 text-[#C5A059] font-mono text-[10px] font-bold uppercase tracking-wider animate-pulse">
                <span>UPLOADING MEDIA...</span>
              </div>
            )}

            {/* Config Export / Import Buttons */}
            {isAuthenticated && (
              <>
                <button
                  type="button"
                  onClick={handleExportConfig}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                  title="Export complete client config as JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>EXPORT</span>
                </button>

                <button
                  type="button"
                  onClick={() => importFileRef.current?.click()}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                  title="Import a client config JSON"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>IMPORT</span>
                </button>
                <input
                  type="file"
                  ref={importFileRef}
                  onChange={handleImportConfig}
                  accept=".json"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset all website settings back to factory Shilpa’s Gym defaults?')) {
                      resetToDefaults();
                      showToast('Reset to defaults.');
                    }
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 font-mono text-xs font-bold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">RESET</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close Admin Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ============================================================================== */}
        {/* AUTHENTICATION GATE (PIN OR SUPABASE) */}
        {/* ============================================================================== */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-[#0D0D0E]">
            <div className="w-full max-w-md p-8 rounded-3xl bg-[#141311] border border-white/15 text-center space-y-6 shadow-2xl">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#D9381E]/15 border border-[#D9381E]/30 flex items-center justify-center text-[#D9381E]">
                <Lock className="w-7 h-7" />
              </div>

              <div>
                <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                  STAFF & ADMIN ACCESS
                </h3>
                <p className="font-sans text-xs text-white/60 mt-1">
                  Enter staff PIN or master administrative code to open the White-Label CMS.
                </p>
              </div>

              <form onSubmit={handlePinSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    maxLength={10}
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError(false);
                    }}
                    placeholder="Enter Staff PIN (Default: 2026)"
                    className={`w-full bg-[#1C1A17] text-center font-mono text-xl tracking-[0.3em] px-4 py-3.5 rounded-2xl border ${
                      pinError ? 'border-red-500 text-red-400' : 'border-white/20 text-white'
                    } focus:outline-none focus:border-[#D9381E]`}
                    autoFocus
                  />
                  {pinError && (
                    <p className="font-mono text-xs text-red-400 mt-2">
                      Incorrect PIN code. Try default PIN: <strong>2026</strong>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#D9381E] hover:bg-[#B82B14] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  <Unlock className="w-4 h-4" />
                  <span>UNLOCK CONTROL CENTER</span>
                </button>
              </form>

              <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-white/45 flex items-center justify-between">
                <span>CLIENT DEMO QUICK PIN: 2026</span>
                <span className="text-[#C5A059]">CTRL + SHIFT + A</span>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================================== */
          /* AUTHENTICATED 8-TAB EXECUTIVE CONTROL CENTER */
          /* ============================================================================== */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Vertical Tab Navigation Strip */}
            <div className="w-full md:w-64 bg-[#141311] border-r border-white/10 flex md:flex-col overflow-x-auto md:overflow-y-auto no-scrollbar p-3 gap-1 shrink-0">
              {[
                { id: 'brand', label: '1. Brand & Theme', icon: Palette },
                { id: 'media', label: '2. Media Studio', icon: Video },
                { id: 'trainers', label: '3. Starting Lineup', icon: Users },
                { id: 'transformations', label: '4. Before/After', icon: Sparkles },
                { id: 'disciplines', label: '5. Wings & Specs', icon: Layers },
                { id: 'memberships', label: '6. Pricing Engine', icon: CreditCard },
                { id: 'timetable', label: '7. Timetable & Floor', icon: Calendar },
                {
                  id: 'leads',
                  label: `8. Leads CRM (${inquiries.length})`,
                  icon: Inbox,
                },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as AdminTab)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-left ${
                      active
                        ? 'bg-[#D9381E] text-white shadow-md'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              <div className="mt-auto hidden md:block pt-4 border-t border-white/10 p-2 font-mono text-[10px] text-white/40 space-y-1">
                <p>3D Dumbbell Engine:</p>
                <p className="text-white/60">Fixed Core · Palette Reactive</p>
              </div>
            </div>

            {/* Right Scrollable Content Bay */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 bg-[#0D0D0E]">
              {/* TAB 1: BRAND IDENTITY & WHITE-LABEL THEME ENGINE */}
              {activeTab === 'brand' && (
                <div className="space-y-8 max-w-4xl">
                  <div>
                    <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                      BRAND IDENTITY & COLOR THEME ENGINE
                    </h3>
                    <p className="font-sans text-xs text-white/60">
                      Re-theme the entire website live. Changes immediately update typography, color tokens, and studio metadata.
                    </p>
                  </div>

                  {/* Preset 1-Click Themes */}
                  <div className="p-5 rounded-2xl bg-[#141311] border border-white/10 space-y-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059] block">
                      1-CLICK PRESET BRAND PALETTES
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {THEME_PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => {
                            updateBrandSettings({
                              primaryColor: preset.primary,
                              secondaryColor: preset.secondary,
                              canvasColor: preset.canvas,
                              darkColor: preset.dark,
                            });
                            showToast(`Applied ${preset.name}`);
                          }}
                          className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer"
                        >
                          <span className="font-sans text-xs font-bold text-white">
                            {preset.name}
                          </span>
                          <div className="flex items-center gap-1">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-white/20"
                              style={{ backgroundColor: preset.primary }}
                            />
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-white/20"
                              style={{ backgroundColor: preset.secondary }}
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Hex Color Pickers */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#141311] border border-white/10">
                    <div>
                      <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                        PRIMARY ACCENT
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={brand.primaryColor}
                          onChange={(e) => updateBrandSettings({ primaryColor: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                        />
                        <input
                          type="text"
                          value={brand.primaryColor}
                          onChange={(e) => updateBrandSettings({ primaryColor: e.target.value })}
                          className="w-full bg-[#1C1A17] font-mono text-xs px-2.5 py-1.5 rounded-lg border border-white/15 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                        SECONDARY ACCENT
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={brand.secondaryColor}
                          onChange={(e) => updateBrandSettings({ secondaryColor: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                        />
                        <input
                          type="text"
                          value={brand.secondaryColor}
                          onChange={(e) => updateBrandSettings({ secondaryColor: e.target.value })}
                          className="w-full bg-[#1C1A17] font-mono text-xs px-2.5 py-1.5 rounded-lg border border-white/15 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                        CANVAS ALABASTER
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={brand.canvasColor}
                          onChange={(e) => updateBrandSettings({ canvasColor: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                        />
                        <input
                          type="text"
                          value={brand.canvasColor}
                          onChange={(e) => updateBrandSettings({ canvasColor: e.target.value })}
                          className="w-full bg-[#1C1A17] font-mono text-xs px-2.5 py-1.5 rounded-lg border border-white/15 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                        DARK OBSIDIAN
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={brand.darkColor}
                          onChange={(e) => updateBrandSettings({ darkColor: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                        />
                        <input
                          type="text"
                          value={brand.darkColor}
                          onChange={(e) => updateBrandSettings({ darkColor: e.target.value })}
                          className="w-full bg-[#1C1A17] font-mono text-xs px-2.5 py-1.5 rounded-lg border border-white/15 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Studio General Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#141311] border border-white/10">
                    <div className="sm:col-span-2">
                      <label className="block font-mono text-[11px] font-bold text-white/70 uppercase mb-1">
                        GYM / ATELIER NAME
                      </label>
                      <input
                        type="text"
                        value={brand.gymName}
                        onChange={(e) => updateBrandSettings({ gymName: e.target.value })}
                        className="w-full bg-[#1C1A17] px-4 py-2.5 rounded-xl border border-white/15 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] font-bold text-white/70 uppercase mb-1">
                        TAGLINE
                      </label>
                      <input
                        type="text"
                        value={brand.tagline}
                        onChange={(e) => updateBrandSettings({ tagline: e.target.value })}
                        className="w-full bg-[#1C1A17] px-4 py-2.5 rounded-xl border border-white/15 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] font-bold text-white/70 uppercase mb-1">
                        SHORT LOCATION / METRO
                      </label>
                      <input
                        type="text"
                        value={brand.locationShort}
                        onChange={(e) => updateBrandSettings({ locationShort: e.target.value })}
                        className="w-full bg-[#1C1A17] px-4 py-2.5 rounded-xl border border-white/15 text-white text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-mono text-[11px] font-bold text-white/70 uppercase mb-1">
                        FULL STREET ADDRESS
                      </label>
                      <input
                        type="text"
                        value={brand.fullAddress}
                        onChange={(e) => updateBrandSettings({ fullAddress: e.target.value })}
                        className="w-full bg-[#1C1A17] px-4 py-2.5 rounded-xl border border-white/15 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] font-bold text-white/70 uppercase mb-1">
                        PHONE HOTLINE
                      </label>
                      <input
                        type="text"
                        value={brand.phone}
                        onChange={(e) => updateBrandSettings({ phone: e.target.value })}
                        className="w-full bg-[#1C1A17] px-4 py-2.5 rounded-xl border border-white/15 text-white font-mono text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] font-bold text-white/70 uppercase mb-1">
                        WHATSAPP NUMBER (WITHOUT +)
                      </label>
                      <input
                        type="text"
                        value={brand.whatsapp}
                        onChange={(e) => updateBrandSettings({ whatsapp: e.target.value })}
                        className="w-full bg-[#1C1A17] px-4 py-2.5 rounded-xl border border-white/15 text-white font-mono text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] font-bold text-white/70 uppercase mb-1">
                        OPERATING HOURS
                      </label>
                      <input
                        type="text"
                        value={brand.hours}
                        onChange={(e) => updateBrandSettings({ hours: e.target.value })}
                        className="w-full bg-[#1C1A17] px-4 py-2.5 rounded-xl border border-white/15 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] font-bold text-white/70 uppercase mb-1">
                        GOOGLE RATING & REVIEWS
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          step="0.1"
                          value={brand.googleRating}
                          onChange={(e) =>
                            updateBrandSettings({ googleRating: parseFloat(e.target.value) || 4.7 })
                          }
                          className="bg-[#1C1A17] px-3 py-2.5 rounded-xl border border-white/15 text-white font-mono text-sm"
                        />
                        <input
                          type="number"
                          value={brand.reviewCount}
                          onChange={(e) =>
                            updateBrandSettings({ reviewCount: parseInt(e.target.value) || 355 })
                          }
                          className="bg-[#1C1A17] px-3 py-2.5 rounded-xl border border-white/15 text-white font-mono text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MEDIA & VIDEO STUDIO */}
              {activeTab === 'media' && (
                <div className="space-y-8 max-w-4xl">
                  <div>
                    <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                      MEDIA & VIDEO STUDIO MANAGER
                    </h3>
                    <p className="font-sans text-xs text-white/60">
                      Upload videos or photos directly from your computer or paste any direct CDN URL.
                    </p>
                  </div>

                  {/* Core Section Video Loops */}
                  <div className="space-y-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059] block">
                      CORE SECTION VIDEO LOOPS
                    </span>

                    {[
                      {
                        title: 'HERO STAGE VIDEO LOOP',
                        note: 'Falls back when visitor toggles 3D to Video Loop in HeroMaster',
                        field: 'heroLoopVideoUrl',
                        current: brand.heroLoopVideoUrl,
                      },
                      {
                        title: 'ACT II MOMENTUM FILM',
                        note: 'Expanding cinematic frame in MomentumFilm.tsx',
                        field: 'momentumVideoUrl',
                        current: brand.momentumVideoUrl,
                      },
                      {
                        title: 'CLOSING ARCHITECTURAL PORTAL',
                        note: '3D walkthrough video in ClosingPortal.tsx',
                        field: 'portalVideoUrl',
                        current: brand.portalVideoUrl,
                      },
                    ].map((item) => (
                      <div
                        key={item.field}
                        className="p-5 rounded-2xl bg-[#141311] border border-white/10 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-mono text-xs font-bold text-white uppercase block">
                              {item.title}
                            </span>
                            <span className="font-sans text-[11px] text-white/50">
                              {item.note}
                            </span>
                          </div>
                          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D9381E] hover:bg-[#B82B14] text-white font-mono text-xs font-bold cursor-pointer transition-all">
                            <Upload className="w-3.5 h-3.5" />
                            <span>UPLOAD FILE</span>
                            <input
                              type="file"
                              accept="video/mp4,video/webm,image/*"
                              onChange={(e) =>
                                handleFileUpload(e, (url) =>
                                  updateBrandSettings({ [item.field]: url })
                                )
                              }
                              className="hidden"
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          value={item.current}
                          onChange={(e) => updateBrandSettings({ [item.field]: e.target.value })}
                          className="w-full bg-[#1C1A17] font-mono text-xs px-3.5 py-2 rounded-xl border border-white/15 text-white"
                          placeholder="Paste video/image URL or upload file above"
                        />
                      </div>
                    ))}
                  </div>

                  {/* 10 Cylindrical Gallery Stream Images */}
                  <div className="space-y-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A059] block">
                      3D CYLINDER GALLERY STREAM (10 TILES)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {galleryImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-[#141311] border border-white/10 space-y-3 flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-white uppercase">
                              TILE #{idx + 1} · {img.category.toUpperCase()}
                            </span>
                            <label className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors">
                              <Upload className="w-3.5 h-3.5" />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleFileUpload(e, (url) => {
                                    const next = [...galleryImages];
                                    next[idx] = { ...next[idx], src: url };
                                    updateGalleryImages(next);
                                  })
                                }
                                className="hidden"
                              />
                            </label>
                          </div>

                          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/10">
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>

                          <input
                            type="text"
                            value={img.src}
                            onChange={(e) => {
                              const next = [...galleryImages];
                              next[idx] = { ...next[idx], src: e.target.value };
                              updateGalleryImages(next);
                            }}
                            className="w-full bg-[#1C1A17] font-mono text-[11px] px-3 py-1.5 rounded-lg border border-white/15 text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: TRAINERS & STARTING LINEUP ROSTER */}
              {activeTab === 'trainers' && (
                <div className="space-y-8 max-w-4xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                        STARTING LINEUP ROSTER
                      </h3>
                      <p className="font-sans text-xs text-white/60">
                        Edit specialist cards, upload photos, and adjust their 3 RPG biomechanical rating stats (0–100).
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newTrainer: TrainerMember = {
                          id: `trainer-${Date.now()}`,
                          number: String(trainers.length + 1).padStart(2, '0'),
                          positionCode: 'TR',
                          name: 'NEW SPECIALIST',
                          role: 'FITNESS & STRENGTH COACH',
                          specialtyTag: 'BIOMECHANICS & CONDITIONING',
                          experience: '5+ Years Experience',
                          image: '/assets/showcase/shilpas_gym_athlete.jpg',
                          quote: 'Form and progressive discipline over ego.',
                          accentColor: '#D9381E',
                          stats: [
                            { label: 'STRENGTH PROGRAMMING', value: 95 },
                            { label: 'FORM CORRECTION', value: 97 },
                            { label: 'REHAB & SAFETY', value: 94 },
                          ],
                        };
                        addTrainer(newTrainer);
                        showToast('New specialist added!');
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D9381E] hover:bg-[#B82B14] text-white font-mono text-xs font-bold cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>ADD COACH</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {trainers.map((trainer) => (
                      <div
                        key={trainer.id}
                        className="p-5 sm:p-6 rounded-3xl bg-[#141311] border border-white/10 space-y-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-black text-[#D9381E]">
                              #{trainer.number}
                            </span>
                            <input
                              type="text"
                              value={trainer.name}
                              onChange={(e) =>
                                updateTrainer(trainer.id, { name: e.target.value.toUpperCase() })
                              }
                              className="font-display text-lg font-black bg-transparent text-white border-b border-white/20 px-2 py-0.5 focus:border-[#D9381E] focus:outline-none"
                            />
                            <input
                              type="text"
                              maxLength={3}
                              value={trainer.positionCode}
                              onChange={(e) =>
                                updateTrainer(trainer.id, {
                                  positionCode: e.target.value.toUpperCase(),
                                })
                              }
                              className="w-12 text-center font-mono text-xs font-extrabold bg-[#D9381E] text-white px-1.5 py-0.5 rounded"
                            />
                          </div>

                          {trainers.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Remove ${trainer.name} from starting roster?`)) {
                                  removeTrainer(trainer.id);
                                  showToast('Coach removed.');
                                }
                              }}
                              className="p-2 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                          {/* Photo preview & upload */}
                          <div className="sm:col-span-4 space-y-2">
                            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-black/40 border border-white/15">
                              <img
                                src={trainer.image}
                                alt={trainer.name}
                                className="w-full h-full object-cover object-[50%_20%]"
                              />
                            </div>
                            <label className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors">
                              <Upload className="w-3.5 h-3.5" />
                              <span>CHANGE PHOTO</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleFileUpload(e, (url) =>
                                    updateTrainer(trainer.id, { image: url })
                                  )
                                }
                                className="hidden"
                              />
                            </label>
                            <input
                              type="text"
                              value={trainer.image}
                              onChange={(e) =>
                                updateTrainer(trainer.id, { image: e.target.value })
                              }
                              placeholder="Or paste direct image URL"
                              className="w-full bg-[#1C1A17] font-mono text-[11px] px-3 py-1.5 rounded-lg border border-white/15 text-white"
                            />
                          </div>

                          {/* Coach details & RPG stat sliders */}
                          <div className="sm:col-span-8 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                                  ROLE TITLE
                                </label>
                                <input
                                  type="text"
                                  value={trainer.role}
                                  onChange={(e) =>
                                    updateTrainer(trainer.id, { role: e.target.value })
                                  }
                                  className="w-full bg-[#1C1A17] text-xs px-3 py-2 rounded-xl border border-white/15 text-white"
                                />
                              </div>

                              <div>
                                <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                                  EXPERIENCE
                                </label>
                                <input
                                  type="text"
                                  value={trainer.experience}
                                  onChange={(e) =>
                                    updateTrainer(trainer.id, { experience: e.target.value })
                                  }
                                  className="w-full bg-[#1C1A17] text-xs px-3 py-2 rounded-xl border border-white/15 text-white"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                                PHILOSOPHY QUOTE
                              </label>
                              <textarea
                                rows={2}
                                value={trainer.quote}
                                onChange={(e) =>
                                  updateTrainer(trainer.id, { quote: e.target.value })
                                }
                                className="w-full bg-[#1C1A17] text-xs px-3 py-2 rounded-xl border border-white/15 text-white resize-none"
                              />
                            </div>

                            {/* 3 Telemetry Stat Sliders */}
                            <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 space-y-2.5">
                              <span className="font-mono text-[11px] font-bold text-[#C5A059] uppercase block">
                                BIOMECHANICAL / SALON STAT METRICS
                              </span>
                              {trainer.stats.map((st, sIdx) => (
                                <div key={sIdx} className="space-y-1">
                                  <div className="flex items-center justify-between font-mono text-[11px]">
                                    <input
                                      type="text"
                                      value={st.label}
                                      onChange={(e) => {
                                        const newStats = [...trainer.stats];
                                        newStats[sIdx] = { ...st, label: e.target.value.toUpperCase() };
                                        updateTrainer(trainer.id, { stats: newStats });
                                      }}
                                      className="bg-transparent text-white/80 border-b border-transparent hover:border-white/20 focus:outline-none"
                                    />
                                    <span className="text-[#C5A059] font-bold">{st.value}</span>
                                  </div>
                                  <input
                                    type="range"
                                    min={50}
                                    max={99}
                                    value={st.value}
                                    onChange={(e) => {
                                      const newStats = [...trainer.stats];
                                      newStats[sIdx] = { ...st, value: parseInt(e.target.value) || 90 };
                                      updateTrainer(trainer.id, { stats: newStats });
                                    }}
                                    className="w-full accent-[#D9381E] cursor-pointer"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: BEFORE / AFTER TRANSFORMATION SCANNER */}
              {activeTab === 'transformations' && (
                <div className="space-y-8 max-w-4xl">
                  <div>
                    <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                      TRANSFORMATION SCANNER CASE STUDIES
                    </h3>
                    <p className="font-sans text-xs text-white/60">
                      Manage the 3 interactive before/after split-screen drag modules: Fitness, Salon, and Bridal.
                    </p>
                  </div>

                  {(['fitness', 'salon', 'bridal'] as const).map((key) => {
                    const c = transformations[key];
                    return (
                      <div
                        key={key}
                        className="p-6 rounded-3xl bg-[#141311] border border-white/10 space-y-5"
                      >
                        <div className="flex items-center justify-between pb-3 border-b border-white/10">
                          <span className="font-mono text-xs font-extrabold text-[#D9381E] uppercase tracking-wider">
                            CASE STUDY: {c.tabLabel}
                          </span>
                          <span className="font-mono text-[11px] text-white/50">{c.tag}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                              CASE HEADLINE
                            </label>
                            <input
                              type="text"
                              value={c.title}
                              onChange={(e) =>
                                updateTransformation(key, { title: e.target.value })
                              }
                              className="w-full bg-[#1C1A17] text-xs px-3 py-2 rounded-xl border border-white/15 text-white"
                            />
                          </div>

                          <div>
                            <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                              SERIF ACCENT TITLE
                            </label>
                            <input
                              type="text"
                              value={c.serifTitle}
                              onChange={(e) =>
                                updateTransformation(key, { serifTitle: e.target.value })
                              }
                              className="w-full bg-[#1C1A17] text-xs px-3 py-2 rounded-xl border border-white/15 text-white"
                            />
                          </div>
                        </div>

                        {/* Before & After Photo Slots */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Before slot */}
                          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[11px] font-bold text-white/80">
                                BEFORE IMAGE
                              </span>
                              <label className="text-[11px] text-[#D9381E] hover:underline cursor-pointer">
                                Upload
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleFileUpload(e, (url) =>
                                      updateTransformation(key, { beforeImage: url })
                                    )
                                  }
                                  className="hidden"
                                />
                              </label>
                            </div>
                            <div className="w-full aspect-video rounded-xl overflow-hidden bg-black/60">
                              <img
                                src={c.beforeImage}
                                alt="Before"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <input
                              type="text"
                              value={c.beforeImage}
                              onChange={(e) =>
                                updateTransformation(key, { beforeImage: e.target.value })
                              }
                              className="w-full bg-[#1C1A17] font-mono text-[10px] px-2.5 py-1 rounded border border-white/15 text-white"
                            />
                          </div>

                          {/* After slot */}
                          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[11px] font-bold text-[#D9381E]">
                                AFTER IMAGE
                              </span>
                              <label className="text-[11px] text-[#D9381E] hover:underline cursor-pointer">
                                Upload
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleFileUpload(e, (url) =>
                                      updateTransformation(key, { afterImage: url })
                                    )
                                  }
                                  className="hidden"
                                />
                              </label>
                            </div>
                            <div className="w-full aspect-video rounded-xl overflow-hidden bg-black/60">
                              <img
                                src={c.afterImage}
                                alt="After"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <input
                              type="text"
                              value={c.afterImage}
                              onChange={(e) =>
                                updateTransformation(key, { afterImage: e.target.value })
                              }
                              className="w-full bg-[#1C1A17] font-mono text-[10px] px-2.5 py-1 rounded border border-white/15 text-white"
                            />
                          </div>
                        </div>

                        {/* Client quote & author */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                              TESTIMONIAL QUOTE
                            </label>
                            <input
                              type="text"
                              value={c.quote}
                              onChange={(e) =>
                                updateTransformation(key, { quote: e.target.value })
                              }
                              className="w-full bg-[#1C1A17] text-xs px-3 py-2 rounded-xl border border-white/15 text-white"
                            />
                          </div>

                          <div>
                            <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                              VERIFIED MEMBER NAME & LOCALITY
                            </label>
                            <input
                              type="text"
                              value={c.author}
                              onChange={(e) =>
                                updateTransformation(key, { author: e.target.value })
                              }
                              className="w-full bg-[#1C1A17] text-xs px-3 py-2 rounded-xl border border-white/15 text-white"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TAB 5: DISCIPLINES & WINGS */}
              {activeTab === 'disciplines' && (
                <div className="space-y-8 max-w-4xl">
                  <div>
                    <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                      FACILITY WINGS & DISCIPLINES
                    </h3>
                    <p className="font-sans text-xs text-white/60">
                      Configure the 4 specialized wings: Gym Floor, 1-on-1 Coaching, Private Salon, and Beauty Studio.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {disciplines.map((item) => (
                      <div
                        key={item.id}
                        className="p-6 rounded-3xl bg-[#141311] border border-white/10 space-y-4"
                      >
                        <div className="flex items-center justify-between pb-3 border-b border-white/10">
                          <span className="font-mono text-xs font-bold text-[#D9381E] uppercase">
                            {item.number} · {item.badge}
                          </span>
                          <span className="font-mono text-xs text-white/60">{item.planName}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                              TITLE
                            </label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) =>
                                updateDiscipline(item.id, { title: e.target.value })
                              }
                              className="w-full bg-[#1C1A17] text-xs px-3 py-2 rounded-xl border border-white/15 text-white"
                            />
                          </div>

                          <div>
                            <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                              SERIF ACCENT
                            </label>
                            <input
                              type="text"
                              value={item.serifTitle}
                              onChange={(e) =>
                                updateDiscipline(item.id, { serifTitle: e.target.value })
                              }
                              className="w-full bg-[#1C1A17] text-xs px-3 py-2 rounded-xl border border-white/15 text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                            DESCRIPTION
                          </label>
                          <textarea
                            rows={2}
                            value={item.description}
                            onChange={(e) =>
                              updateDiscipline(item.id, { description: e.target.value })
                            }
                            className="w-full bg-[#1C1A17] text-xs px-3 py-2 rounded-xl border border-white/15 text-white resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="block font-mono text-[10px] text-white/60 uppercase">
                                POSTER IMAGE
                              </label>
                              <label className="text-[11px] text-[#D9381E] hover:underline cursor-pointer">
                                Upload
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleFileUpload(e, (url) =>
                                      updateDiscipline(item.id, { image: url })
                                    )
                                  }
                                  className="hidden"
                                />
                              </label>
                            </div>
                            <input
                              type="text"
                              value={item.image}
                              onChange={(e) =>
                                updateDiscipline(item.id, { image: e.target.value })
                              }
                              className="w-full bg-[#1C1A17] font-mono text-xs px-3 py-2 rounded-xl border border-white/15 text-white"
                            />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="block font-mono text-[10px] text-white/60 uppercase">
                                OPTIONAL LOOPING VIDEO URL
                              </label>
                              <label className="text-[11px] text-[#D9381E] hover:underline cursor-pointer">
                                Upload
                                <input
                                  type="file"
                                  accept="video/mp4,video/webm"
                                  onChange={(e) =>
                                    handleFileUpload(e, (url) =>
                                      updateDiscipline(item.id, { video: url })
                                    )
                                  }
                                  className="hidden"
                                />
                              </label>
                            </div>
                            <input
                              type="text"
                              value={item.video || ''}
                              onChange={(e) =>
                                updateDiscipline(item.id, { video: e.target.value })
                              }
                              placeholder="/assets/videos/v06-strength.mp4"
                              className="w-full bg-[#1C1A17] font-mono text-xs px-3 py-2 rounded-xl border border-white/15 text-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: MEMBERSHIPS & PRICING ENGINE */}
              {activeTab === 'memberships' && (
                <div className="space-y-8 max-w-4xl">
                  <div>
                    <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                      MEMBERSHIP TIERS & PRICING
                    </h3>
                    <p className="font-sans text-xs text-white/60">
                      Edit monthly/annual pass prices, highlighted tiers, and feature bullet lists.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {membershipTiers.map((tier) => (
                      <div
                        key={tier.id}
                        className={`p-6 rounded-3xl bg-[#141311] border ${
                          tier.featured ? 'border-[#D9381E]' : 'border-white/10'
                        } space-y-4`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#D9381E]">
                              {tier.code}
                            </span>
                            <span className="font-display text-lg font-black text-white">
                              {tier.name} {tier.serifName}
                            </span>
                          </div>

                          <label className="inline-flex items-center gap-2 font-mono text-xs text-white/80 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={tier.featured}
                              onChange={(e) =>
                                updateMembershipTier(tier.id, { featured: e.target.checked })
                              }
                              className="accent-[#D9381E] w-4 h-4"
                            />
                            <span>FEATURED / MOST POPULAR</span>
                          </label>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                              MONTHLY PRICE (₹)
                            </label>
                            <input
                              type="text"
                              value={tier.monthlyPrice}
                              onChange={(e) =>
                                updateMembershipTier(tier.id, { monthlyPrice: e.target.value })
                              }
                              className="w-full bg-[#1C1A17] font-mono text-sm px-3.5 py-2 rounded-xl border border-white/15 text-white"
                            />
                          </div>

                          <div>
                            <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                              ANNUAL BILLED MONTHLY (₹)
                            </label>
                            <input
                              type="text"
                              value={tier.annualPrice}
                              onChange={(e) =>
                                updateMembershipTier(tier.id, { annualPrice: e.target.value })
                              }
                              className="w-full bg-[#1C1A17] font-mono text-sm px-3.5 py-2 rounded-xl border border-white/15 text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                            SUBTITLE DESCRIPTION
                          </label>
                          <input
                            type="text"
                            value={tier.subtitle}
                            onChange={(e) =>
                              updateMembershipTier(tier.id, { subtitle: e.target.value })
                            }
                            className="w-full bg-[#1C1A17] text-xs px-3.5 py-2 rounded-xl border border-white/15 text-white"
                          />
                        </div>

                        <div>
                          <label className="block font-mono text-[10px] text-white/60 uppercase mb-1">
                            FEATURES (ONE PER LINE)
                          </label>
                          <textarea
                            rows={4}
                            value={tier.features.join('\n')}
                            onChange={(e) =>
                              updateMembershipTier(tier.id, {
                                features: e.target.value.split('\n').filter(Boolean),
                              })
                            }
                            className="w-full bg-[#1C1A17] text-xs px-3.5 py-2.5 rounded-xl border border-white/15 text-white resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: TIMETABLE & LIVE FLOOR CAPACITY (STAFF PORTAL) */}
              {activeTab === 'timetable' && (
                <div className="space-y-8 max-w-4xl">
                  <div>
                    <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                      DAILY TIMETABLE & LIVE OCCUPANCY CONTROLLER
                    </h3>
                    <p className="font-sans text-xs text-white/60">
                      Front-desk staff can override live floor capacity in real time and update class reservation availability.
                    </p>
                  </div>

                  {/* Staff Live Floor Occupancy Override Bar */}
                  <div className="p-6 rounded-3xl bg-[#141311] border border-[#D9381E]/40 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#D9381E]" />
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                          LIVE FLOOR OCCUPANCY OVERRIDE
                        </span>
                      </div>
                      <span className="font-mono text-xs font-black text-[#C5A059]">
                        {brand.liveOccupancyOverride !== null
                          ? `${brand.liveOccupancyOverride}% (MANUAL OVERRIDE)`
                          : 'AUTOMATIC ALGORITHMIC CURVE'}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min={10}
                        max={98}
                        value={brand.liveOccupancyOverride ?? 55}
                        onChange={(e) =>
                          setLiveOccupancyOverride(parseInt(e.target.value) || 55)
                        }
                        className="w-full accent-[#D9381E] cursor-pointer"
                      />
                      <button
                        type="button"
                        onClick={() => setLiveOccupancyOverride(null)}
                        className="shrink-0 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                      >
                        RESET AUTO
                      </button>
                    </div>
                  </div>

                  {/* Timetable Session Slots */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#C5A059] uppercase tracking-wider">
                        SCHEDULE SESSIONS
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const newSlot: TimetableSlot = {
                            id: `slot-${Date.now()}`,
                            day: 'ALL',
                            time: '14:00 – 15:30',
                            duration: '60 MIN',
                            title: 'AFTERNOON POWER & CORE REALIGNMENT',
                            coach: 'Floor Trainer',
                            zone: 'Gym Floor',
                            slotsLeft: 6,
                            category: 'strength',
                          };
                          addTimetableSlot(newSlot);
                          showToast('Class session added!');
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#D9381E] text-white font-mono text-xs font-bold cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>ADD CLASS</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {timetableSlots.map((slot) => (
                        <div
                          key={slot.id}
                          className="p-4 rounded-2xl bg-[#141311] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3"
                        >
                          <div className="flex-1 space-y-1">
                            <input
                              type="text"
                              value={slot.title}
                              onChange={(e) =>
                                updateTimetableSlot(slot.id, { title: e.target.value.toUpperCase() })
                              }
                              className="w-full font-display text-sm font-bold bg-transparent text-white border-b border-transparent hover:border-white/20 focus:border-[#D9381E] focus:outline-none"
                            />
                            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-white/60">
                              <input
                                type="text"
                                value={slot.time}
                                onChange={(e) =>
                                  updateTimetableSlot(slot.id, { time: e.target.value })
                                }
                                className="bg-[#1C1A17] px-2 py-0.5 rounded border border-white/15 w-32 text-center"
                              />
                              <input
                                type="text"
                                value={slot.coach}
                                onChange={(e) =>
                                  updateTimetableSlot(slot.id, { coach: e.target.value })
                                }
                                className="bg-[#1C1A17] px-2 py-0.5 rounded border border-white/15 w-40 text-center"
                              />
                              <span>Zone: {slot.zone}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 font-mono text-xs">
                              <span className="text-white/60">SLOTS:</span>
                              <input
                                type="number"
                                min={0}
                                max={20}
                                value={slot.slotsLeft}
                                onChange={(e) =>
                                  updateTimetableSlot(slot.id, {
                                    slotsLeft: parseInt(e.target.value) || 0,
                                  })
                                }
                                className="w-14 bg-[#1C1A17] font-bold text-center px-1 py-1 rounded border border-white/15 text-[#D9381E]"
                              />
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete session: ${slot.title}?`)) {
                                  deleteTimetableSlot(slot.id);
                                  showToast('Session removed.');
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: LEADS CRM & CONFIG EXPORT/IMPORT */}
              {activeTab === 'leads' && (
                <div className="space-y-8 max-w-5xl">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                        CLIENT LEADS CRM & CONTRACT DOSSIER
                      </h3>
                      <p className="font-sans text-xs text-white/60">
                        All trial passes and contract inquiries submitted on the live site are collected here.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleExportConfig}
                        className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>EXPORT ALL LEADS & CONFIG</span>
                      </button>
                    </div>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="p-12 rounded-3xl bg-[#141311] border border-white/10 text-center space-y-3">
                      <Inbox className="w-10 h-10 text-white/20 mx-auto" />
                      <p className="font-mono text-xs text-white/50">
                        No inquiries submitted yet. When a visitor submits the "Book Free Visit / Trial" contract form, it will appear here in real time.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.map((lead) => {
                        const whatsappMsg = encodeURIComponent(
                          `Hello ${lead.name}! This is Shilpa's Gym & Salon regarding your trial pass inquiry for: ${
                            lead.selectedTrack || 'Trial Pass'
                          }.`
                        );
                        return (
                          <div
                            key={lead.id}
                            className="p-4 sm:p-5 rounded-2xl bg-[#141311] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2.5">
                                <span className="font-display text-sm font-extrabold text-white">
                                  {lead.name}
                                </span>
                                <span className="font-mono text-xs text-white/50">
                                  {new Date(lead.createdAt).toLocaleDateString()}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-white/70">
                                <span className="text-[#C5A059] font-bold">
                                  {lead.selectedTrack || 'General Inquiry'}
                                </span>
                                <span>•</span>
                                <span>{lead.timeWindow || 'Anytime'}</span>
                                {lead.email && (
                                  <>
                                    <span>•</span>
                                    <span>{lead.email}</span>
                                  </>
                                )}
                              </div>

                              {lead.notes && (
                                <p className="font-sans text-xs text-white/60 italic pt-1">
                                  “{lead.notes}”
                                </p>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-2.5">
                              {/* Status Selector */}
                              <select
                                value={lead.status}
                                onChange={(e) =>
                                  updateLeadStatus(lead.id, e.target.value as LeadInquiry['status'])
                                }
                                className="bg-[#1C1A17] font-mono text-xs font-bold text-white px-3 py-1.5 rounded-xl border border-white/15 focus:outline-none"
                              >
                                <option value="NEW">● NEW</option>
                                <option value="CONTACTED">● CONTACTED</option>
                                <option value="TRIAL_BOOKED">● TRIAL BOOKED</option>
                                <option value="CONVERTED">● CONVERTED</option>
                              </select>

                              {/* 1-Click WhatsApp Reply */}
                              <a
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${whatsappMsg}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-mono text-xs font-bold transition-all shadow-sm"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>REPLY WA</span>
                              </a>

                              <a
                                href={`tel:${lead.phone}`}
                                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                                title="Call Member"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPortalModal;
