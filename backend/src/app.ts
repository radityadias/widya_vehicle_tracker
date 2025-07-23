import vehicleRoute from "./routes/vehicleRoute";
import cors = require("cors");
import express = require("express");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/vehicles", vehicleRoute); // Rute default

export default app;
