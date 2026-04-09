import { useState } from 'react';
import { X, Bookmark, Calendar, Clock, Tag, Users, ChevronRight, Layers } from 'lucide-react';
import { type Project, getCreatorAvatarByUsername } from '../data/mock-data';
import { useSavedItems } from '../context/SavedItemsContext';
import { ShowcaseLightbox } from './ShowcaseLightbox';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const { isProjectSaved, toggleSaveProject } = useSavedItems();
  const saved = isProjectSaved(project.id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-[40px] pointer-events-none">
        <div
          className="bg-[#1a1a1e] border border-[#323339] rounded-[16px] w-full max-w-[860px] max-h-[85vh] overflow-hidden flex flex-col pointer-events-auto shadow-[0px_24px_80px_rgba(0,0,0,0.6)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header image banner */}
          <div className="relative w-full h-[220px] shrink-0 overflow-hidden">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1e] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-black/10" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-[16px] right-[16px] size-[36px] rounded-full bg-[rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.15)] flex items-center justify-center cursor-pointer hover:bg-[rgba(0,0,0,0.7)] transition-colors z-10"
            >
              <X size={16} className="text-[rgba(255,255,255,0.87)]" strokeWidth={1.5} />
            </button>

            {/* Tags overlay */}
            <div className="absolute bottom-[16px] left-[28px] flex gap-[6px] z-10 flex-wrap pr-[28px]">
              {project.tags.map((tag) => (
                <span
                  key={tag.label}
                  className={`flex h-[24px] items-center justify-center px-[12px] py-[4px] rounded-[12px] font-['Satoshi',sans-serif] font-[500] text-[12px] text-center whitespace-nowrap ${
                    tag.type === 'featured'
                      ? 'bg-[#a5ff5f] text-black'
                      : 'bg-[rgba(39,39,39,0.87)] border border-[#323339] text-[rgba(255,255,255,0.87)]'
                  }`}
                >
                  {tag.label}
                </span>
              ))}
              {project.deadlineDays && (
                <span className="bg-[rgba(53,42,23,0.9)] border border-[#614e2d] flex h-[24px] items-center justify-center px-[10px] py-[4px] rounded-[12px] font-['Satoshi',sans-serif] font-[500] text-[12px] text-[rgba(236,215,178,0.87)] text-center whitespace-nowrap">
                  Deadline in {project.deadlineDays} days
                </span>
              )}
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-[28px] py-[24px] flex flex-col gap-[28px]">
            {/* Title & actions row */}
            <div className="flex items-start justify-between gap-[16px]">
              <div className="flex flex-col gap-[8px] min-w-0">
                <p className="font-['Satoshi',sans-serif] text-[12px] text-[rgba(255,255,255,0.38)] uppercase tracking-[0.8px]">
                  Project details
                </p>
                <h2 className="font-['Tahoma',sans-serif] font-[700] text-[28px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
                  {project.title}
                </h2>
                <div className="flex gap-[6px] font-['Satoshi',sans-serif] font-[400] text-[14px] text-[rgba(255,255,255,0.38)] leading-[1.4]">
                  <span>Listed by {project.listedBy}</span>
                  <span>· {project.timeAgo}</span>
                </div>
              </div>
              <div className="flex gap-[8px] shrink-0">
                <button
                  className="flex gap-[8px] items-center justify-center h-[40px] px-[20px] bg-[#a5ff5f] rounded-[8px] cursor-pointer hover:bg-[#8de649] transition-colors"
                >
                  <span className="font-['Satoshi',sans-serif] font-[700] text-[14px] text-black">Apply to Project</span>
                </button>
                <button
                  onClick={() => toggleSaveProject(project.id)}
                  className={`flex items-center justify-center size-[40px] rounded-[8px] border cursor-pointer transition-all ${
                    saved
                      ? 'bg-[#2a2a2e] border-[#a5ff5f]'
                      : 'bg-[#212226] border-[#323339] hover:border-[#a5ff5f]'
                  }`}
                >
                  <Bookmark size={16} className={saved ? 'fill-[#B4FF79] text-[#B4FF79]' : 'text-[rgba(255,255,255,0.87)]'} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Quick info cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-[12px]">
              {[
                { icon: Tag, label: 'Genre', value: project.genre },
                { icon: Clock, label: 'Duration', value: project.duration },
                { icon: Calendar, label: 'Started', value: project.startDate },
                { icon: Users, label: 'Status', value: project.status },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col gap-[6px] bg-[#212226] border border-[#323339] rounded-[12px] p-[16px]">
                  <div className="flex gap-[6px] items-center">
                    <Icon size={12} className="text-[rgba(255,255,255,0.4)]" strokeWidth={1.5} />
                    <span className="font-['Satoshi',sans-serif] font-[500] text-[11px] text-[rgba(255,255,255,0.4)] uppercase tracking-[0.8px]">
                      {label}
                    </span>
                  </div>
                  <span className="font-['Satoshi',sans-serif] font-[500] text-[14px] text-[rgba(255,255,255,0.87)]">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* What We're Looking For */}
            <div className="flex flex-col gap-[16px] bg-[#212226] border border-[#323339] rounded-[16px] p-[24px]">
              <h3 className="font-['Tahoma',sans-serif] font-[700] text-[20px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
                What We're Looking For
              </h3>
              <p className="font-['Satoshi',sans-serif] font-[400] text-[14px] text-[rgba(255,255,255,0.6)] leading-[1.5]">
                We're actively seeking talented collaborators to fill the following roles. If you're passionate about {project.genre.toLowerCase()} and want to contribute your skills, we'd love to hear from you.
              </p>
              <div className="flex gap-[10px] flex-wrap">
                {project.roles.map((r) => (
                  <div
                    key={r.role}
                    className="flex items-center gap-[8px] h-[32px] pl-[14px] pr-[10px] rounded-[12px] border border-[#323339] bg-[rgba(39,39,39,0.87)]"
                  >
                    <span className="font-['Satoshi',sans-serif] font-[500] text-[13px] text-[rgba(255,255,255,0.87)]">
                      {r.role}
                    </span>
                    <span className="font-['Satoshi',sans-serif] font-[400] text-[11px] text-[rgba(255,255,255,0.38)] tracking-[0.2px]">
                      {r.filled}/{r.needed}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="flex flex-col gap-[16px] bg-[#212226] border border-[#323339] rounded-[16px] p-[24px]">
              <h3 className="font-['Tahoma',sans-serif] font-[700] text-[20px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
                Overview
              </h3>
              <div className="flex flex-col gap-[12px]">
                {project.fullDescription.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="font-['Satoshi',sans-serif] font-[400] text-[15px] text-[rgba(255,255,255,0.7)] leading-[1.6]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Showcase */}
            {project.showcaseImages.length > 0 && (
              <div className="flex flex-col gap-[16px]">
                <h3 className="font-['Tahoma',sans-serif] font-[700] text-[20px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
                  Showcase
                </h3>
                <div className="grid grid-cols-3 gap-[12px]">
                  {project.showcaseImages.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setLightboxIndex(i);
                        setLightboxOpen(true);
                      }}
                      className="aspect-square rounded-[8px] overflow-hidden bg-[#212226] group cursor-pointer relative"
                    >
                      <img
                        alt={`Showcase ${i + 1}`}
                        src={img}
                        className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-[8px]" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {project.showcaseImages.length === 0 && (
              <div className="flex flex-col gap-[12px] bg-[#212226] border border-[#323339] rounded-[16px] p-[24px]">
                <div className="flex items-center gap-[10px]">
                  <div className="size-[36px] rounded-[10px] bg-[rgba(39,39,39,0.87)] border border-[#323339] flex items-center justify-center">
                    <Layers size={16} className="text-[#a5ff5f]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-['Tahoma',sans-serif] font-[700] text-[16px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
                      No showcase yet
                    </p>
                    <p className="mt-[4px] font-['Satoshi',sans-serif] text-[13px] text-[rgba(255,255,255,0.6)] leading-[1.4]">
                      This project hasn’t added screenshots or previews.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* The Team */}
            <div className="flex flex-col gap-[16px]">
              <h3 className="font-['Tahoma',sans-serif] font-[700] text-[20px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
                The Team
              </h3>
              <div className="flex flex-col gap-[8px]">
                {project.team.map((member) => {
                  const avatarSrc = member.avatar || getCreatorAvatarByUsername(member.username);
                  const initial = member.username.replace('@', '').charAt(0).toUpperCase();
                  return (
                  <div
                    key={member.username}
                    className="flex gap-[14px] items-center bg-[#212226] border border-[#323339] rounded-[16px] p-[16px] hover:bg-[#2a2a2e] transition-colors cursor-pointer group"
                  >
                    {avatarSrc ? (
                      <img
                        alt=""
                        src={avatarSrc}
                        className="size-[40px] rounded-full object-cover shrink-0 border border-[#323339]"
                      />
                    ) : (
                      <div className="size-[40px] rounded-full bg-gradient-to-br from-[#a5ff5f] to-[#78ffd6] flex items-center justify-center shrink-0">
                        <span className="font-['Satoshi',sans-serif] font-[700] text-[16px] text-black">
                          {initial}
                        </span>
                      </div>
                    )}
                    {/* Info */}
                    <div className="flex flex-col gap-[2px] flex-1 min-w-0">
                      <span className="font-['Satoshi',sans-serif] font-[700] text-[14px] text-[rgba(255,255,255,0.87)]">
                        {member.username}
                      </span>
                      <span className="font-['Satoshi',sans-serif] font-[400] text-[13px] text-[rgba(255,255,255,0.5)]">
                        {member.role}
                      </span>
                    </div>
                    <ChevronRight size={14} className="text-[rgba(255,255,255,0.2)] group-hover:text-[rgba(255,255,255,0.5)] transition-colors shrink-0" strokeWidth={1.5} />
                  </div>
                );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <ShowcaseLightbox
          images={project.showcaseImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}