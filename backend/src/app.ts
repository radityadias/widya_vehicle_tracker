import 'dotenv/config';
import vehicleRoute from "./routes/vehicleRoutes";
import authRoutes from "./routes/authRoutes";
import {authToken} from "./middlewares/authMiddleware";
import cors = require("cors");
import express = require("express");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/vehicles",authToken,  vehicleRoute); // Rute default

export default app;
