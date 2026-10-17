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
            ? 'bg-white/10 text-[#FF6747] border border-white/15'
            : 'bg-[#174D3B]/10 text-[#174D3B] border border-[#174D3B]/15'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6747]" />
          <span>{tag}</span>
        </div>
      )}

      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight leading-[1.05] ${
        isContrast ? 'text-[#F5F2EA]' : 'text-[#20231F]'
      }`}>
        {title}{' '}
        {accentTitle && (
          <span className="text-[#FF6747] block sm:inline">{accentTitle}</span>
        )}
      </h2>

      {description && (
        <p className={`mt-4 sm:mt-5 text-base sm:text-lg font-normal leading-relaxed font-sans ${
          isContrast ? 'text-[#DDE8F8]' : 'text-[#3E423C]'
        }`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
