import express from "express";
import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
// console.log("INDEX.TS IS RUNNING");
// Import the router after using dotenv.config() unless it won't load env variables
import router from "./routes"

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(router);
app.use((req: Request, res: Response) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "Not found" });
  }
  res.status(404).send("Not found");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running at ${process.env.SERVER_URL}:${port}`);
});
