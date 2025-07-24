import { create } from "zustand";
import type { UserAuth } from "../types";
import { login as authApiLogin } from "../api/authApi";

interface AuthState {
    token: string | null;
    user: UserAuth | null;
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem("jwt_token"),
    isLoggedIn: !!localStorage.getItem("jwt_token"),
    loading: false,
    error: null,

    login: async (email: string, password: string) => {
        set({ loading: true, error: null });

        try {
            const response = await authApiLogin(email, password);
            localStorage.setItem('jwt_token', response.token);

            set({
                token: response.token,
                user: {
                    id: response.userId ,
                    email: response.userEmail
                },
                isLoggedIn: true,
                loading: false,
                error: null,
            });
            return true;
        } catch (err) {
            const errorMessage = (err as Error).message || "Login gagal, harap coba lain kali.";
            set({ error: errorMessage, loading: false });
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem("jwt_token");
        set({
            token: null,
            user: null,
            isLoggedIn: false,
            loading: false,
            error: null,
        });
    },
}));