// store/tabsStore.ts
import { create } from "zustand";

interface TabsState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useTabsStore = create<TabsState>((set) => ({
  activeTab: "info", 
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
