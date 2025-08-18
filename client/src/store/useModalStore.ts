import { create } from "zustand";

type ModalState = {
  accessDeniedOpen: boolean;
  message: string | null;
  openAccessDeniedModal: (msg?: string) => void;
  closeAccessDeniedModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  accessDeniedOpen: false,
  message: null,
  openAccessDeniedModal: (msg = "Access Denied") =>
    set({ accessDeniedOpen: true, message: msg }),
  closeAccessDeniedModal: () =>
    set({ accessDeniedOpen: false, message: null }),
}));
