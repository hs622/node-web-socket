import { Request, Response, Router } from "express";
import { health } from "../handlers/default.handler";
import { verifyAccessToken } from "../middlewares/auth.middleware";

const routes = Router();

routes.route("/healthz").get(verifyAccessToken, health);

export default routes;