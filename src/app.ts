import socket from "ws";
import express from "express";
import { createServer } from "http";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();

// middlewares configuration
app.use(helmet());
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
  })
);

const httpServer = createServer(app);
const ws = new socket.WebSocketServer({
  server: httpServer,
});

import v1 from "./routers/v1";
import loggingIncomingRequest from "./middlewares/console.middleware";

app.use(loggingIncomingRequest);

// API version
app.use("/api/v1", v1);

export { app, httpServer, ws };
