import { Router } from "express";
import { getAllVehicles, getVehicleById } from "../controllers/vehicleController";
import { login } from "../controllers/authController";

const router = Router();

router.get("/", getAllVehicles);
router.get("/:id", getVehicleById);
router.get("/login", login);

export default router;
