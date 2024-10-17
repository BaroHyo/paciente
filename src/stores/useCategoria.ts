import { create } from "zustand";

interface AppState {
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
}

export const useCategoria = create<AppState>((set) => ({
  selectedId: null,
  setSelectedId: (id: number | null) => set({ selectedId: id }),
}));
