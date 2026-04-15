import { useState } from 'react';
import { useNavigate } from 'react-router';
import { X, Bookmark, Calendar, Clock, Users, ChevronRight, Layers, MessageSquare, Heart, Send } from 'lucide-react';
import { type Project, getCreatorAvatarByUsername, getCreatorIdByUsername } from '../data/mock-data';
import { useSavedItems } from '../context/SavedItemsContext';
import { useApplications } from '../context/ApplicationsContext';
import { ShowcaseLightbox } from './ShowcaseLightbox';
import profileAvatarUrl from '../../assets/avatars/corgiburrito.png';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const navigate = useNavigate();
  const { isProjectSaved, toggleSaveProject } = useSavedItems();
  const { applyToProject, hasPendingApplication } = useApplications();
  const saved = isProjectSaved(project.id);
  const applicationPending = hasPendingApplication(project.id);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [applyNote, setApplyNote] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const toggleLike = (commentId: string) => {
    setLikedComments((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) next.delete(commentId);
      else next.add(commentId);
      return next;
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-[16px] lg:p-[40px] pointer-events-none">
        <div
          className="bg-[#1a1a1e] border border-[#323339] rounded-t-[16px] sm:rounded-[16px] w-full max-w-[860px] max-h-[92dvh] sm:max-h-[85vh] overflow-hidden flex flex-col pointer-events-auto shadow-[0px_24px_80px_rgba(0,0,0,0.6)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header image banner */}
          <div className="relative w-full h-[140px] sm:h-[180px] lg:h-[220px] shrink-0 overflow-hidden">
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
                <span className="bg-[rgba(53,42,23,0.9)] border border-[#614e2d] flex h-[24px] items-center justify-center px-[10px] py-[4px] rounded-[12px] font-['Satoshi',sans-serif] font-[500] text-[12px] text-[rgba(251,191,36,0.87)] text-center whitespace-nowrap">
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
                <h2 className="font-['Satoshi',sans-serif] font-[700] text-[28px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
                  {project.title}
                </h2>
                <div className="flex gap-[6px] font-['Satoshi',sans-serif] font-[400] text-[14px] text-[rgba(255,255,255,0.38)] leading-[1.4]">
                  <span>Listed by {project.listedBy}</span>
                  <span>· {project.timeAgo}</span>
                </div>
              </div>
              <div className="flex gap-[8px] shrink-0 flex-wrap justify-end">
                {applicationPending ? (
                  <div className="flex items-center justify-center h-[40px] px-[20px] bg-[#2a2a2e] border border-[#614e2d] rounded-[8px]">
                    <span className="font-['Satoshi',sans-serif] font-[600] text-[14px] text-[rgba(251,191,36,1)]">Application pending</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setApplyNote('');
                      setApplyDialogOpen(true);
                    }}
                    className="flex gap-[8px] items-center justify-center h-[40px] px-[20px] bg-[#a5ff5f] rounded-[8px] cursor-pointer hover:bg-[#8de649] transition-colors"
                  >
                    <span className="font-['Satoshi',sans-serif] font-[700] text-[14px] text-black">Apply to Project</span>
                  </button>
                )}
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
              {(() => {
                const totalNeeded = project.roles.reduce((s, r) => s + r.needed, 0);
                const totalFilled = project.roles.reduce((s, r) => s + r.filled, 0);
                const deadlineLabel = project.deadlineDays != null
                  ? new Date(Date.now() + project.deadlineDays * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                  : 'No deadline';
                return [
                  { icon: Layers, label: 'Project Type', value: project.projectType },
                  { icon: Users, label: 'Roles Available', value: `${totalFilled}/${totalNeeded} filled` },
                  { icon: Calendar, label: 'Started', value: project.startDate },
                  { icon: Clock, label: 'Deadline', value: deadlineLabel },
                ];
              })().map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col gap-[6px] bg-[#212226] border border-[#323339] rounded-[12px] p-[20px]">
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
              <h3 className="font-['Satoshi',sans-serif] font-[700] text-[22px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
                What We're Looking For
              </h3>
              <p className="font-['Satoshi',sans-serif] font-[400] text-[16px] text-[rgba(255,255,255,0.6)] leading-[1.5]">
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
              <h3 className="font-['Satoshi',sans-serif] font-[700] text-[22px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
                Overview
              </h3>
              <div className="flex flex-col gap-[12px]">
                {project.fullDescription.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="font-['Satoshi',sans-serif] font-[400] text-[16px] text-[rgba(255,255,255,0.7)] leading-[1.6]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Showcase */}
            {project.showcaseImages.length > 0 && (
              <div className="flex flex-col gap-[16px]">
                <h3 className="font-['Satoshi',sans-serif] font-[700] text-[22px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
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
                    <p className="mt-[4px] font-['Satoshi',sans-serif] text-[14px] text-[rgba(255,255,255,0.6)] leading-[1.4]">
                      This project hasn’t added screenshots or previews.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* The Team */}
            <div className="flex flex-col gap-[16px]">
              <h3 className="font-['Satoshi',sans-serif] font-[700] text-[22px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
                The Team
              </h3>
              <div className="flex flex-col gap-[8px]">
                {project.team.map((member) => {
                  const avatarSrc = member.avatar || getCreatorAvatarByUsername(member.username);
                  const initial = member.username.replace('@', '').charAt(0).toUpperCase();
                  const creatorId = getCreatorIdByUsername(member.username);
                  return (
                  <div
                    key={member.username}
                    onClick={() => {
                      if (creatorId) {
                        onClose();
                        navigate(`/creator/${creatorId}`);
                      }
                    }}
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
                      <span className="font-['Satoshi',sans-serif] font-[400] text-[14px] text-[rgba(255,255,255,0.5)]">
                        {member.role}
                      </span>
                    </div>
                    <ChevronRight size={14} className="text-[rgba(255,255,255,0.2)] group-hover:text-[rgba(255,255,255,0.5)] transition-colors shrink-0" strokeWidth={1.5} />
                  </div>
                );
                })}
              </div>
            </div>

            {/* Comments */}
            <div className="flex flex-col gap-[20px]">
              <div className="flex items-center gap-[8px]">
                <MessageSquare size={18} className="text-[rgba(255,255,255,0.4)]" strokeWidth={1.5} />
                <h3 className="font-['Satoshi',sans-serif] font-[700] text-[22px] text-[rgba(255,255,255,0.87)] leading-[1.1]">
                  Comments
                </h3>
                <span className="font-['Satoshi',sans-serif] font-[500] text-[14px] text-[rgba(255,255,255,0.3)]">
                  {project.comments.length}
                </span>
              </div>

              {/* Comment input */}
              <div className="flex gap-[12px] items-start">
                <img
                  alt=""
                  src={profileAvatarUrl}
                  className="size-[32px] rounded-full object-cover shrink-0 mt-[4px]"
                />
                <div className="flex-1 flex items-center gap-[8px] bg-[#212226] border border-[#323339] rounded-[10px] px-[14px] py-[10px] focus-within:border-[#a5ff5f]/40 transition-colors">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="flex-1 bg-transparent outline-none font-['Satoshi',sans-serif] font-[400] text-[15px] text-[rgba(255,255,255,0.87)] placeholder:text-[rgba(255,255,255,0.25)]"
                  />
                  <button
                    className={`size-[30px] rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                      commentText.trim()
                        ? 'bg-[#a5ff5f] hover:bg-[#8de649]'
                        : 'bg-[#323339]'
                    }`}
                  >
                    <Send size={14} className={commentText.trim() ? 'text-black' : 'text-[rgba(255,255,255,0.3)]'} strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Comment thread */}
              {project.comments.length > 0 && (
                <div className="flex flex-col">
                  {project.comments.map((comment, idx) => {
                    const commentAvatar = getCreatorAvatarByUsername(comment.author);
                    const commentInitial = comment.author.replace('@', '').charAt(0).toUpperCase();
                    const commentCreatorId = getCreatorIdByUsername(comment.author);
                    const liked = likedComments.has(comment.id);
                    return (
                      <div
                        key={comment.id}
                        className={`flex gap-[12px] py-[16px] ${idx < project.comments.length - 1 ? 'border-b border-[#323339]/60' : ''}`}
                      >
                        <div
                          className={`shrink-0 ${commentCreatorId ? 'cursor-pointer' : ''}`}
                          onClick={() => {
                            if (commentCreatorId) {
                              onClose();
                              navigate(`/creator/${commentCreatorId}`);
                            }
                          }}
                        >
                          {commentAvatar ? (
                            <img
                              alt=""
                              src={commentAvatar}
                              className="size-[32px] rounded-full object-cover"
                            />
                          ) : (
                            <div className="size-[32px] rounded-full bg-gradient-to-br from-[#a5ff5f] to-[#78ffd6] flex items-center justify-center">
                              <span className="font-['Tahoma',sans-serif] font-[700] text-[11px] text-black">
                                {commentInitial}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-[4px] flex-1 min-w-0">
                          <div className="flex items-center gap-[8px]">
                            <span
                              className={`font-['Satoshi',sans-serif] font-[700] text-[14px] text-[rgba(255,255,255,0.87)] leading-[1] ${commentCreatorId ? 'cursor-pointer hover:text-[#a5ff5f] transition-colors' : ''}`}
                              onClick={() => {
                                if (commentCreatorId) {
                                  onClose();
                                  navigate(`/creator/${commentCreatorId}`);
                                }
                              }}
                            >
                              {comment.author}
                            </span>
                            <span className="font-['Satoshi',sans-serif] font-[400] text-[12px] text-[rgba(255,255,255,0.25)]">
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className="font-['Satoshi',sans-serif] font-[400] text-[15px] text-[rgba(255,255,255,0.6)] leading-[1.5]">
                            {comment.text}
                          </p>
                          <div className="flex items-center gap-[16px] mt-[4px]">
                            <button
                              onClick={() => toggleLike(comment.id)}
                              className="flex items-center gap-[5px] cursor-pointer group/like"
                            >
                              <Heart
                                size={14}
                                className={`transition-colors ${liked ? 'fill-red-400 text-red-400' : 'text-[rgba(255,255,255,0.25)] group-hover/like:text-[rgba(255,255,255,0.5)]'}`}
                                strokeWidth={1.5}
                              />
                              {liked && (
                                <span className="font-['Satoshi',sans-serif] font-[500] text-[12px] text-red-400">1</span>
                              )}
                            </button>
                            <button className="font-['Satoshi',sans-serif] font-[500] text-[12px] text-[rgba(255,255,255,0.25)] hover:text-[rgba(255,255,255,0.5)] transition-colors cursor-pointer">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Apply confirmation */}
      {applyDialogOpen && (
        <>
          <div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-[2px]"
            aria-hidden
            onClick={() => {
              setApplyDialogOpen(false);
              setApplyNote('');
            }}
          />
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-[20px] pointer-events-none">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="apply-dialog-title"
              className="pointer-events-auto w-full max-w-[520px] max-h-[min(90dvh,640px)] overflow-y-auto bg-[#1a1a1e] border border-[#323339] rounded-[16px] shadow-[0px_24px_80px_rgba(0,0,0,0.6)] p-[24px] sm:p-[28px] flex flex-col gap-[16px]"
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                id="apply-dialog-title"
                className="font-['Satoshi',sans-serif] font-[700] text-[20px] sm:text-[22px] text-[rgba(255,255,255,0.87)] leading-[1.25]"
              >
                Share your profile with {project.listedBy}?
              </h3>
              <p className="font-['Satoshi',sans-serif] font-[400] text-[15px] text-[rgba(255,255,255,0.6)] leading-[1.55]">
                Add a short note, then share your profile with {project.listedBy}. Your application will show as pending in{' '}
                <span className="text-[rgba(255,255,255,0.75)]">Applications</span>.
              </p>
              <textarea
                value={applyNote}
                onChange={(e) => setApplyNote(e.target.value)}
                placeholder="Hi! I’d love to help with…"
                rows={5}
                className="w-full bg-[#2a2a2e] border border-[#323339] rounded-[12px] px-[16px] py-[14px] font-['Satoshi',sans-serif] text-[16px] text-[rgba(255,255,255,0.87)] placeholder:text-[rgba(255,255,255,0.3)] outline-none resize-none focus:border-[#a5ff5f] transition-colors leading-[1.6]"
              />
              <div className="flex flex-col-reverse sm:flex-row gap-[10px] sm:justify-end pt-[4px]">
                <button
                  type="button"
                  onClick={() => {
                    setApplyDialogOpen(false);
                    setApplyNote('');
                  }}
                  className="h-[44px] px-[20px] rounded-[8px] border border-[#323339] font-['Satoshi',sans-serif] font-[600] text-[15px] text-[rgba(255,255,255,0.87)] hover:bg-[#2a2a2e] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!applyNote.trim()}
                  onClick={() => {
                    const trimmed = applyNote.trim();
                    if (!trimmed) return;
                    applyToProject(project.id, trimmed);
                    setApplyDialogOpen(false);
                    setApplyNote('');
                  }}
                  className={`h-[44px] px-[20px] rounded-[8px] font-['Satoshi',sans-serif] font-[700] text-[15px] transition-colors ${
                    applyNote.trim()
                      ? 'bg-[#a5ff5f] text-black hover:bg-[#8de649] cursor-pointer'
                      : 'bg-[rgba(39,39,39,0.87)] text-[rgba(255,255,255,0.3)] cursor-not-allowed'
                  }`}
                >
                  Share profile
                </button>
              </div>
            </div>
          </div>
        </>
      )}

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