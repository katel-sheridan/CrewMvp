import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ShowcaseLightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export function ShowcaseLightbox({ images, initialIndex, onClose }: ShowcaseLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
      if (e.key === 'ArrowRight') setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-[-48px] right-0 size-[36px] rounded-full bg-[#212226] border border-[#323339] flex items-center justify-center cursor-pointer hover:bg-[#2a2a2e] transition-colors z-10"
        >
          <X size={18} className="text-[rgba(255,255,255,0.87)]" />
        </button>

        {/* Prev */}
        <button
          onClick={() => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
          className="absolute left-[-56px] size-[44px] rounded-full bg-[#212226] border border-[#323339] flex items-center justify-center cursor-pointer hover:bg-[#2a2a2e] transition-colors"
        >
          <ChevronLeft size={22} className="text-[rgba(255,255,255,0.87)]" />
        </button>

        {/* Image */}
        <img
          src={images[currentIndex]}
          alt={`Showcase ${currentIndex + 1}`}
          className="max-w-[80vw] max-h-[80vh] object-contain rounded-[12px]"
        />

        {/* Next */}
        <button
          onClick={() => setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
          className="absolute right-[-56px] size-[44px] rounded-full bg-[#212226] border border-[#323339] flex items-center justify-center cursor-pointer hover:bg-[#2a2a2e] transition-colors"
        >
          <ChevronRight size={22} className="text-[rgba(255,255,255,0.87)]" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex gap-[6px]">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`size-[8px] rounded-full transition-colors cursor-pointer ${
                i === currentIndex ? 'bg-[#a5ff5f]' : 'bg-[rgba(255,255,255,0.3)]'
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="absolute top-[-48px] left-0 font-['Satoshi',sans-serif] font-[500] text-[14px] text-[rgba(255,255,255,0.6)]">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}