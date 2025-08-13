import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { generateText, uploadDocument } from "../gemini/gemini.controller";

// ESM __dirname shim
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup upload dir
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({ dest: uploadDir });

export const geminiRouter = Router();

geminiRouter.use((req, _res, next) => {
  req.app.set("uploadDir", uploadDir);
  next();
});

geminiRouter.post("/generate-text", generateText);
geminiRouter.post("/generate-from-image", upload.single("image"), uploadDocument);
geminiRouter.post("/generate-from-document", upload.single("document"), uploadDocument);
geminiRouter.post("/generate-from-audio", upload.single("audio"), uploadDocument);
