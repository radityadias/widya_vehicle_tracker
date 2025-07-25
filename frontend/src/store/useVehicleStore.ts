import { create } from "zustand";
import type {Vehicle} from "../types";
import { fetchVehicles as apiFetchVehicles, fetchVehiclesById as apiFetchVehicleById } from "../api/vehicleApi";
import {useAuthStore} from "./useAuthStore.ts";

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
            const token = useAuthStore.getState().token;
            if (!token) {
                throw new Error('Harap login terlebih dahulu.');
            }

            const data = await apiFetchVehicles(token);
            set({vehicles: data, loading: false});
        }catch (err) {
            console.error("Gagal memuat data kendaraan: ", err);
            set({ error: (err as Error).message, loading: false });
        }
    },

    fetchVehiclesById: async (id: number) => {
        set({ loading: true, error: null });
        try{
            const token = useAuthStore.getState().token;
            if (!token) {
                throw new Error('Harap login terlebih dahulu.');
            }

            const data = await apiFetchVehicleById(id, token);
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

