import { Request, response, Response } from "express";
import { handlerWrapper } from "../utils/handlerWrapper";
import {
  getUserObj,
  userCreateObj,
  userProfileObj,
} from "../validations/user.validation";
import { ApiResponse } from "../utils/apiResponse";
import { fetchUserById, fetchUsers } from "../services/user.service";
import { User } from "../models/user.model";

const getUser = handlerWrapper(async (request: Request, response: Response) => {
  const query: unknown = request.query;
  const result = getUserObj.safeParse(query);
  const user = await fetchUserById(result.data?.id!);

  if (!user)
    return response.status(404).json(new ApiResponse(404, "user not found."));

  return response
    .status(200)
    .json(new ApiResponse(200, "user data fetched successfully.", user));
});

const getAllUsers = handlerWrapper(async (_: Request, response: Response) => {
  const users = await fetchUsers();

  if (!users)
    return response.status(404).json(new ApiResponse(404, "users not found."));

  return response
    .status(200)
    .json(new ApiResponse(200, "users data fetched successfully.", users));
});

const createUser = handlerWrapper(
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

      return response
        .status(200)
        .json(new ApiResponse(201, "user created successfully.", user));
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

const updateUserProfile = handlerWrapper(
  async (request: Request, Response: Response) => {
    const body: unknown = request.body;
    const result = userProfileObj.safeParse(body);

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

    // try {
    //   const userProfile = await User.findByIdAndUpdate(
    //     request.user?._id,
    //     {
    //     }
    //   )
    // } catch (error) {
    // }
  }
);

const updateUserContact = handlerWrapper(
  async (request: Request, Response: Response) => {}
);

const updateUserAddress = handlerWrapper(
  async (request: Request, Response: Response) => {}
);

const suspendUserAccount = handlerWrapper(
  async (request: Request, Response: Response) => {}
);

const removeUserAccount = handlerWrapper(
  async (request: Request, Response: Response) => {}
);

const restoreUserAccount = handlerWrapper(
  async (request: Request, Response: Response) => {}
);

export {
  getAllUsers,
  getUser,
  createUser,
  updateUserProfile,
  updateUserContact,
  updateUserAddress,
  suspendUserAccount,
  removeUserAccount,
  restoreUserAccount,
};
