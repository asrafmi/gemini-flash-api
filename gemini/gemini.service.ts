import {
  GeminiModelName,
  getGeminiClient,
  getGeminiOptions,
} from "./gemini.module";

export async function geminiGenerateText(input: {
  prompt: string;
  model?: GeminiModelName;
  options?: Record<string, unknown>;
}): Promise<string> {
  const { prompt, model, options } = input;
  const { defaultModel } = getGeminiOptions();
  const client = getGeminiClient();

  const res = await client.models.generateContent({
    model: model ?? defaultModel,
    contents: prompt,
    ...(options ?? {}),
  });

  // Beberapa versi expose .text() sebagai fungsi, beberapa sebagai properti.
  // @ts-ignore
  return typeof res.text === "function" ? res.text() : res.text;
}

export async function geminiGenerateFromFile(input: {
  prompt: string;
  base64: string;
  mimeType: string;
  model?: GeminiModelName;
  options?: Record<string, unknown>;
}): Promise<string> {
  const client = getGeminiClient();
  const { defaultModel } = getGeminiOptions();

  const res = await client.models.generateContent({
    model: input.model ?? defaultModel,
    contents: [
      input.prompt ?? "Describe this image in detail",
      {
        inlineData: {
          data: input.base64,
          mimeType: input.mimeType,
        },
      },
    ],
    ...(input.options ?? {}),
  });

  // handle variasi text() vs text
  // @ts-ignore
  return typeof res.text === "function" ? res.text() : res.text;
}
