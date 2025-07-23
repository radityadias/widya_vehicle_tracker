import { Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

// Fungsi untuk mendapatkan semua data kendaraan
export const getAllVehicles = async (req: Request, res: Response) => {
    try {
        const vehicle = await prisma.vehicle.findMany();
        res.json(vehicle);
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
        const vehicle = await prisma.vehicle.findUnique({
            where: {id: parseInt(id)}
        });

        if (vehicle) {
            res.json(vehicle);
        }else{
            res.status(404).json({message: "Kendaraan tidak ditemukan!"});
        }
    }
    catch(err) {
        console.error(`Terjadi kesalahan saat mencari id ${id} `, err);
        res.status(500).json({message: "Ada yang Salah!"});
    }
}