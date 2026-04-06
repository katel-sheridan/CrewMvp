import { createContext, useContext, useState, ReactNode } from 'react';

interface SavedItemsContextType {
  savedProjects: Set<string>;
  savedCreators: Set<string>;
  toggleSaveProject: (id: string) => void;
  toggleSaveCreator: (id: string) => void;
  isProjectSaved: (id: string) => boolean;
  isCreatorSaved: (id: string) => boolean;
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

export function SavedItemsProvider({ children }: { children: ReactNode }) {
  const [savedProjects, setSavedProjects] = useState<Set<string>>(new Set());
  const [savedCreators, setSavedCreators] = useState<Set<string>>(new Set());

  const toggleSaveProject = (id: string) => {
    setSavedProjects((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSaveCreator = (id: string) => {
    setSavedCreators((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isProjectSaved = (id: string) => savedProjects.has(id);
  const isCreatorSaved = (id: string) => savedCreators.has(id);

  return (
    <SavedItemsContext.Provider
      value={{
        savedProjects,
        savedCreators,
        toggleSaveProject,
        toggleSaveCreator,
        isProjectSaved,
        isCreatorSaved,
      }}
    >
      {children}
    </SavedItemsContext.Provider>
  );
}

export function useSavedItems() {
  const context = useContext(SavedItemsContext);
  if (!context) {
    throw new Error('useSavedItems must be used within SavedItemsProvider');
  }
  return context;
}
