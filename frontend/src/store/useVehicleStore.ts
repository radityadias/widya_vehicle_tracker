import { create } from "zustand";
import type {Vehicle} from "../types";
import { fetchVehicles, fetchVehiclesById } from "../api/vehicleApi";

interface VehicleState {
    vehicles: Vehicle[];
    selectedVehicle: Vehicle | null;
    loading: boolean;
    error: string | null;
    fetchVehicles: () => Promise<void>;
    fetchVehiclesById: (id: number) => Promise<void>;
    clearSelectedVehicles: () => void;
}

export const useVehicleStore = create<VehicleState>((set) => ({
    vehicles: [],
    selectedVehicle: null ,
    loading: false,
    error: null,

    fetchVehicles: async () => {
        set({loading: true, error: null});
        try{
            const data = await fetchVehicles();
            set({vehicles: data, loading: false});
        }catch (err) {
            console.error("Gagal memuat data kendaraan: ", err);
            set({ error: (err as Error).message, loading: false });
        }
    },

    fetchVehiclesById: async (id: number) => {
        set({ loading: true, error: null });
        try{
            const data = await fetchVehiclesById(id);
            set({selectedVehicle: data, loading: false});
        }
        catch (err){
            console.error(`Gagal memuat data kendaraan berdasarkan id${id}:`, err);
            set({ error: (err as Error).message, loading: false });
        }
    },

    clearSelectedVehicles: () => {
        set({ selectedVehicle: null });
    },
}))

