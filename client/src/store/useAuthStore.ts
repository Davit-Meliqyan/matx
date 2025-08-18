// src/storeZustand/useAuthStore.ts
import { create } from "zustand";

 interface User {
  id: string;
  name: string;
  emails: string[];
  phones: string[];
  password: string;
  avatar: string;
  isVerified: boolean;
  isSuperAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}


interface AuthState {
  user: User | null;
  setUser: (data: { user: User; token: string }) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => {
  let initialUser: User | null = null;
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user_matx");
    initialUser = storedUser ? JSON.parse(storedUser) : null;
  }

  return {
    user: initialUser,
    setUser: ({ user, token }) => {
      localStorage.setItem("user_matx", JSON.stringify(user));
      localStorage.setItem("token_matx", token);
      set({ user });
    },
    logout: () => {
      localStorage.removeItem("user_matx");
      localStorage.removeItem("token_matx");
      set({ user: null });
    },
  };
});


export default useAuthStore;
