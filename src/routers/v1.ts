import { Router } from "express";
import defaultRoutes from "./default.routes";

const v1 = Router();

// Version 1 API endpoint.
// Embedding routes to the app.
v1.use("/d", defaultRoutes);

export default v1;
