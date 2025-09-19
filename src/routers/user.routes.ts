import { Router } from "express";
import { createUser, getAllUsers, getUser } from "../handlers/user.handler";
import { verifyAccessToken } from "../middlewares/auth.middleware";

const r = Router();

// all routes are been protected.
// r.use(verifyAccessToken);

r.route("/fetch-users").get(getAllUsers);
r.route("/fetch-user").get(getUser);
r.route("/create-user").post(createUser);

// function (
//   req: Request,
//   res: Response,
//   next: Function
// ) {
//   console.log("request: ", req.body);

//   // return res.status(897).json({
//   //   message: "debugging...",
//   // });

//   next();
// }

// r.route("/update-user-profile").patch(function () {});
// r.route("/update-user-contact").patch(function () {});
// r.route("/update-user-address").patch(function () {});
// r.route("/suspend-user-account/:id").get(function () {});
// r.route("/remove-user-account/:id").delete(function () {});

export default r;
