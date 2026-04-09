import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Bookmark, Clock, Globe, Eye, ChevronDown, ExternalLink, User } from 'lucide-react';
import { creators, projects, getCreatorAvatarByUsername, getCreatorIdByUsername, getCreatorSidebarLinkEntries } from '../data/mock-data';
import { useSavedItems } from '../context/SavedItemsContext';
import { ShowcaseLightbox } from './ShowcaseLightbox';
import { MessageRequestModal } from './MessageRequestModal';
import { ProjectDetailModal } from './ProjectDetailModal';
import { LinkPlatformIcon } from './LinkPlatformIcon';
import { InterestTagPillList } from './InterestTagPill';

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
      <div className="flex items-center justify-center min-h-[420px]">
        <div className="bg-[#212226] border border-[#323339] rounded-[16px] p-[24px] max-w-[460px] w-full">
          <div className="size-[48px] rounded-[12px] bg-[rgba(39,39,39,0.87)] border border-[#323339] flex items-center justify-center mb-[14px]">
            <User size={18} className="text-[#a5ff5f]" strokeWidth={1.5} />
          </div>
          <h2 className="font-['Tahoma',sans-serif] font-[700] text-[18px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
            Creator not found
          </h2>
          <p className="mt-[8px] font-['Satoshi',sans-serif] text-[14px] text-[rgba(255,255,255,0.6)] leading-[1.5]">
            This profile may have been removed or the link is incorrect.
          </p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-[16px] inline-flex items-center justify-center h-[40px] px-[16px] rounded-[8px] border border-[#323339] bg-[#2a2a2e] hover:bg-[#323339] transition-colors cursor-pointer"
          >
            <span className="font-['Satoshi',sans-serif] font-[600] text-[14px] text-[rgba(255,255,255,0.87)]">
              Go back
            </span>
          </button>
        </div>
      </div>
    );
  }

  const isOpen = creator.availability === 'Open';
  const saved = isCreatorSaved(creator.id);
  const visibleTestimonials = showAllTestimonials ? creator.testimonials : creator.testimonials.slice(0, 2);
  const selectedProject = selectedProjectId ? projects.find((p) => p.id === selectedProjectId) ?? null : null;
  const sidebarLinks = getCreatorSidebarLinkEntries(creator);
  const collabStyleTags = [creator.duration !== 'Any' ? creator.duration : null, creator.paymentType !== 'Any' ? creator.paymentType : null].filter(
    Boolean
  ) as string[];

  return (
    <div className="flex flex-col gap-[40px] w-full">
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
      <div className="flex gap-[40px] items-start w-full">
        {/* Left sidebar */}
        <div className="flex flex-col gap-[20px] w-[280px] shrink-0 sticky top-[106px]">
          {/* Profile Card */}
          <div className="flex flex-col gap-[20px] items-center bg-[#212226] border border-[#323339] rounded-[16px] p-[28px] overflow-hidden">
            {/* Banner + avatar (Discord-style) */}
            <div className="w-[calc(100%+56px)] -mx-[28px] -mt-[28px] relative">
              <div className="h-[84px] w-full relative overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: creator.profileBannerColor ?? '#272727' }}
                />
              </div>

              <div className="absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2">
                {creator.avatar ? (
                  <img
                    alt=""
                    src={creator.avatar}
                    className="size-[92px] rounded-full object-cover shrink-0 border border-[#323339] bg-[#212226]"
                  />
                ) : (
                  <div className="size-[92px] rounded-full bg-gradient-to-br from-[#a5ff5f] to-[#78ffd6] flex items-center justify-center shrink-0 shadow-[0px_0px_32px_rgba(165,255,95,0.3)] border border-[#323339]">
                    <span className="font-['Tahoma',sans-serif] font-[700] text-[36px] text-black">
                      {creator.username.replace('@', '').charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Spacer to account for avatar overlap */}
            <div className="h-[28px]" />

            {/* Username */}
            <span className="font-['Satoshi',sans-serif] font-[700] text-[18px] text-[rgba(255,255,255,0.87)]">
              {creator.username}
            </span>

            {/* Work tags — same styling as creator tab (carousel skill pills) */}
            <div className="flex gap-[6px] flex-wrap justify-center">
              {creator.skillTags.map((tag) => (
                <span
                  key={tag}
                  className="flex h-[22px] items-center px-[10px] rounded-[12px] bg-[#272727 border border-[#323339] font-['Satoshi',sans-serif] font-[500] text-[12px] text-[rgba(255,255,255,0.87)] whitespace-nowrap"
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

            {/* Meta info — labeled rows */}
            <div className="flex flex-col gap-[14px] w-full">
              <div className="flex flex-col gap-[6px]">
                <span className="font-['Satoshi',sans-serif] font-[500] text-[10px] text-[rgba(255,255,255,0.38)] uppercase tracking-[0.6px]">
                  Local time
                </span>
                <div className="flex gap-[10px] items-center">
                  <Clock size={14} className="text-[rgba(255,255,255,0.4)] shrink-0" strokeWidth={1.5} />
                  <span className="font-['Satoshi',sans-serif] font-[400] text-[13px] text-[rgba(255,255,255,0.6)]">
                    {creator.localTime}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[6px]">
                <span className="font-['Satoshi',sans-serif] font-[500] text-[10px] text-[rgba(255,255,255,0.38)] uppercase tracking-[0.6px]">
                  Languages
                </span>
                <div className="flex gap-[10px] items-center">
                  <Globe size={14} className="text-[rgba(255,255,255,0.4)] shrink-0" strokeWidth={1.5} />
                  <span className="font-['Satoshi',sans-serif] font-[400] text-[13px] text-[rgba(255,255,255,0.6)]">
                    {creator.languages.join(' / ')}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[6px]">
                <span className="font-['Satoshi',sans-serif] font-[500] text-[10px] text-[rgba(255,255,255,0.38)] uppercase tracking-[0.6px]">
                  Last seen
                </span>
                <div className="flex gap-[10px] items-center">
                  <Eye size={14} className="text-[rgba(255,255,255,0.4)] shrink-0" strokeWidth={1.5} />
                  <span
                    className={`font-['Satoshi',sans-serif] font-[400] text-[13px] ${
                      creator.lastSeen === 'Online now' ? 'text-[#4ade80]' : 'text-[rgba(255,255,255,0.6)]'
                    }`}
                  >
                    {creator.lastSeen}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-[#323339]" />

            {/* Links — socials + portfolio merged (max 4), same rows as prior design */}
            {sidebarLinks.length > 0 && (
              <>
                <div className="flex flex-col gap-[10px] w-full">
                  <span className="font-['Satoshi',sans-serif] font-[700] text-[11px] text-[rgba(255,255,255,0.4)] uppercase tracking-[0.8px]">
                    Links
                  </span>
                  <div className="flex flex-col gap-[8px] w-full">
                    {sidebarLinks.map((entry) =>
                      entry.kind === 'social' ? (
                        <a
                          key={`social-${entry.social.platform}-${entry.social.handle}`}
                          href={entry.social.url}
                          onClick={(e) => e.preventDefault()}
                          title={`${entry.social.platform}: ${entry.social.handle}`}
                          className="flex gap-[10px] items-center min-h-[40px] px-[10px] py-[6px] rounded-[8px] bg-[#2a2a2e] hover:bg-[#323339] transition-colors cursor-pointer"
                        >
                          <span className="size-[32px] rounded-full bg-[#272727] flex items-center justify-center shrink-0 border border-[#323339]">
                            <LinkPlatformIcon platform={entry.social.platform} className="size-[18px]" />
                          </span>
                          <span className="flex-1 min-w-0 font-['Satoshi',sans-serif] font-[400] text-[13px] text-[rgba(255,255,255,0.87)] truncate">
                            {entry.social.handle}
                          </span>
                          <ExternalLink size={12} className="text-[rgba(255,255,255,0.3)] shrink-0" strokeWidth={1.5} />
                        </a>
                      ) : (
                        <a
                          key={`portfolio-${entry.link.platform}-${entry.idx}`}
                          href={entry.link.url}
                          onClick={(e) => e.preventDefault()}
                          title={entry.link.platform}
                          className="flex gap-[10px] items-center min-h-[40px] px-[10px] py-[6px] rounded-[8px] bg-[#2a2a2e] hover:bg-[#323339] transition-colors cursor-pointer"
                        >
                          <span className="size-[32px] rounded-full bg-[#272727] flex items-center justify-center shrink-0 border border-[#323339]">
                            <LinkPlatformIcon platform={entry.link.platform} className="size-[18px]" />
                          </span>
                          <span className="flex-1 min-w-0 font-['Satoshi',sans-serif] font-[400] text-[13px] text-[rgba(255,255,255,0.87)] truncate">
                            {entry.link.platform}
                          </span>
                          <ExternalLink size={12} className="text-[rgba(255,255,255,0.3)] shrink-0" strokeWidth={1.5} />
                        </a>
                      )
                    )}
                  </div>
                </div>

                <div className="w-full h-px bg-[#323339]" />
              </>
            )}

            {/* Fandoms & Interests */}
            <div className="flex flex-col gap-[10px] w-full">
              <span className="font-['Satoshi',sans-serif] font-[700] text-[11px] text-[rgba(255,255,255,0.4)] uppercase tracking-[0.8px]">
                Fandoms & Interests
              </span>
              <InterestTagPillList tags={creator.interestTags} />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col gap-[36px] min-w-0">
          {/* Collab status banner */}
          {isOpen && (
            <div className="flex gap-[16px] items-center px-[20px] py-[16px] rounded-[12px] bg-[rgba(74,222,128,0.06)] border border-[rgba(74,222,128,0.2)]">
              <div className="size-[8px] rounded-full bg-[#4ade80] shrink-0 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" />
              <div className="flex-1">
                <p className="font-['Satoshi',sans-serif] font-[700] text-[14px] text-[#4ade80]">
                  Open to Collaborations
                </p>
                <p className="font-['Satoshi',sans-serif] font-[400] text-[13px] text-[rgba(255,255,255,0.5)] leading-[1.4]">
                  {creator.maxProjects != null
                    ? `Accepting up to ${creator.maxProjects} project${creator.maxProjects === 1 ? '' : 's'}`
                    : 'Send a message request to discuss timing and scope.'}
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
          <div className="flex flex-col gap-[20px] bg-[#212226] border border-[#323339] rounded-[16px] p-[28px]">
            <h2 className="font-['Satoshi',sans-serif] font-[700] text-[20px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
              About Me
            </h2>
            <p className="font-['Satoshi',sans-serif] font-[400] text-[15px] text-[rgba(255,255,255,0.7)] leading-[1.6]">
              {creator.aboutMe}
            </p>
          </div>

          {/* Showcase */}
          <div className="flex flex-col gap-[20px]">
            <h2 className="font-['Satoshi',sans-serif] font-[700] text-[20px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
              Showcase
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-[14px]">
              {creator.showcaseImages.length === 0 ? (
                <div className="col-span-full bg-[#212226] border border-[#323339] rounded-[16px] p-[24px]">
                  <p className="font-['Satoshi',sans-serif] text-[14px] text-[rgba(255,255,255,0.6)]">
                    No showcase items yet.
                  </p>
                </div>
              ) : (
                creator.showcaseImages.map((img, i) => (
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
                ))
              )}
            </div>
          </div>

          {/* My Collaboration Style — below showcase; work-style tags match homepage pills */}
          <div className="flex flex-col gap-[20px] bg-[#212226] border border-[#323339] rounded-[16px] p-[28px]">
            <h2 className="font-['Satoshi',sans-serif] font-[700] text-[20px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
              My Collaboration Style
            </h2>
            <p className="font-['Satoshi',sans-serif] font-[400] text-[15px] text-[rgba(255,255,255,0.7)] leading-[1.6]">
              {creator.collabVoice}
            </p>
            {collabStyleTags.length > 0 && (
              <div className="flex gap-[6px] flex-wrap pt-[4px]">
                {collabStyleTags.map((tag) => (
                  <span
                    key={tag}
                    className="flex h-[22px] items-center px-[10px] rounded-[12px] bg-[#272727 border border-[#323339] font-['Satoshi',sans-serif] font-[500] text-[12px] text-[rgba(255,255,255,0.87)] whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Recent Collaborations */}
          {creator.recentCollabs.length > 0 && (
            <div className="flex flex-col gap-[20px]">
              <h2 className="font-['Satoshi',sans-serif] font-[700] text-[20px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
                Recent Collaborations
              </h2>
              <div className="flex flex-col gap-[14px]">
                {creator.recentCollabs.map((collab) => {
                  const thumb =
                    collab.projectId != null
                      ? (projects.find((p) => p.id === collab.projectId)?.thumbnail ?? collab.thumbnail)
                      : collab.thumbnail;
                  const listingOpen = collab.listingStatus === 'Open';
                  return (
                    <div
                      key={collab.id}
                      onClick={() => {
                        if (collab.projectId) {
                          setSelectedProjectId(collab.projectId);
                          return;
                        }
                        const match = projects.find((p) => p.title === collab.title);
                        if (match) setSelectedProjectId(match.id);
                      }}
                      className="flex gap-[16px] items-center bg-[#212226] border border-[#323339] rounded-[12px] p-[18px] hover:bg-[#2a2a2e] transition-colors cursor-pointer group"
                    >
                      <div className="size-[64px] rounded-[8px] overflow-hidden shrink-0 bg-[#2a2a2e]">
                        <img
                          src={thumb}
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
                      <span
                        className={`flex h-[22px] items-center px-[10px] rounded-[12px] font-['Satoshi',sans-serif] font-[500] text-[10px] uppercase tracking-[0.4px] shrink-0 ${
                          listingOpen
                            ? 'bg-[rgba(74,222,128,0.12)] border border-[rgba(74,222,128,0.45)] text-[#4ade80]'
                            : 'bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.4)]'
                        }`}
                      >
                        {listingOpen ? 'Open' : 'Closed'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Testimonials / Recommendations */}
          {creator.testimonials.length > 0 && (
            <div className="flex flex-col gap-[20px]">
              <h2 className="font-['Satoshi',sans-serif] font-[700] text-[20px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
                Recommendations
              </h2>
              <div className="flex flex-col gap-[14px]">
                {visibleTestimonials.map((t) => {
                  const recAvatar = getCreatorAvatarByUsername(t.author);
                  const recInitial = t.author.replace('@', '').charAt(0).toUpperCase();
                  const authorProfileId = getCreatorIdByUsername(t.author);
                  const inner = (
                    <>
                      {recAvatar ? (
                        <img
                          alt=""
                          src={recAvatar}
                          className="size-[36px] rounded-full object-cover shrink-0 ring-1 ring-[#323339]"
                        />
                      ) : (
                        <div className="size-[36px] rounded-full bg-gradient-to-br from-[#a5ff5f] to-[#78ffd6] flex items-center justify-center shrink-0">
                          <span className="font-['Tahoma',sans-serif] font-[700] text-[12px] text-black">
                            {recInitial}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col gap-[8px] min-w-0 text-left">
                        <span className="font-['Satoshi',sans-serif] font-[700] text-[14px] text-[rgba(255,255,255,0.87)]">
                          {t.author}
                        </span>
                        <p className="font-['Satoshi',sans-serif] font-[400] text-[14px] text-[rgba(255,255,255,0.6)] leading-[1.5]">
                          "{t.text}"
                        </p>
                      </div>
                    </>
                  );
                  return authorProfileId ? (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => navigate(`/creator/${authorProfileId}`)}
                      className="flex gap-[14px] bg-[#212226] border border-[#323339] rounded-[12px] p-[22px] w-full cursor-pointer hover:bg-[#2a2a2e] transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a5ff5f]/40"
                    >
                      {inner}
                    </button>
                  ) : (
                    <div key={t.id} className="flex gap-[14px] bg-[#212226] border border-[#323339] rounded-[12px] p-[22px]">
                      {inner}
                    </div>
                  );
                })}
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