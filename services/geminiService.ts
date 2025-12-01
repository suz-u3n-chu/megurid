import { GoogleGenAI, Chat } from "@google/genai";
import { ImageSize } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// --- Chat Service ---
let chatSession: Chat | null = null;

export const getChatResponse = async (message: string, history: { role: string, parts: { text: string }[] }[]): Promise<string> => {
  try {
    if (!chatSession) {
      chatSession = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: "You are the AI concierge for MEGURID, a high-end concrete lifestyle brand. Your tone is sophisticated, minimalist, helpful, and polite. You appreciate 'wabi-sabi' (beauty in imperfection). You answer questions about products, shipping, and the philosophy of concrete. Keep answers concise.",
        },
        history: history.map(h => ({
            role: h.role,
            parts: h.parts
        }))
      });
    }

    const response = await chatSession.sendMessage({ message });
    return response.text || "申し訳ありません。現在応答できません。";
  } catch (error) {
    console.error("Chat Error:", error);
    return "申し訳ありません。エラーが発生しました。";
  }
};

// --- Image Generation Service ---
export const generateDesignImage = async (prompt: string, size: ImageSize): Promise<string> => {
  try {
    // Handling 1K, 2K, 4K strings to map if necessary, but API accepts them as strings 
    // strictly "1K", "2K", "4K" based on docs for gemini-3-pro-image-preview
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          imageSize: size, 
          aspectRatio: "1:1"
        }
      }
    });

    // Extract image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    throw new Error("No image data returned");
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};