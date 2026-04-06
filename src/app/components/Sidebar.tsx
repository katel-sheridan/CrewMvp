import { useNavigate, useLocation } from 'react-router';
import { Home, Bookmark, Folder } from 'lucide-react';

const navItems = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'Saved', icon: Bookmark, path: '/saved' },
  { label: 'Applications', icon: Folder, path: '/applications' },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed top-[82px] left-0 w-[216px] h-[calc(100vh-82px)] bg-[#0e0c13] flex flex-col items-start px-[12px] py-[32px] overflow-y-auto z-40">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
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