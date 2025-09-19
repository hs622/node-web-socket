import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyAccessToken = (
  request: Request,
  response: Response,
  next: Function
) => {
  try {
    let token = request.headers.accessToken || request.cookies.accessToken;
    token = token.replace("Bearer ", "");
    console.log(token);

    next();
  } catch (error) {
    return response.status(419).json({
      message: "invalid access-token.",
    });
  }
};

export { verifyAccessToken };
