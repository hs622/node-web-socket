import dotenv from "dotenv";
import { httpServer } from "./app";

dotenv.config({
  path: "./.env",
  debug: true,
});

// Evnvironment Variables
const PORT = parseInt(process.env.PORT || "6780");

httpServer.listen(PORT, () => {
  console.log(`w-socket server is running up on port ${PORT}`);
});
