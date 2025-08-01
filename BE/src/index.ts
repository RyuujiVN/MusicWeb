import express, { Express, Request, Response } from "express";
import env from "./configs/environment";
import connectDB from "./configs/database";
import API_V1 from "./routes/v1/admin";
import errorHandlingMiddleware from "./middlwares/errorHandlingMiddleware";

const START_SERVER = () => {
  const app: Express = express();
  const port: number = Number(env.PORT) || 3000;

  // Connect to database
  connectDB();

  // API v1
  app.use("/api/v1", API_V1);

  // Middleware for error handling
  app.use(errorHandlingMiddleware);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

(async () => {
  try {
    // Start server
    console.log("Starting server...");
    START_SERVER();
  } catch (error) {
    console.log("Error starting server", error);
    process.exit(0);
  }
})();
