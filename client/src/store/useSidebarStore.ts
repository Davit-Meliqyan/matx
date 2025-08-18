import { create } from 'zustand';

type SidebarState = {
  isOpen: boolean;
  isOpenToggle: boolean;
  toggle: () => void;
  setIsOpenToggle: (value: boolean) => void;
};

const getInitialSidebarState = (): boolean => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('sidebar-isOpen');
    return stored === null ? true : stored === 'true';
  }
  return true;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: getInitialSidebarState(),
  isOpenToggle: false,
  toggle: () =>
    set((state) => {
      const newIsOpen = !state.isOpen;
      localStorage.setItem('sidebar-isOpen', String(newIsOpen));
      return { isOpen: newIsOpen };
    }),
  setIsOpenToggle: (value: boolean) => set({ isOpenToggle: value }),
}));
