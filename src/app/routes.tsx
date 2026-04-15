import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { SavedPage } from './components/SavedPage';
import { CreatorProfilePage } from './components/CreatorProfilePage';
import { ChatPage } from './components/ChatPage';
import { ApplicationsPage } from './components/ApplicationsPage';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Layout,
      children: [
        { index: true, Component: HomePage },
        { path: 'saved', Component: SavedPage },
        { path: 'applications', Component: ApplicationsPage },
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
  ],
  {
    // GitHub Pages serves the app from "/<repo>/". Vite exposes that as BASE_URL.
    basename: import.meta.env.BASE_URL,
  }
);