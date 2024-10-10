import { create } from "zustand";

type CollapseStore = {
    isCollapsed: boolean;
    toggleCollapse: () => void;
}

export const useCollapseStore = create<CollapseStore>((set) => ({
    isCollapsed: true,
    toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed }))
}))