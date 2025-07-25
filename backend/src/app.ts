import 'dotenv/config';
import vehicleRoute from "./routes/vehicleRoutes";
import authRoutes from "./routes/authRoutes";
import {authToken} from "./middlewares/authMiddleware";
import cors = require("cors");
import express = require("express");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes); // Rute default autentikasi
app.use("/vehicles", authToken,  vehicleRoute); // Rute default kendaraan menggunakan middleware

export default app;
