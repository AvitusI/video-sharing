import { create } from "zustand";
import { persist } from "zustand/middleware"

import { roleEnums } from "@/app/lib/db/schema";

export type User = {
    id: string;
    profile_picture_url: string | null;
    role: (typeof roleEnums.enumName)[number];
    username: string;
    verifiedEmail: boolean;
} | null

type UserStore = {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

export const useUserStore = create(
    persist<UserStore>((set) => ({
        user: null,
        setUser: (
            user: User
        ) => {
            set((state) => ({ ...state, user })); 
        },
        clearUser: () => set((state) => ({ ...state, user: null }))
    }),
    {
        name: "user-storage"
    }
))