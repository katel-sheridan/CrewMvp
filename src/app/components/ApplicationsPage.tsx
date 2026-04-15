import { projects } from '../data/mock-data';
import { useApplications } from '../context/ApplicationsContext';

function formatSubmitted(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function PendingApplicationsList() {
  const { applications } = useApplications();
  const pending = applications.filter((a) => a.status === 'pending');

  if (pending.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-[12px] min-h-[240px] bg-[#212226] border border-[#323339] rounded-[16px] px-[24px] py-[40px]">
        <p className="font-['Satoshi',sans-serif] text-[16px] text-[rgba(255,255,255,0.5)] text-center">
          You don’t have any applications yet. Browse projects and tap <span className="text-[rgba(255,255,255,0.75)]">Apply to Project</span> to share your profile with a listing owner.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-[12px]">
      {pending.map((app) => {
        const project = projects.find((p) => p.id === app.projectId);
        if (!project) return null;
        return (
          <li
            key={app.id}
            className="flex flex-col sm:flex-row gap-[16px] sm:gap-[20px] sm:items-start bg-[#212226] border border-[#323339] rounded-[12px] p-[16px] sm:p-[20px]"
          >
            <img
              alt=""
              src={project.thumbnail}
              className="w-full sm:w-[100px] h-[min(160px,28vw)] sm:h-[100px] sm:min-h-[100px] rounded-[10px] object-cover shrink-0"
            />
            <div className="flex-1 min-w-0 flex flex-col gap-[10px]">
              <div className="flex flex-wrap items-start justify-between gap-x-[12px] gap-y-[8px]">
                <h2 className="font-['Satoshi',sans-serif] font-[700] text-[17px] sm:text-[18px] text-[rgba(255,255,255,0.87)] leading-[1.25] min-w-0 flex-1">
                  {project.title}
                </h2>
                <span className="bg-[#352a17] border border-[#614e2d] flex h-[24px] items-center justify-center px-[8px] py-[4px] rounded-[12px] font-['Satoshi',sans-serif] font-[500] text-[12px] text-[rgba(251,191,36,0.87)] text-center whitespace-nowrap shrink-0">
                  Pending
                </span>
              </div>
              <p className="font-['Satoshi',sans-serif] font-[400] text-[14px] text-[rgba(255,255,255,0.45)] leading-[1.4]">
                Listed by {project.listedBy}
                <span className="text-[rgba(255,255,255,0.28)]"> · </span>
                <span className="text-[rgba(255,255,255,0.38)]">Applied {formatSubmitted(app.submittedAt)}</span>
              </p>
              {app.note && (
                <div className="rounded-[10px] bg-[#1a1a1f] border border-[#323339] px-[14px] py-[12px] flex flex-col gap-[8px] min-w-0">
                  <span className="font-['Satoshi',sans-serif] font-[600] text-[11px] text-[rgba(255,255,255,0.42)] uppercase tracking-[0.55px]">
                    Your note
                  </span>
                  <p className="font-['Satoshi',sans-serif] font-[400] text-[14px] text-[rgba(255,255,255,0.72)] leading-[1.55] whitespace-pre-wrap break-words">
                    {app.note}
                  </p>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function ApplicationsPage() {
  return (
    <div className="flex flex-col gap-[32px] w-full min-w-0">
      <div className="flex flex-col gap-[8px]">
        <h1 className="font-['Tahoma',sans-serif] font-[700] leading-[1.1] text-[28px] sm:text-[36px] text-[rgba(255,255,255,0.87)]">
          Applications
        </h1>
        <p className="font-['Satoshi',sans-serif] font-[400] text-[16px] text-[rgba(255,255,255,0.5)] leading-[1.5] max-w-[640px]">
          Projects you’ve applied to appear here while your request is pending review.
        </p>
      </div>
      <PendingApplicationsList />
    </div>
  );
}
