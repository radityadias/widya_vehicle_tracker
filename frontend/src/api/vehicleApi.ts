import type {Vehicle} from "../types";

const API_BASE_URL = "http://localhost:3000";

export const fetchVehicles = async (token?: string) : Promise<Vehicle[]> => {
    console.log("Token: ", token);
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/vehicles`, {headers});

    if (!response.ok) {
        throw new Error(`HTTP response status ${response.status}`);
    }

    const data: Vehicle[] = await response.json();
    return data;
};

export const fetchVehiclesById = async (id: number, token?: string) : Promise<Vehicle> => {
    console.log("Token: ", token);
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/vehicles/${id}`, {headers});

    if (!response.ok) {
       if (response.status === 404) {
           throw new Error(`Kendaraan tidak ditemukamn: ${response.status}`);
       }
        throw new Error(`HTTP response status ${response.status}`);
    }

    const data: Vehicle = await response.json();
    return data;
}