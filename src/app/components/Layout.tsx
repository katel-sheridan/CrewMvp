import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { SidebarNavContext } from '../context/SidebarNavContext';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const close = () => setSidebarOpen(false);
  const toggle = () => setSidebarOpen((o) => !o);
  const isChatRoute = location.pathname === '/chat' || location.pathname.startsWith('/chat/');

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <SidebarNavContext.Provider value={{ open: sidebarOpen, toggle, close }}>
      <div className="bg-[#0e0c13] min-h-screen min-h-dvh w-full">
        <Header />

        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close navigation menu"
            className="fixed inset-0 top-[82px] z-[35] bg-black/55 lg:hidden cursor-default border-0 p-0"
            onClick={close}
          />
        )}

        <div
          id="app-sidebar"
          className={[
            'fixed top-[82px] left-0 z-[45] h-[calc(100dvh-82px)] w-[216px] max-w-[min(216px,92vw)]',
            'bg-[#0e0c13] transition-transform duration-200 ease-out will-change-transform',
            'shadow-[4px_0_24px_rgba(0,0,0,0.35)] lg:shadow-none',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          ].join(' ')}
        >
          <Sidebar onNavigate={close} />
        </div>

        <main
          className={[
            'lg:ml-[216px] ml-0 mt-[82px] bg-[#0e0c13]',
            isChatRoute
              ? 'h-[calc(100dvh-82px)] min-h-0 px-[0px] sm:px-[0px] py-0 flex flex-col'
              : 'px-[16px] sm:px-[24px] py-[24px] sm:py-[40px] min-h-[calc(100dvh-82px)]',
          ].join(' ')}
        >
          <div
            className={[
              'max-w-[1200px] mx-auto w-full min-w-0',
              isChatRoute ? 'flex-1 min-h-0 px-[16px] sm:px-[24px] py-[24px] sm:py-[40px]' : '',
            ].join(' ')}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarNavContext.Provider>
  );
}