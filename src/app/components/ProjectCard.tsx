import { Bookmark } from 'lucide-react';
import type { Project } from '../data/mock-data';
import { useSavedItems } from '../context/SavedItemsContext';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { isProjectSaved, toggleSaveProject } = useSavedItems();
  const saved = isProjectSaved(project.id);

  // Truncate description to first two sentences with ellipses
  const truncateToTwoSentences = (text: string) => {
    const sentenceEndings = /[.!?]\s+/g;
    const matches = [...text.matchAll(sentenceEndings)];

    if (matches.length < 2) return text;

    const secondSentenceEnd = matches[1].index! + matches[1][0].length - 1;
    return text.slice(0, secondSentenceEnd) + '...';
  };

  const displayDescription = truncateToTwoSentences(project.description);

  return (
    <div className="bg-[#212226] rounded-[16px] flex h-[262px] items-center w-full overflow-hidden cursor-pointer group transition-all hover:ring-1 hover:ring-[#323339]" onClick={onClick}>
      {/* Thumbnail */}
      <div className="relative flex-1 h-full min-w-0">
        <div className="absolute inset-0 bg-[rgba(255,255,255,0.12)]" />
        <img alt={project.title} className="absolute inset-0 object-cover size-full" src={project.thumbnail} />
      </div>

      {/* Info */}
      <div className="w-[714px] shrink-0 h-full flex flex-col justify-center px-[20px] py-[16px] gap-[12px]">
        {/* Tags row */}
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-[6px] items-start">
            {project.tags.map((tag) => (
              <span
                key={tag.label}
                className={`flex h-[24px] items-center justify-center px-[8px] py-[4px] rounded-[12px] font-['Satoshi',sans-serif] font-[500] text-[12px] text-center whitespace-nowrap ${
                  tag.type === 'featured'
                    ? 'bg-[#a5ff5f] text-black'
                    : 'bg-[rgba(39,39,39,0.87)] border border-[#323339] text-[rgba(255,255,255,0.87)]'
                }`}
              >
                {tag.label}
              </span>
            ))}
          </div>
          <div className="flex gap-[12px] items-center">
            {project.deadlineDays && (
              <span className="bg-[#352a17] border border-[#614e2d] flex h-[24px] items-center justify-center px-[8px] py-[4px] rounded-[12px] font-['Satoshi',sans-serif] font-[500] text-[12px] text-[rgba(236,215,178,0.87)] text-center whitespace-nowrap">
                Deadline in {project.deadlineDays} days
              </span>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); toggleSaveProject(project.id); }}
              className="flex items-center justify-center size-[40px] rounded-full border border-[#323339] cursor-pointer transition-colors hover:bg-[#2a2a2e]"
            >
              <Bookmark size={14} className={saved ? 'fill-[#B4FF79] text-[#B4FF79]' : 'text-[#B4FF79]'} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-['Satoshi',sans-serif] font-[700] leading-[1.1] text-[24px] text-[rgba(255,255,255,0.87)]">
          {project.title}
        </h3>

        {/* Meta */}
        <div className="flex gap-[6px] font-['Satoshi',sans-serif] font-[400] text-[14px] text-[rgba(255,255,255,0.38)] leading-[1.4]">
          <span>Listed by {project.listedBy}</span>
          <span>· {project.timeAgo}</span>
        </div>

        {/* Description */}
        <p className="font-['Satoshi',sans-serif] font-[400] leading-[1.4] text-[16px] text-[rgba(255,255,255,0.6)]">
          {displayDescription}
        </p>

        {/* Looking for */}
        <div className="flex flex-col gap-[8px]">
          <span className="font-['Satoshi',sans-serif] font-[500] text-[12px] text-[rgba(255,255,255,0.38)]">LOOKING FOR</span>
          <div className="flex gap-[6px]">
            {project.lookingFor.map((role) => (
              <span key={role} className="flex h-[24px] items-center justify-center px-[8px] py-[4px] rounded-[12px] bg-[rgba(39,39,39,0.87)] border border-[#323339] font-['Satoshi',sans-serif] font-[500] text-[12px] text-[rgba(255,255,255,0.87)] text-center whitespace-nowrap">
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}