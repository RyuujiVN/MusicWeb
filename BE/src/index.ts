import express, { Express, Request, Response } from "express";
import env from "./configs/environment";
import connectDB from "./configs/database";

const app: Express = express();
const port: number = Number(env.PORT) || 3000;

// Connect to database
connectDB()

app.get("/test", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
