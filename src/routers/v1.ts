import { Router } from "express";
import defaultRoutes from "./default.routes";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";

const v1 = Router();

// Version 1 API endpoint.
// Embedding routes to the app.
v1.use("/d", defaultRoutes);
v1.use("/users", userRoutes);
v1.use("/auth", authRoutes);

export default v1;
