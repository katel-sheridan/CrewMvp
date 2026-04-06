import { RouterProvider } from 'react-router';
import { router } from './routes';
import { SavedItemsProvider } from './context/SavedItemsContext';
import { MessagingProvider } from './context/MessagingContext';

// Main application component
export default function App() {
  return (
    <SavedItemsProvider>
      <MessagingProvider>
        <RouterProvider router={router} />
      </MessagingProvider>
    </SavedItemsProvider>
  );
}