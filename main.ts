import "dotenv/config";

import express from "express";
import { initGemini } from "./gemini/gemini.module";
import { geminiRouter } from "./routes/gemini.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

initGemini({
  apiKey: process.env.GEMINI_API_KEY,
  defaultModel: "gemini-2.5-flash",
});

app.use("/api/v1", geminiRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
