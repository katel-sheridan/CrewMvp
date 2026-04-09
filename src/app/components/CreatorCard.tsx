import { useState } from 'react';
import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import type { Creator } from '../data/mock-data';
import { useSavedItems } from '../context/SavedItemsContext';
import { InterestTagPillCompactList } from './InterestTagPill';

interface CreatorCardProps {
  creator: Creator;
  onClick?: () => void;
}

export function CreatorCard({ creator, onClick }: CreatorCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const { isCreatorSaved, toggleSaveCreator } = useSavedItems();
  const saved = isCreatorSaved(creator.id);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? creator.portfolioImages.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === creator.portfolioImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="bg-[#212226] rounded-[8px] overflow-hidden cursor-pointer group transition-all hover:ring-1 hover:ring-[#323339]"
      onClick={onClick}
    >
      {/* Image Carousel */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        {creator.portfolioImages.map((img, i) => (
          <img
            key={i}
            alt={`${creator.username} portfolio ${i + 1}`}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${
              i === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            src={img}
          />
        ))}

        {/* Skill tags — top left of image (work-related: Illustration, Hobby, etc.) */}
        <div className="absolute top-[12px] left-[12px] flex gap-[6px] flex-wrap max-w-[70%] z-10">
          {creator.skillTags.map((tag) => (
            <span
              key={tag}
              className="flex h-[22px] items-center px-[10px] rounded-[12px] bg-[rgba(39,39,39,0.87)] border border-[#323339] font-['Satoshi',sans-serif] font-[500] text-[12px] text-[rgba(255,255,255,0.87)] whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
          {creator.duration && creator.duration !== 'Any' && (
            <span
              className="flex h-[22px] items-center px-[10px] rounded-[12px] bg-[rgba(39,39,39,0.87)] border border-[#323339] font-['Satoshi',sans-serif] font-[500] text-[12px] text-[rgba(255,255,255,0.87)] whitespace-nowrap"
            >
              {creator.duration}
            </span>
          )}
        </div>

        {/* Carousel arrows */}
        <button
          onClick={prevImage}
          className="absolute left-[12px] top-1/2 -translate-y-1/2 bg-[rgba(39,39,39,0.87)] border border-[#323339] size-[25px] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]"
        >
          <ChevronLeft size={15} className="text-[rgba(255,255,255,0.87)]" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-[12px] top-1/2 -translate-y-1/2 bg-[rgba(39,39,39,0.87)] border border-[#323339] size-[25px] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]"
        >
          <ChevronRight size={15} className="text-[rgba(255,255,255,0.87)]" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 flex gap-[4px]">
          {creator.portfolioImages.map((_, i) => (
            <div
              key={i}
              className={`size-[6px] rounded-full transition-colors ${
                i === currentImage ? 'bg-white' : 'bg-[rgba(255,255,255,0.4)]'
              }`}
            />
          ))}
        </div>

        {/* Save button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveCreator(creator.id);
          }}
          className="absolute top-[12px] right-[12px] flex items-center justify-center size-[33px] rounded-full bg-[rgba(39,39,39,0.87)] border border-[#323339] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)] z-10"
        >
          <Bookmark size={14} className={saved ? 'fill-[#B4FF79] text-[#B4FF79]' : 'text-[rgba(255,255,255,0.87)]'} strokeWidth={1.5} />
        </button>
      </div>

      {/* Card info */}
      <div className="flex flex-col gap-[10px] p-[16px]">
        {/* Avatar + Username */}
        <div className="flex gap-[8px] items-center">
          {creator.avatar ? (
            <img
              alt=""
              src={creator.avatar}
              className="size-[28px] rounded-full object-cover shrink-0 ring-1 ring-[#323339]"
            />
          ) : (
            <div className="size-[28px] rounded-full bg-[#a5ff5f] flex items-center justify-center shrink-0">
              <span className="font-['Satoshi',sans-serif] font-[700] text-[12px] text-black">
                {creator.username.replace('@', '').charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <span className="font-['Satoshi',sans-serif] font-[500] text-[14px] text-[rgba(255,255,255,0.87)] leading-[1.4]">
            {creator.username}
          </span>
        </div>

        {/* Interest tags */}
        <InterestTagPillCompactList tags={creator.interestTags} minVisible={1} />

        {/* Bio */}
        <p className="font-['Satoshi',sans-serif] font-[400] leading-[1.4] text-[14px] text-[rgba(255,255,255,0.6)] line-clamp-2">
          {creator.bio}
        </p>
      </div>
    </div>
  );
}