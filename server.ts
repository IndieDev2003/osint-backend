import express from "express";
import type { Request, Response } from "express";

import PersonRouter from "./routes/Person.Routes";

const port = process.env.PORt || 3000;

const app = express();
app.use(express.json());
app.use("/person", PersonRouter);

app.get("/health", async (_: Request, res: Response) => {
  res.send("API Working at 100% Health");
});

app.listen(port, () => {
  console.log("Server running on PORT 3000");
});
