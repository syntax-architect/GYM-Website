import React, { useState } from 'react';
import type { PulseformAsset } from '../../config/assets';

export interface MediaFrameProps {
  asset: PulseformAsset;
  aspectRatio?: '16/9' | '4/3' | '4/5' | '1/1' | 'auto';
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  reticle?: boolean;
  showOverlay?: boolean;
  overlayText?: string;
  autoPlayVideo?: boolean;
}

export const MediaFrame: React.FC<MediaFrameProps> = ({
  asset,
  aspectRatio = 'auto',
  className = '',
  imageClassName = '',
  priority = false,
  reticle = true,
  showOverlay = false,
  overlayText,
  autoPlayVideo = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClass = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '4/5': 'aspect-[4/5]',
    '1/1': 'aspect-square',
    'auto': '',
  }[aspectRatio];

  return (
    <div className={`relative overflow-hidden bg-[#FAF8F4] border border-[#20231F]/10 group rounded-sm shadow-xs ${aspectClass} ${className}`}>
      {/* Precision reticle corner markers */}
      {reticle && (
        <>
          <div className="absolute top-2.5 left-2.5 z-20 font-mono text-[10px] text-[#20231F]/30 pointer-events-none select-none">
            +
          </div>
          <div className="absolute top-2.5 right-2.5 z-20 font-mono text-[10px] text-[#20231F]/30 pointer-events-none select-none">
            +
          </div>
          <div className="absolute bottom-2.5 left-2.5 z-20 font-mono text-[10px] text-[#20231F]/30 pointer-events-none select-none">
            +
          </div>
          <div className="absolute bottom-2.5 right-2.5 z-20 font-mono text-[10px] text-[#20231F]/30 pointer-events-none select-none">
            +
          </div>
        </>
      )}

      {/* Media element */}
      {asset.type === 'video' ? (
        <video
          src={asset.src}
          poster={asset.poster}
          autoPlay={autoPlayVideo}
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] ${imageClassName}`}
          onLoadedData={() => setIsLoaded(true)}
        />
      ) : (
        <img
          src={asset.src}
          alt={asset.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] ${
            isLoaded ? 'opacity-100 filter-none' : 'opacity-80 blur-[2px]'
          } ${imageClassName}`}
        />
      )}

      {/* Subtle bottom shadow gradient for legibility */}
      {showOverlay && (
        <div className="absolute bottom-0 inset-x-0 p-5 z-20 bg-gradient-to-t from-[#20231F]/90 via-[#20231F]/40 to-transparent">
          <p className="font-mono text-[10px] text-[#FF6747] uppercase tracking-widest mb-1 font-semibold">
            {asset.id} // {asset.category}
          </p>
          <p className="font-display text-base font-bold text-white uppercase tracking-tight">
            {overlayText || asset.title}
          </p>
          {asset.subtitle && (
            <p className="text-xs text-white/80 line-clamp-1 mt-0.5 font-sans">
              {asset.subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
