import { create } from 'zustand';

type ModalState = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
}));
