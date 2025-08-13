import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { geminiGenerateFromFile, geminiGenerateText } from "./gemini.service";
import { convertToBase64 } from "../utils/image";

export async function generateText(
  req: Request<{}, {}, { prompt?: string; model?: string }>,
  res: Response
) {
  try {
    const { prompt, model } = req.body ?? {};
    if (!prompt) return res.status(400).json({ error: "prompt is required" });

    const text = await geminiGenerateText({ prompt, model: model as any });
    return res.json({ result: text });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err?.message ?? "generation failed" });
  }
}

export async function uploadDocument(req: Request, res: Response) {
  try {
    if (!req.file) return res.status(400).json({ error: "file is required" });
    const { filename, mimetype } = req.file;

    const uploadDir = req.app.get("uploadDir") as string;
    const filePath = path.join(uploadDir, filename);
    const fileB64 = convertToBase64(filePath);

    const mime = mimetype;
    const prompt =
      (req.body?.prompt as string) || "Describe this image/document in detail";

    const description = await geminiGenerateFromFile({
      prompt,
      base64: fileB64,
      mimeType: mime,
      model: (req.body?.model as string) || undefined,
    });

    return res.json({
      description,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err?.message ?? "upload failed" });
  } finally {
    fs.unlinkSync(req!.file!.path);
  }
}
