import type {Vehicle} from "../types";

const API_BASE_URL = "https://localhost:3000";

export const fetchVehicles = async () : Promise<Vehicle[]> => {
    const response = await fetch(`${API_BASE_URL}/vehicles`);

    if (!response.ok) {
        throw new Error(`HTTP response status ${response.status}`);
    }

    const data: Vehicle[] = await response.json();
    return data;
};

export const fetchVehiclesById = async (id: number) : Promise<Vehicle> => {
    const response = await fetch(`${API_BASE_URL}/vehicles/${id}`);

    if (!response.ok) {
       if (response.status === 404) {
           throw new Error(`Kendaraan tidak ditemukamn: ${response.status}`);
       }
        throw new Error(`HTTP response status ${response.status}`);
    }

    const data: Vehicle = await response.json();
    return data;
}