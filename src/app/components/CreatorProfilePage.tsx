import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Bookmark, Clock, Globe, Eye, ChevronDown, ExternalLink, Star } from 'lucide-react';
import { creators, projects } from '../data/mock-data';
import { useSavedItems } from '../context/SavedItemsContext';
import { ShowcaseLightbox } from './ShowcaseLightbox';
import { MessageRequestModal } from './MessageRequestModal';
import { ProjectDetailModal } from './ProjectDetailModal';

// Social platform icons as simple text-based icons
const socialIcons: Record<string, string> = {
  Bluesky: '🦋',
  Twitter: '𝕏',
  Instagram: '📷',
  GitHub: '🐙',
  YouTube: '▶',
  SoundCloud: '☁',
  Bandcamp: '♫',
};

export function CreatorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isCreatorSaved, toggleSaveCreator } = useSavedItems();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const creator = creators.find((c) => c.id === id);

  if (!creator) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="font-['Satoshi',sans-serif] text-[rgba(255,255,255,0.6)] text-[16px]">
          Creator not found
        </p>
      </div>
    );
  }

  const isOpen = creator.availability === 'Open';
  const saved = isCreatorSaved(creator.id);
  const visibleTestimonials = showAllTestimonials ? creator.testimonials : creator.testimonials.slice(0, 2);
  const selectedProject = selectedProjectId ? projects.find(p => p.title === selectedProjectId) || null : null;

  return (
    <div className="flex flex-col gap-[24px] w-full">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex gap-[8px] items-center text-[rgba(255,255,255,0.6)] hover:text-[rgba(255,255,255,0.87)] transition-colors cursor-pointer w-fit"
      >
        <ArrowLeft size={16} strokeWidth={1.5} />
        <span className="font-['Satoshi',sans-serif] font-[500] text-[14px] leading-[1.4]">
          Back
        </span>
      </button>

      {/* Main layout */}
      <div className="flex gap-[32px] items-start w-full">
        {/* Left sidebar */}
        <div className="flex flex-col gap-[16px] w-[280px] shrink-0 sticky top-[106px]">
          {/* Profile Card */}
          <div className="flex flex-col gap-[16px] items-center bg-[#212226] rounded-[12px] p-[24px]">
            {/* Avatar */}
            <div className="size-[88px] rounded-full bg-gradient-to-br from-[#a5ff5f] to-[#78ffd6] flex items-center justify-center shrink-0 shadow-[0px_0px_32px_rgba(165,255,95,0.3)]">
              <span className="font-['Tahoma',sans-serif] font-[700] text-[36px] text-black">
                {creator.username.replace('@', '').charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Status badge */}
            <span
              className={`flex items-center h-[22px] px-[10px] rounded-[12px] font-['Satoshi',sans-serif] font-[500] text-[11px] tracking-[0.4px] uppercase whitespace-nowrap ${
                isOpen
                  ? 'bg-[rgba(74,222,128,0.15)] border border-[rgba(74,222,128,0.5)] text-[#4ade80]'
                  : 'bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.4)]'
              }`}
            >
              {isOpen ? 'Open to Collabs' : 'Closed'}
            </span>

            {/* Username */}
            <span className="font-['Satoshi',sans-serif] font-[700] text-[18px] text-[rgba(255,255,255,0.87)]">
              {creator.username}
            </span>

            {/* Work tags */}
            <div className="flex gap-[6px] flex-wrap justify-center">
              {creator.skillTags.map((tag) => (
                <span
                  key={tag}
                  className="flex h-[24px] items-center px-[12px] rounded-[12px] bg-[rgba(165,255,95,0.12)] border border-[rgba(165,255,95,0.3)] font-['Satoshi',sans-serif] font-[500] text-[12px] text-[#a5ff5f] whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-[8px] w-full">
              <button
                onClick={() => setMessageModalOpen(true)}
                className="w-full flex gap-[8px] items-center justify-center h-[40px] bg-[#a5ff5f] rounded-[8px] cursor-pointer hover:bg-[#8de649] transition-colors"
              >
                <span className="font-['Satoshi',sans-serif] font-[700] text-[14px] text-black">Send Message Request</span>
              </button>
              <button
                onClick={() => toggleSaveCreator(creator.id)}
                className={`w-full flex gap-[8px] items-center justify-center h-[40px] rounded-[8px] border cursor-pointer transition-all ${
                  saved
                    ? 'bg-[#2a2a2e] border-[#a5ff5f]'
                    : 'bg-[#212226] border-[#323339] hover:border-[#a5ff5f]'
                }`}
              >
                <Bookmark size={14} className={saved ? 'fill-[#B4FF79] text-[#B4FF79]' : 'text-[rgba(255,255,255,0.87)]'} strokeWidth={1.5} />
                <span className={`font-['Satoshi',sans-serif] font-[500] text-[13px] ${saved ? 'text-[#B4FF79]' : 'text-[rgba(255,255,255,0.87)]'}`}>
                  {saved ? 'Saved' : 'Save Profile'}
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#323339]" />

            {/* Meta info */}
            <div className="flex flex-col gap-[10px] w-full">
              <div className="flex gap-[10px] items-center">
                <Clock size={14} className="text-[rgba(255,255,255,0.4)] shrink-0" strokeWidth={1.5} />
                <span className="font-['Satoshi',sans-serif] font-[400] text-[13px] text-[rgba(255,255,255,0.6)]">
                  {creator.localTime}
                </span>
              </div>
              <div className="flex gap-[10px] items-center">
                <Globe size={14} className="text-[rgba(255,255,255,0.4)] shrink-0" strokeWidth={1.5} />
                <span className="font-['Satoshi',sans-serif] font-[400] text-[13px] text-[rgba(255,255,255,0.6)]">
                  {creator.languages.join(' / ')}
                </span>
              </div>
              <div className="flex gap-[10px] items-center">
                <Eye size={14} className="text-[rgba(255,255,255,0.4)] shrink-0" strokeWidth={1.5} />
                <span className={`font-['Satoshi',sans-serif] font-[400] text-[13px] ${
                  creator.lastSeen === 'Online now' ? 'text-[#4ade80]' : 'text-[rgba(255,255,255,0.6)]'
                }`}>
                  {creator.lastSeen}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#323339]" />

            {/* Socials */}
            <div className="flex flex-col gap-[8px] w-full">
              <span className="font-['Satoshi',sans-serif] font-[700] text-[11px] text-[rgba(255,255,255,0.4)] uppercase tracking-[0.8px]">
                Socials
              </span>
              <div className="flex gap-[8px] flex-wrap">
                {creator.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    onClick={(e) => e.preventDefault()}
                    title={`${social.platform}: ${social.handle}`}
                    className="size-[36px] rounded-full bg-[#241e31] flex items-center justify-center cursor-pointer hover:bg-[#352d42] transition-colors border border-[#352d42]"
                  >
                    <span className="text-[14px]">
                      {socialIcons[social.platform] || social.platform.charAt(0)}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#323339]" />

            {/* Interest tags */}
            <div className="flex flex-col gap-[8px] w-full">
              <span className="font-['Satoshi',sans-serif] font-[700] text-[11px] text-[rgba(255,255,255,0.4)] uppercase tracking-[0.8px]">
                Fandoms & Interests
              </span>
              <div className="flex gap-[6px] flex-wrap">
                {creator.interestTags.map((tag) => (
                  <span
                    key={tag}
                    className="flex h-[22px] items-center px-[10px] rounded-[12px] bg-[rgba(39,39,39,0.87)] font-['Satoshi',sans-serif] font-[500] text-[11px] text-[rgba(255,255,255,0.6)] whitespace-nowrap tracking-[0.275px] uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio Links */}
          <div className="flex flex-col gap-[12px] bg-[#212226] rounded-[12px] p-[20px]">
            <h3 className="font-['Satoshi',sans-serif] font-[700] text-[11px] text-[rgba(255,255,255,0.4)] uppercase tracking-[0.8px]">
              Portfolio & Links
            </h3>
            <div className="flex flex-col gap-[6px]">
              {creator.portfolioLinks.map(({ platform, url }) => (
                <a
                  key={platform}
                  href={url}
                  onClick={(e) => e.preventDefault()}
                  className="flex gap-[10px] items-center h-[36px] px-[12px] rounded-[8px] bg-[#2a2a2e] hover:bg-[#323339] transition-colors cursor-pointer"
                >
                  <span className="flex-1 font-['Satoshi',sans-serif] font-[400] text-[13px] text-[rgba(255,255,255,0.87)]">{platform}</span>
                  <ExternalLink size={12} className="text-[rgba(255,255,255,0.3)]" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col gap-[28px] min-w-0">
          {/* Collab status banner */}
          {isOpen && creator.maxProjects !== null && (
            <div className="flex gap-[16px] items-center px-[20px] py-[16px] rounded-[12px] bg-[rgba(74,222,128,0.06)] border border-[rgba(74,222,128,0.2)]">
              <div className="size-[8px] rounded-full bg-[#4ade80] shrink-0 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" />
              <div className="flex-1">
                <p className="font-['Satoshi',sans-serif] font-[700] text-[14px] text-[#4ade80]">
                  Open to Collaborations
                </p>
                <p className="font-['Satoshi',sans-serif] font-[400] text-[13px] text-[rgba(255,255,255,0.5)] leading-[1.4]">
                  Accepting up to {creator.maxProjects} projects
                </p>
              </div>
            </div>
          )}

          {!isOpen && (
            <div className="flex gap-[16px] items-center px-[20px] py-[16px] rounded-[12px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)]">
              <div className="size-[8px] rounded-full bg-[rgba(255,255,255,0.3)] shrink-0" />
              <div>
                <p className="font-['Satoshi',sans-serif] font-[700] text-[14px] text-[rgba(255,255,255,0.5)]">
                  Closed for Collaborations
                </p>
                <p className="font-['Satoshi',sans-serif] font-[400] text-[13px] text-[rgba(255,255,255,0.4)] leading-[1.4]">
                  This creator is not currently accepting new projects.
                </p>
              </div>
            </div>
          )}

          {/* About Me */}
          <div className="flex flex-col gap-[16px] bg-[#212226] rounded-[12px] p-[24px]">
            <h2 className="font-['Tahoma',sans-serif] font-[700] text-[20px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
              About Me
            </h2>
            <p className="font-['Satoshi',sans-serif] font-[400] text-[15px] text-[rgba(255,255,255,0.7)] leading-[1.6]">
              {creator.aboutMe}
            </p>
          </div>

          {/* Collaboration Preferences */}
          <div className="flex flex-col gap-[16px] bg-[#212226] rounded-[12px] p-[24px]">
            <h2 className="font-['Tahoma',sans-serif] font-[700] text-[20px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
              Collaboration Preferences
            </h2>
            <div className="grid grid-cols-2 gap-[12px]">
              {[
                { label: 'Availability', value: creator.availability },
                { label: 'Payment', value: creator.paymentType },
                { label: 'Duration', value: creator.duration },
                ...(isOpen && creator.maxProjects !== null
                  ? [{ label: 'Max Projects', value: `${creator.maxProjects}` }]
                  : []),
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-[6px] bg-[#2a2a2e] rounded-[8px] p-[16px]">
                  <span className="font-['Satoshi',sans-serif] font-[500] text-[11px] text-[rgba(255,255,255,0.4)] uppercase tracking-[0.8px]">
                    {label}
                  </span>
                  <span
                    className={`font-['Satoshi',sans-serif] font-[500] text-[14px] ${
                      label === 'Availability' && value === 'Open'
                        ? 'text-[#4ade80]'
                        : label === 'Availability' && value === 'Closed'
                        ? 'text-[rgba(255,255,255,0.4)]'
                        : 'text-[rgba(255,255,255,0.87)]'
                    }`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Showcase */}
          <div className="flex flex-col gap-[16px]">
            <h2 className="font-['Tahoma',sans-serif] font-[700] text-[20px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
              Showcase
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-[12px]">
              {creator.showcaseImages.map((img, i) => (
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

          {/* Recent Collaborations */}
          {creator.recentCollabs.length > 0 && (
            <div className="flex flex-col gap-[16px]">
              <h2 className="font-['Tahoma',sans-serif] font-[700] text-[20px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
                Recent Collaborations
              </h2>
              <div className="flex flex-col gap-[12px]">
                {creator.recentCollabs.map((collab) => (
                  <div
                    key={collab.id}
                    onClick={() => {
                      // Try to find matching project by title
                      setSelectedProjectId(collab.title);
                    }}
                    className="flex gap-[16px] items-center bg-[#212226] rounded-[12px] p-[16px] hover:bg-[#2a2a2e] transition-colors cursor-pointer group"
                  >
                    <div className="size-[64px] rounded-[8px] overflow-hidden shrink-0 bg-[#2a2a2e]">
                      <img
                        src={collab.thumbnail}
                        alt={collab.title}
                        className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col gap-[4px] flex-1 min-w-0">
                      <span className="font-['Satoshi',sans-serif] font-[700] text-[15px] text-[rgba(255,255,255,0.87)]">
                        {collab.title}
                      </span>
                      <span className="font-['Satoshi',sans-serif] font-[400] text-[13px] text-[rgba(255,255,255,0.5)]">
                        Role: {collab.role}
                      </span>
                      <div className="flex gap-[4px] items-center">
                        <span className="font-['Satoshi',sans-serif] font-[400] text-[12px] text-[rgba(255,255,255,0.4)]">
                          with {collab.collaborators.join(', ')}
                        </span>
                      </div>
                    </div>
                    <span className="flex h-[22px] items-center px-[10px] rounded-[12px] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.15)] font-['Satoshi',sans-serif] font-[500] text-[10px] text-[rgba(255,255,255,0.4)] uppercase tracking-[0.4px] shrink-0">
                      Closed
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Testimonials / Recommendations */}
          {creator.testimonials.length > 0 && (
            <div className="flex flex-col gap-[16px]">
              <h2 className="font-['Tahoma',sans-serif] font-[700] text-[20px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
                Recommendations
              </h2>
              <div className="flex flex-col gap-[12px]">
                {visibleTestimonials.map((t) => (
                  <div key={t.id} className="flex gap-[14px] bg-[#212226] rounded-[12px] p-[20px]">
                    <div className="size-[36px] rounded-full bg-[rgba(39,39,39,0.87)] flex items-center justify-center shrink-0">
                      <Star size={14} className="text-[#a5ff5f]" />
                    </div>
                    <div className="flex flex-col gap-[8px] min-w-0">
                      <span className="font-['Satoshi',sans-serif] font-[700] text-[14px] text-[rgba(255,255,255,0.87)]">
                        {t.author}
                      </span>
                      <p className="font-['Satoshi',sans-serif] font-[400] text-[14px] text-[rgba(255,255,255,0.6)] leading-[1.5]">
                        "{t.text}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {creator.testimonials.length > 2 && (
                <button
                  onClick={() => setShowAllTestimonials(!showAllTestimonials)}
                  className="flex gap-[6px] items-center justify-center h-[36px] text-[#a5ff5f] cursor-pointer hover:text-[#8de649] transition-colors"
                >
                  <span className="font-['Satoshi',sans-serif] font-[500] text-[13px]">
                    {showAllTestimonials ? 'Show less' : `Show all ${creator.testimonials.length} recommendations`}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${showAllTestimonials ? 'rotate-180' : ''}`}
                  />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {lightboxOpen && (
        <ShowcaseLightbox
          images={creator.showcaseImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {messageModalOpen && (
        <MessageRequestModal
          creatorId={creator.id}
          creatorUsername={creator.username}
          onClose={() => setMessageModalOpen(false)}
        />
      )}

      {/* Enlarged single image */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={() => setEnlargedImage(null)}
        >
          <img
            src={enlargedImage}
            alt="Enlarged"
            className="max-w-[85vw] max-h-[85vh] object-contain rounded-[12px]"
          />
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </div>
  );
}