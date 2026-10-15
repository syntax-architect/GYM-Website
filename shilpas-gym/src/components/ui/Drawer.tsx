import React, { useEffect } from 'react';
import { X } from 'lucide-react';

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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-[#20231F]/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        data-lenis-prevent
        aria-labelledby="drawer-title"
        className="relative z-10 w-full max-w-md bg-white border-l border-[#20231F]/10 h-full flex flex-col shadow-sculptural overflow-y-auto animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#20231F]/10 bg-[#FAF8F4] sticky top-0 z-20">
          <div>
            <span className="font-mono text-[10px] text-[#FF6747] uppercase tracking-widest block mb-1 font-bold">
              PULSEFORM PORTAL
            </span>
            <h3 id="drawer-title" className="font-display text-xl font-bold text-[#20231F] uppercase tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="font-sans text-xs text-[#4C514A] mt-1">{subtitle}</p>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="p-2 text-[#20231F]/60 hover:text-[#20231F] rounded-sm hover:bg-[#20231F]/5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6747]"
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
