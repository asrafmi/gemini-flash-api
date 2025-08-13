import { GoogleGenAI } from "@google/genai";

export type GeminiModelName =
  | "gemini-2.5-flash"
  | "gemini-2.0-flash"
  | "gemini-1.5-flash"
  | "gemini-1.5-pro"
  | (string & {});

export interface GeminiOptions {
  apiKey?: string;
  defaultModel?: GeminiModelName;
  baseUrl?: string;
  defaults?: Record<string, unknown>;
}

type GeminiInitState = {
  client: GoogleGenAI;
  options: Required<Pick<GeminiOptions, "apiKey" | "defaultModel">> &
    GeminiOptions;
};

let state: GeminiInitState | null = null;

export function initGemini(options: GeminiOptions = {}): void {
  if (state) return;

  const apiKey = options.apiKey ?? process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Gemini init error: apiKey tidak ditemukan. Set options.apiKey atau env GEMINI_API_KEY."
    );
  }

  const client = new GoogleGenAI({
    apiKey,

    baseUrl: options.baseUrl,
  } as any);

  state = {
    client,
    options: {
      apiKey,
      defaultModel: options.defaultModel ?? "gemini-2.5-flash",
      baseUrl: options.baseUrl,
      defaults: options.defaults ?? {},
    },
  };
}

export async function initGeminiAsync(
  factory: () => Promise<GeminiOptions> | GeminiOptions
): Promise<void> {
  if (state) return;
  const opts = await factory();
  initGemini(opts);
}

export function getGeminiClient(): GoogleGenAI {
  if (!state) {
    throw new Error(
      "Gemini belum di-init. Panggil initGemini() / initGeminiAsync() lebih dulu."
    );
  }
  return state.client;
}

export function getGeminiOptions(): GeminiInitState["options"] {
  if (!state) {
    throw new Error(
      "Gemini belum di-init. Panggil initGemini() / initGeminiAsync() lebih dulu."
    );
  }
  return state.options;
}
