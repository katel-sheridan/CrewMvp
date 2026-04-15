import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type ApplicationStatus = 'pending';

export type ApplicationRecord = {
  id: string;
  projectId: string;
  status: ApplicationStatus;
  submittedAt: string;
  /** Optional message included when applying (shown to the listing owner in a real app). */
  note?: string;
};

type ApplicationsContextType = {
  applications: ApplicationRecord[];
  applyToProject: (projectId: string, note?: string) => void;
  getApplicationForProject: (projectId: string) => ApplicationRecord | undefined;
  hasPendingApplication: (projectId: string) => boolean;
};

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined);

function newId() {
  return `app-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);

  const applyToProject = useCallback((projectId: string, note?: string) => {
    const trimmed = note?.trim();
    setApplications((prev) => {
      if (prev.some((a) => a.projectId === projectId && a.status === 'pending')) return prev;
      return [
        ...prev,
        {
          id: newId(),
          projectId,
          status: 'pending' as const,
          submittedAt: new Date().toISOString(),
          ...(trimmed ? { note: trimmed } : {}),
        },
      ];
    });
  }, []);

  const getApplicationForProject = useCallback(
    (projectId: string) => applications.find((a) => a.projectId === projectId),
    [applications]
  );

  const hasPendingApplication = useCallback(
    (projectId: string) => applications.some((a) => a.projectId === projectId && a.status === 'pending'),
    [applications]
  );

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        applyToProject,
        getApplicationForProject,
        hasPendingApplication,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications() {
  const ctx = useContext(ApplicationsContext);
  if (!ctx) throw new Error('useApplications must be used within ApplicationsProvider');
  return ctx;
}
