import {Router} from "express";
import {login} from "../controllers/authController";

const router = Router();

router.post("/login", login); // Rute Login

export default router;