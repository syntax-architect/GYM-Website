import React from 'react';
import { Badge } from './Badge';

export interface SectionHeaderProps {
  index?: string;
  tag?: string;
  title: string;
  accentTitle?: string;
  description?: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'contrast';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
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
      <div className={`flex items-center gap-3 mb-4 ${isCentered ? 'justify-center' : 'justify-start'}`}>
        {index && (
          <span className={`font-mono text-xs tracking-widest font-bold ${isContrast ? 'text-[#8177FF]' : 'text-[#FF6747]'}`}>
            [{index}]
          </span>
        )}
        {tag && (
          <Badge variant={isContrast ? 'periwinkle' : 'carbon'} size="sm">
            {tag}
          </Badge>
        )}
      </div>

      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight leading-[1.08] ${
        isContrast ? 'text-[#F5F2EA]' : 'text-[#20231F]'
      }`}>
        {title}{' '}
        {accentTitle && (
          <span className={`${isContrast ? 'text-[#FF6747]' : 'text-[#FF6747]'} italic font-normal`}>
            {accentTitle}
          </span>
        )}
      </h2>

      {description && (
        <p className={`mt-4 text-base sm:text-lg font-normal leading-relaxed font-sans ${
          isContrast ? 'text-[#DDE8F8]/90' : 'text-[#4C514A]'
        }`}>
          {description}
        </p>
      )}
    </div>
  );
};
