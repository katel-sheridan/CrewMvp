import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { SavedPage } from './components/SavedPage';
import { CreatorProfilePage } from './components/CreatorProfilePage';
import { ChatPage } from './components/ChatPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'saved', Component: SavedPage },
      {
        path: 'applications',
        Component: () => (
          <div className="flex flex-col gap-[48px] w-full">
            <h1 className="font-['Tahoma',sans-serif] font-[700] leading-[1.1] text-[36px] text-[rgba(255,255,255,0.87)]">
              Applications
            </h1>
            <div className="flex items-center justify-center h-[200px] bg-[#212226] rounded-[8px]">
              <p className="font-['Satoshi',sans-serif] text-[rgba(255,255,255,0.6)] text-[16px]">
                Applications page — coming soon
              </p>
            </div>
          </div>
        ),
      },
      {
        path: 'creator/:id',
        Component: CreatorProfilePage,
      },
      {
        path: 'chat',
        Component: ChatPage,
      },
      {
        path: 'chat/:conversationId',
        Component: ChatPage,
      },
      {
        path: '*',
        Component: () => (
          <div className="flex items-center justify-center h-[400px]">
            <p className="font-['Satoshi',sans-serif] text-[rgba(255,255,255,0.6)] text-[16px]">
              Page not found
            </p>
          </div>
        ),
      },
    ],
  },
]);