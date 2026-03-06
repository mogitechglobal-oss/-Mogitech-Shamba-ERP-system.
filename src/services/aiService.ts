import { GoogleGenAI } from "@google/genai";

// We will initialize this dynamically to ensure we use the latest API key
// selected by the user via window.aistudio.openSelectKey()
let genAI: GoogleGenAI | null = null;

export const getGenAI = () => {
  // Always create a new instance to capture the latest key if it changed
  // The environment variable is injected by the platform
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY is not set");
  }
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

export async function generateFarmVideo(
  imageBase64: string,
  prompt: string,
  aspectRatio: "16:9" | "9:16" = "16:9"
) {
  const ai = getGenAI();
  const model = "veo-3.1-fast-generate-preview";

  try {
    console.log("Starting video generation...");
    let operation = await ai.models.generateVideos({
      model: model,
      prompt: prompt,
      image: {
        imageBytes: imageBase64,
        mimeType: "image/png", // Assuming PNG for now, will handle conversion if needed
      },
      config: {
        numberOfVideos: 1,
        resolution: "720p", // fast-generate-preview supports 720p
        aspectRatio: aspectRatio,
      },
    });

    console.log("Operation started, polling for completion...", operation);

    // Poll for completion
    while (!operation.done) {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Poll every 5 seconds
      operation = await ai.operations.getVideosOperation({
        operation: operation,
      });
      console.log("Polling status:", operation.metadata?.state);
    }

    if (operation.error) {
      throw new Error(operation.error.message);
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) {
      throw new Error("No video URI returned");
    }

    return videoUri;
  } catch (error) {
    console.error("Video generation failed:", error);
    throw error;
  }
}

export async function downloadVideo(uri: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("API Key missing for download");

  const response = await fetch(uri, {
    method: "GET",
    headers: {
      "x-goog-api-key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download video: ${response.statusText}`);
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob);
}
