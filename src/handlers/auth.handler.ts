import { Request, Response } from "express";
import { IUser, User } from "../models/user.model";
import { ApiResponse } from "../utils/apiResponse";
import { handlerWrapper } from "../utils/handlerWrapper";
import { userCreateObj } from "../validations/user.validation";
import { Session } from "../models/session.model";

const cookieOptions = {
  httpOnly: true,
  secure: true,
};

const generateAccesAndRefreshToken = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user)
      throw new Error("couldn't find the user, while generating tokens.");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generaterRefreshToken();
    const now = new Date();
    const offset = now.getTime() 

    // storing refresh token for further processing.
    await Session.create({
      userId: user?._id,
      refreshToken,
      // expiresIn: 
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new Error("something went wrong while generating user token.");
  }
};

const login = handlerWrapper(async (request: Request, response: Response) => {
  console.log(request.headers);
  const now = new Date();
  const offset = now.getTime();

  return response.json({
    ip: request.socket.remoteAddress,
    device: {
      user: request.headers["user-agent"],
      ua: request.headers["sec-ch-ua"],
      platform: request.headers["sec-ch-ua-platform"],
    },

    offset
  });
});

const register = handlerWrapper(
  async (request: Request, response: Response) => {
    // request validation
    const body: unknown = request.body;
    const result = userCreateObj.safeParse(body);
    let zodErrors = {};

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
      });

      return response.status(401).json({
        success: false,
        message: "unable to proccess the request.",
        errors: zodErrors,
      });
    }

    try {
      const user = await User.create({
        username: result.data.username,
        email: result.data.email,
        password: result.data.password,
        profile: {
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          gender: result.data.gender,
        },
      });

      const { accessToken, refreshToken } = await generateAccesAndRefreshToken(
        String(user?._id)
      );

      const createdUser = await User.findById(user._id).select("-password");

      return response
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
          new ApiResponse(201, "user created successfully.", {
            user: createdUser,
            accessToken,
            refreshToken,
          })
        );
    } catch (error: any) {
      if (
        error?.code === 11000 &&
        Object.keys(error?.keyPattern)[0] == "username"
      ) {
        zodErrors = { ...zodErrors, username: "username already taken." };

        return response.status(401).json({
          success: false,
          error: zodErrors,
        });
      }
      if (
        error?.code === 11000 &&
        Object.keys(error?.keyPattern)[0] == "email"
      ) {
        zodErrors = { ...zodErrors, email: "email already taken." };

        return response.status(401).json({
          success: false,
          error: zodErrors,
        });
      }

      return response
        .status(500)
        .json(
          new ApiResponse(
            500,
            error?.message || "something went wrong while creating user."
          )
        );
    }
  }
);

const changePassword = handlerWrapper(
  async (request: Request, response: Response) => {}
);

const logout = handlerWrapper(
  async (request: Request, response: Response) => {}
);

export { login, register, changePassword, logout };
