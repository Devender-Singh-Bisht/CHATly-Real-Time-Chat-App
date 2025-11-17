import "./src/config/env.js";

import express from "express";
import authRouter from "./src/routes/auth.route.js";

const app = express();

app.use("/api/auth", authRouter);

app.get("/", (req, res) => res.send("Hello, world!"));

const PORT = process.env.PORT;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
