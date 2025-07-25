import { Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

// Fungsi untuk mendapatkan semua data kendaraan
export const getAllVehicles = async (req: Request, res: Response) => {
    try {
        // Mencari data kendaraan
        const vehicles = await prisma.vehicle.findMany();

        res.json(vehicles);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({message: "Ada yang Salah!"});
    }
}

// Fungsi untuk mendapatkan data kendaraan berdasarkan id
export const getVehicleById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Mencari data kendaraan berdasarkan ID
        const vehicle = await prisma.vehicle.findUnique({
            where: {id: parseInt(id)}
        });

        if (vehicle) { // Jika ditemukan
            res.json(vehicle);
        }else{ // Jika tidak ditemukan
            res.status(404).json({message: "Kendaraan tidak ditemukan!"});
        }
    }
    catch(err) {
        console.error(`Terjadi kesalahan saat mencari id ${id} `, err);
        res.status(500).json({message: "Ada yang salah saat mencari kendaraan!"});
    }
}