import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type State = {
  token: string | null;
  isAuth: boolean;
  errors: string | null;
};

type Actions = {
  setToken: (token: string | null) => void;
  logout: () => void;
  cleanErrors: () => void;
};

export const useAuthStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        isAuth: true,
        errors: null,
        setToken: (token: string | null) =>
          set(() => ({
            token,
            isAuth: !!token,
          })),
        cleanErrors: () => set(() => ({ errors: null })),
        logout: () => set(() => ({ token: null, isAuth: false, errors: null })),
      }),
      {
        name: "auth",
      }
    )
  )
);
