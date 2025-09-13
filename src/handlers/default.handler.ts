import { Response } from "express";
import { handlerWrapper } from "../utils/handlerWrapper";

// health check endpoint
const health = handlerWrapper((response: Response) => {
  return response.status(200).json({
    status: "ok",
  });
});

export { health };
