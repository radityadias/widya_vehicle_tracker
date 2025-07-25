import { Router } from "express";
import { getAllVehicles, getVehicleById } from "../controllers/vehicleController";

const router = Router();

router.get("/", getAllVehicles); // Rute dashboard
router.get("/:id", getVehicleById); // Rute detail kendaraan berdasarkan id

export default router;
