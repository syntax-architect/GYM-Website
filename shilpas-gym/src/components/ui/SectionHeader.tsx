import React from 'react';

export interface SectionHeaderProps {
  title: string;
  accentTitle?: string;
  tag?: string;
  index?: string;
  description?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'contrast';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag,
  title,
  accentTitle,
  description,
  align = 'left',
  theme = 'light',
  className = '',
}) => {
  const isCentered = align === 'center';
  const isContrast = theme === 'contrast';

  return (
    <div className={`mb-12 md:mb-16 ${isCentered ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'} ${className}`}>
      {tag && (
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-[0.2em] mb-4 ${
          isContrast
            ? 'bg-white/10 text-[#D9381E] border border-white/15'
            : 'bg-[#141311]/10 text-[#141311] border border-[#141311]/15'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D9381E]" />
          <span>{tag}</span>
        </div>
      )}

      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight leading-[1.05] ${
        isContrast ? 'text-[#F5F2EA]' : 'text-[#0D0D0E]'
      }`}>
        {title}{' '}
        {accentTitle && (
          <span className="text-[#D9381E] block sm:inline">{accentTitle}</span>
        )}
      </h2>

      {description && (
        <p className={`mt-4 sm:mt-5 text-base sm:text-lg font-normal leading-relaxed font-sans ${
          isContrast ? 'text-[#E6DEC8]' : 'text-[#3E423C]'
        }`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
