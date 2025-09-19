import { Router } from "express";
import { login } from "../handlers/auth.handler";

const routes = Router();

routes.route("/login").get(login);
routes.route("/register").post(function () {});
routes.route("/refresh-access").post(function () {});
routes.route("/logout").post(function () {});

export default routes;
