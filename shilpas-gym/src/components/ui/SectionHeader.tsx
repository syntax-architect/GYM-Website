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
