import type {LoginResponse} from "../types";

const API_BASE_URL = "http://localhost:3000";

export const login = async (email: string, password: string) : Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Login failed with status: ${response.status}`);
    }

    const data: LoginResponse = await response.json();
    return data
}