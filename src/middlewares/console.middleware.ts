import { Request, Response } from "express";

const loggingIncomingRequest = (
  request: Request,
  response: Response,
  next: Function
) => {
  const timestamp = new Date().toISOString();
  const method = request.method;
  const pathname = request.path;
  const userIP = request.socket.remoteAddress;

  console.info(`[${timestamp}]: ${method} ${pathname} - ${userIP}`)
  next();
};

export default loggingIncomingRequest;
