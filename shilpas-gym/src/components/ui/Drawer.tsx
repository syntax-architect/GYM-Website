import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useLenis } from '../layout/useLenis';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}) => {
  const { stop, start } = useLenis();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      stop();
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      start();
      document.body.style.overflow = '';
    }

    return () => {
      start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, stop, start]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-[#0D0D0E]/60 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Panel (dialog overlay) */}
      <aside
        role="dialog"
        aria-modal="true"
        data-lenis-prevent
        aria-labelledby="drawer-title"
        data-ui="drawer" className="relative z-10 w-full max-w-md bg-white h-full flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300 shadow-2xl"
      >
        {/* Drawer Header */}
        <div className="flex items-start justify-between p-6 bg-[#FAF8F4] sticky top-0 z-20">
          <div>
            <span className="text-sm text-[#D9381E] font-bold block mb-1">
              Appointment Portal
            </span>
            <h3 id="drawer-title" className="font-display text-xl font-bold text-[#0D0D0E] uppercase tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="font-sans text-sm text-[#4C514A] mt-1">{subtitle}</p>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="w-10 h-10 rounded-full border-2 border-[#0D0D0E]/15 bg-white text-[#0D0D0E] hover:bg-[#0D0D0E] hover:text-[#F5F2EA] flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 p-6 space-y-6 bg-white">
          {children}
        </div>
      </aside>
    </div>
  );
};
