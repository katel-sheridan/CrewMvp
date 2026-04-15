import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useSidebarNav } from '../context/SidebarNavContext';
import svgPaths from '../../imports/svg-xv82cnj567';
import { useMessaging } from '../context/MessagingContext';
import { UserProfileAvatar } from './UserProfileAvatar';
const imgSearch = new URL('../../assets/icons/header/search.svg', import.meta.url).href;
const imgChevronDown20 = new URL('../../assets/icons/header/chevron-down-20.svg', import.meta.url).href;

const imgNotifStroke1 = new URL('../../assets/icons/header/notif-stroke-1.svg', import.meta.url).href;
const imgNotifStroke2 = new URL('../../assets/icons/header/notif-stroke-2.svg', import.meta.url).href;

const imgChatA = new URL('../../assets/icons/header/chat-vector-a.svg', import.meta.url).href;
const imgChatB = new URL('../../assets/icons/header/chat-vector-b.svg', import.meta.url).href;
const imgChatC = new URL('../../assets/icons/header/chat-vector-c.svg', import.meta.url).href;

function HeaderSearchIcon() {
  return (
    <img alt="" src={imgSearch} className="size-[20px] shrink-0 opacity-90" />
  );
}

function HeaderChevronDown20() {
  return <img alt="" src={imgChevronDown20} className="size-[20px] shrink-0" />;
}

function ChatIcon({ className }: { className?: string }) {
  // Matches the Figma MCP structure for node `257:4192` (chat-bubble).
  return (
    <div className={className} aria-hidden="true">
      <div className="overflow-clip relative shrink-0 size-[23.75px]">
        <div className="absolute inset-[47.92%_27.08%_47.92%_68.75%]">
          <div className="absolute inset-[-90%]">
            <img alt="" className="block max-w-none size-full" src={imgChatA} />
          </div>
        </div>
        <div className="absolute inset-[47.92%]">
          <div className="absolute inset-[-90%]">
            <img alt="" className="block max-w-none size-full" src={imgChatA} />
          </div>
        </div>
        <div className="absolute inset-[47.92%_68.75%_47.92%_27.08%]">
          <div className="absolute inset-[-90%]">
            <img alt="" className="block max-w-none size-full" src={imgChatB} />
          </div>
        </div>
        <div className="absolute inset-[8.33%]">
          <div className="absolute inset-[-4.5%]">
            <img alt="" className="block max-w-none size-full" src={imgChatC} />
          </div>
        </div>
      </div>
    </div>
  );
}

