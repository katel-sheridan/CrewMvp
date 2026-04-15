import { useState, useRef, useEffect } from 'react';
import { Grid2x2, Palette, PenLine, Monitor, Mic, Music, Box, ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '../data/mock-data';
import imgAll from "../../assets/categories/all.png";
import imgIllustration from "../../assets/categories/illustration.png";
import imgWriting from "../../assets/categories/writing.png";
import imgDevelopment from "../../assets/categories/development.png";
import imgVoiceActing from "../../assets/categories/voice-acting.png";
import imgComposing from "../../assets/categories/composing.png";
import img3dModelling from "../../assets/categories/3d-modelling.png";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  grid: Grid2x2,
  palette: Palette,
  pencil: PenLine,
  computer: Monitor,
  mic: Mic,
  music: Music,
  box: Box,
};

const bgImages: Record<string, string> = {
  all: imgAll,
  illustration: imgIllustration,
  writing: imgWriting,
  development: imgDevelopment,
  'voice-acting': imgVoiceActing,
  composing: imgComposing,
  '3d-modelling': img3dModelling,
};

interface CategoryFilterProps {
  selected: string;
  onSelect: (id: string) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showRightChevron, setShowRightChevron] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftChevron(scrollLeft > 0);
      setShowRightChevron(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  useEffect(() => {
    checkScroll();
    const current = scrollRef.current;
    if (current) {
      current.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        current.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  return (
    <div className="flex flex-col gap-[8px] items-start w-full">
      <h1 className="font-['Tahoma',sans-serif] font-[700] leading-[1.1] text-[28px] sm:text-[34px] lg:text-[40px] text-[rgba(255,255,255,0.87)] max-w-[100%]">
        Explore creatives around you.
      </h1>
      <p className="font-['Satoshi',sans-serif] font-[400] leading-[1.4] text-[16px] sm:text-[18px] lg:text-[20px] text-[rgba(255,255,255,0.6)] max-w-[100%]">
        Find projects to join, or cool people to vibe with.
      </p>
      <div className="relative w-full mt-[40px]">
        {/* Left fade */}
        {showLeftChevron && (
          <div className="absolute left-0 top-0 bottom-0 w-[60px] z-10 pointer-events-none bg-gradient-to-r from-[#0e0c13] to-transparent" />
        )}

        {/* Right fade */}
        {showRightChevron && (
          <div className="absolute right-0 top-0 bottom-0 w-[60px] z-10 pointer-events-none bg-gradient-to-l from-[#0e0c13] to-transparent" />
        )}

        {/* Left chevron */}
        {showLeftChevron && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 sm:left-[-20px] top-1/2 -translate-y-1/2 z-20 bg-[#212226] border border-[#323339] size-[36px] sm:size-[40px] rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-[#2a2a2e] transition-colors"
          >
            <ChevronLeft size={20} className="text-[rgba(255,255,255,0.87)]" strokeWidth={2} />
          </button>
        )}

        {/* Right chevron */}
        {showRightChevron && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 sm:right-[-20px] top-1/2 -translate-y-1/2 z-20 bg-[#212226] border border-[#323339] size-[36px] sm:size-[40px] rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-[#2a2a2e] transition-colors"
          >
            <ChevronRight size={20} className="text-[rgba(255,255,255,0.87)]" strokeWidth={2} />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-[16px] items-center w-full overflow-x-hidden pb-[6px]"
          onLoad={checkScroll}
        >
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon];
            const isSelected = selected === cat.id;
            const bgImage = bgImages[cat.id] ?? bgImages.all;
            return (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className={`relative flex flex-col items-center justify-center h-[104px] min-w-[125px] px-[24px] py-[24px] rounded-[8px] cursor-pointer shrink-0 transition-all ${
                  cat.id === 'all' ? 'w-[125px]' : 'w-[216px]'
                }`}
              >
                {/* Background */}
                <div className="absolute inset-0 pointer-events-none rounded-[8px]">
                  <div className="absolute bg-[#212226] inset-0 rounded-[16px]" />
                  <img alt="" className="absolute max-w-none object-cover opacity-40 rounded-[16px] size-full" src={bgImage} />
                  <div className="absolute inset-0 rounded-[16px] bg-black/45" />
                </div>
                {/* Selected border */}
                {isSelected && (
                  <div className="absolute border-2 border-[#a5ff5f] inset-0 pointer-events-none rounded-[16px]" />
                )}
                <div className="flex flex-col gap-[8px] items-center relative z-10">
                  {Icon && <Icon size={cat.icon === 'computer' ? 28 : cat.icon === 'palette' || cat.icon === 'mic' || cat.icon === 'music' || cat.icon === 'box' ? 24 : 20} className="text-[rgba(255,255,255,0.87)]" strokeWidth={1.5} />}
                  <span className="font-['Satoshi',sans-serif] font-[700] leading-[1.1] text-[18px] text-[rgba(255,255,255,0.87)] text-center whitespace-nowrap">
                    {cat.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}