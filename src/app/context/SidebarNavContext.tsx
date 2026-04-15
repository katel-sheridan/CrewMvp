import { createContext, useContext } from 'react';

export type SidebarNavContextType = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};

export const SidebarNavContext = createContext<SidebarNavContextType | null>(null);

export function useSidebarNav() {
  return useContext(SidebarNavContext);
}
