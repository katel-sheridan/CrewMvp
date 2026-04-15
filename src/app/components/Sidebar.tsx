import { useNavigate, useLocation } from 'react-router';
import { Home, Bookmark, Folder } from 'lucide-react';

const navItems = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'Saved', icon: Bookmark, path: '/saved' },
  { label: 'Applications', icon: Folder, path: '/applications' },
];

type SidebarProps = {
  /** Called after navigation (e.g. close mobile drawer). */
  onNavigate?: () => void;
};

export function Sidebar({ onNavigate }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="h-full w-full flex flex-col items-stretch px-[12px] py-[24px] sm:py-[32px] overflow-y-auto overflow-x-hidden border-r border-[#323339]/80 lg:border-r-0">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => {
              navigate(item.path);
              onNavigate?.();
            }}
            className={`flex h-[48px] items-center w-full rounded-[100px] overflow-hidden cursor-pointer transition-colors ${
              isActive ? 'bg-[#212226]' : 'hover:bg-[#212226]/50'
            }`}
          >
            <div className="flex gap-[12px] items-center pl-[16px] pr-[24px] py-[16px] w-full">
              <item.icon size={20} className="text-[rgba(255,255,255,0.87)] shrink-0" strokeWidth={1.5} />
              <span className="font-['Satoshi',sans-serif] font-[500] leading-[1.4] text-[14px] text-[rgba(255,255,255,0.87)]">
                {item.label}
              </span>
            </div>
          </button>
        );
      })}
    </nav>
  );
}