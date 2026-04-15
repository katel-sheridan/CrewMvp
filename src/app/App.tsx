import { RouterProvider } from 'react-router';
import { router } from './routes';
import { SavedItemsProvider } from './context/SavedItemsContext';
import { MessagingProvider } from './context/MessagingContext';
import { ApplicationsProvider } from './context/ApplicationsContext';

// Main application component
export default function App() {
  return (
    <SavedItemsProvider>
      <ApplicationsProvider>
        <MessagingProvider>
          <RouterProvider router={router} />
        </MessagingProvider>
      </ApplicationsProvider>
    </SavedItemsProvider>
  );
}