function NotifIcon({ className }: { className?: string }) {
  // Matches the Figma MCP structure for node `257:4206` (notifications-outline).
  return (
    <div className={className} aria-hidden="true">
      <div className="overflow-clip relative shrink-0 size-[23.75px]">
        <div className="absolute inset-[6.25%_12.44%_21.88%_12.44%]">
          <img alt="" className="absolute block max-w-none size-full" src={imgNotifStroke1} />
        </div>
        <div className="absolute inset-[71.88%_34.38%_6.25%_34.38%]">
          <img alt="" className="absolute block max-w-none size-full" src={imgNotifStroke2} />
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [postOpen, setPostOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { notifications, unreadCount, markNotificationRead, conversations } = useMessaging();
  const sidebarNav = useSidebarNav();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPostOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0e0c13] flex items-center h-[82px] px-[16px] sm:px-[28px] gap-[12px] sm:gap-[20px] min-w-0">
      {sidebarNav && (
        <button
          type="button"
          onClick={sidebarNav.toggle}
          className="lg:hidden shrink-0 size-[40px] rounded-[8px] bg-[#212226] border border-[#323339] flex items-center justify-center cursor-pointer text-[rgba(255,255,255,0.87)]"
          aria-label={sidebarNav.open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={sidebarNav.open}
          aria-controls="app-sidebar"
        >
          {sidebarNav.open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
        </button>
      )}

      {/* Logo */}
      <div
        className="shrink-0 cursor-pointer h-[38px] w-[45.21px] relative"
        onClick={() => navigate('/')}
      >
        <div className="absolute inset-[0_0_-12.63%_-3.87%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46.9575 42.8003">
            <g>
              <g>
                <path d={svgPaths.p52d300} fill="#a5ff5f" />
                <path d={svgPaths.p12f06c00} fill="#a5ff5f" />
                <path d={svgPaths.p13121000} fill="#a5ff5f" />
                <path d={svgPaths.p3a99d480} fill="#a5ff5f" />
                <path d={svgPaths.p1c4af80} fill="#a5ff5f" />
                <path d={svgPaths.p2b0d8700} fill="#a5ff5f" />
                <path d={svgPaths.p3246fc00} fill="#a5ff5f" />
                <path d={svgPaths.p265fcb00} fill="#a5ff5f" />
                <path d={svgPaths.p24f47d00} fill="#a5ff5f" />
                <path d={svgPaths.p1d933700} fill="#a5ff5f" />
                <path d={svgPaths.p212ad00} fill="#a5ff5f" />
                <path d={svgPaths.p367b6cf0} fill="#a5ff5f" />
                <path d={svgPaths.p2ac27500} fill="#a5ff5f" />
                <path d={svgPaths.p39c07880} fill="#a5ff5f" />
                <path d={svgPaths.p34d55e80} fill="#a5ff5f" />
                <path d={svgPaths.p2fca8700} fill="#a5ff5f" />
                <path d={svgPaths.p1f00a700} fill="#a5ff5f" />
                <path d={svgPaths.p203f7300} fill="#a5ff5f" />
                <path d={svgPaths.p12804970} fill="#a5ff5f" />
                <path d={svgPaths.p11fc0500} fill="#a5ff5f" />
                <path d={svgPaths.p1ba5b500} fill="#a5ff5f" />
                <path d={svgPaths.p31422800} fill="#a5ff5f" />
                <path d={svgPaths.p26c8ea00} fill="#a5ff5f" />
                <path d={svgPaths.p94adb00} fill="#a5ff5f" />
                <path d={svgPaths.p1d54c400} fill="#a5ff5f" />
                <path d={svgPaths.p276f9100} fill="#a5ff5f" />
                <path d={svgPaths.p1f7f3800} fill="#a5ff5f" />
                <path d={svgPaths.p1053d5c0} fill="#a5ff5f" />
                <path d={svgPaths.p3e482400} fill="#a5ff5f" />
                <path d={svgPaths.p310c0900} fill="#a5ff5f" />
                <path d={svgPaths.p13b24e80} fill="#a5ff5f" />
                <path d={svgPaths.p2f1658f0} fill="#a5ff5f" />
                <path d={svgPaths.p139f8880} fill="#a5ff5f" />
                <path d={svgPaths.pf157200} fill="#a5ff5f" />
                <path d={svgPaths.p1d6a7900} fill="#a5ff5f" />
                <path d={svgPaths.p249c1c80} fill="#a5ff5f" />
              </g>
              <path d={svgPaths.pd91c400} fill="white" stroke="black" strokeWidth="4" />
            </g>
          </svg>
        </div>
        <div className="absolute inset-[26.39%_36.4%_46.76%_33.33%]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6831 10.2037">
            <g>
              <path d={svgPaths.p25bc5380} fill="black" />
              <path d={svgPaths.p285ba00} fill="black" />
            </g>
          </svg>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 flex justify-center min-w-0">
        <div className="bg-[#212226] flex gap-[8px] h-[38px] items-center px-[12px] sm:px-[16px] py-[12px] rounded-[30px] w-full max-w-[468px] border-b border-[#323339] min-w-0">
          <HeaderSearchIcon />
          <input
            type="text"
            placeholder="Search for..."
            className="flex-1 bg-transparent outline-none font-['Satoshi',sans-serif] text-[16px] text-[rgba(255,255,255,0.87)] placeholder:text-[#6e6977]"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex gap-[8px] sm:gap-[16px] items-center shrink-0">
        {/* Post button */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="bg-[#a5ff5f] flex gap-[4px] h-[40px] items-center justify-center px-[10px] sm:px-[16px] py-[8px] rounded-[8px] border-2 border-[#a5ff5f] cursor-pointer"
            onClick={() => setPostOpen(!postOpen)}
          >
            <span className="font-['Satoshi',sans-serif] font-[700] text-[13px] sm:text-[14px] text-black leading-[1.4] whitespace-nowrap">Post</span>
            <ChevronDown size={20} className="text-black hidden sm:block shrink-0" />
          </button>
          {postOpen && (
            <div className="absolute top-[48px] right-0 bg-[#212226] border border-[#323339] rounded-[8px] shadow-lg z-50 min-w-[200px] w-[min(280px,calc(100vw-24px))] overflow-hidden">
              <button
                className="w-full text-left px-[16px] py-[12px] font-['Satoshi',sans-serif] text-[14px] text-[rgba(255,255,255,0.87)] hover:bg-[#2a2a2e] cursor-pointer transition-colors"
                onClick={() => setPostOpen(false)}
              >
                Post a Project
              </button>
              <button
                className="w-full text-left px-[16px] py-[12px] font-['Satoshi',sans-serif] text-[14px] text-[rgba(255,255,255,0.87)] hover:bg-[#2a2a2e] cursor-pointer transition-colors"
                onClick={() => setPostOpen(false)}
              >
                Post Your Profile
              </button>
            </div>
          )}
        </div>

        {/* Chat */}
        <button
          className="cursor-pointer text-[rgba(255,255,255,0.87)] hover:text-white transition-colors relative flex items-center justify-center size-[36px]"
          onClick={() => {
            // Navigate to the first accepted conversation
            const accepted = conversations.find((c) => c.status === 'accepted');
            if (accepted) navigate(`/chat/${accepted.id}`);
          }}
        >
          <ChatIcon className="content-stretch flex items-center justify-center relative rounded-[11873.813px] shrink-0" />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            className="cursor-pointer text-[rgba(255,255,255,0.87)] hover:text-white transition-colors relative flex items-center justify-center size-[36px]"
            onClick={() => setNotifOpen(!notifOpen)}
          >
            <NotifIcon className="content-stretch flex items-center justify-center relative rounded-[11873.813px] shrink-0" />
            {unreadCount > 0 && (
              <span className="absolute top-[2px] right-[2px] size-[16px] rounded-full bg-[#a5ff5f] flex items-center justify-center">
                <span className="font-['Satoshi',sans-serif] font-[700] text-[9px] text-black">{unreadCount}</span>
              </span>
            )}
          </button>

          {/* Notification dropdown */}
          {notifOpen && (
            <div className="absolute top-[40px] right-0 bg-[#212226] border border-[#323339] rounded-[12px] shadow-2xl z-50 w-[min(360px,calc(100vw-24px))] max-w-[360px] overflow-hidden">
              <div className="px-[20px] py-[14px] border-b border-[#323339]">
                <span className="font-['Satoshi',sans-serif] font-[700] text-[14px] text-[rgba(255,255,255,0.87)]">
                  Notifications
                </span>
              </div>
              <div className="max-h-[320px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-[20px] py-[32px] text-center">
                    <p className="font-['Satoshi',sans-serif] font-[400] text-[14px] text-[rgba(255,255,255,0.4)]">
                      No notifications yet
                    </p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <button
                      key={notif.id}
                      onClick={() => {
                        markNotificationRead(notif.id);
                        setNotifOpen(false);
                        if (notif.conversationId) {
                          navigate(`/chat/${notif.conversationId}`);
                        }
                      }}
                      className={`w-full flex gap-[12px] items-start px-[20px] py-[14px] cursor-pointer transition-colors text-left ${
                        notif.read ? 'hover:bg-[#2a2a2e]' : 'bg-[rgba(165,255,95,0.06)] hover:bg-[rgba(165,255,95,0.1)]'
                      }`}
                    >
                      <div className={`size-[8px] rounded-full mt-[6px] shrink-0 ${
                        notif.read ? 'bg-transparent' : 'bg-[#a5ff5f]'
                      }`} />
                      <div className="flex flex-col gap-[4px] min-w-0">
                        <p className="font-['Satoshi',sans-serif] font-[600] text-[14px] text-[rgba(255,255,255,0.87)] leading-[1.4]">
                          {notif.title}
                        </p>
                        <p className="font-['Satoshi',sans-serif] font-[400] text-[14px] text-[rgba(255,255,255,0.5)] leading-[1.4]">
                          {notif.description}
                        </p>
                        <p className="font-['Satoshi',sans-serif] font-[400] text-[11px] text-[rgba(255,255,255,0.3)]">
                          {new Date(notif.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User profile */}
        <div className="bg-[#212226] flex gap-[6px] items-center justify-center px-[8px] py-[6px] rounded-[8px] cursor-pointer">
          <UserProfileAvatar className="size-[24px] rounded-full object-cover" />
          <p className="font-['Satoshi',sans-serif] font-[500] leading-[1.4] text-[14px] text-[rgba(255,255,255,0.87)] whitespace-nowrap hidden sm:block">@corgiburrito</p>
          <ChevronDown size={16} className="text-[rgba(255,255,255,0.87)] hidden sm:block" />
        </div>
      </div>
    </header>
  );
}