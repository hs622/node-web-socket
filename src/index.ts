import dotenv from "dotenv";
import { httpServer } from "./app";
import connectDatabase from "./database";

dotenv.config({
  path: "./.env",
  debug: true,
});

// Evnvironment Variables
const PORT = parseInt(process.env.PORT || "6780");

connectDatabase()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`w-socket server is running up on port ${PORT}`);
    });

    httpServer.on("error", (error) => {
      console.log("Failed to start server: ", error);
      throw error;
    });
  })
  .catch((err) => {
    console.log(`Mongo database connection failed.`);
  });
