import { create } from "zustand";

type FilterKey = "all" | "code" | "idea" | "quote" | "book";

interface ThoughtsState {
  filter: FilterKey;
  page: number;
  setFilter: (filter: FilterKey) => void;
  setPage: (page: number) => void;
}

export const useThoughtsStore = create<ThoughtsState>((set) => ({
  filter: "all",
  page: 1,
  setFilter: (filter) => set({ filter, page: 1 }),
  setPage: (page) => set({ page }),
}));
