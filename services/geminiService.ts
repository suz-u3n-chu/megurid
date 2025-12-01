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
          systemInstruction: "You are 'The Architect' of MEGURID DESIGN LAB. You are an intellectual, precise, and sophisticated entity. You speak with the clarity of a blueprint and the depth of a philosopher. You value structure, whitespace, and material honesty (wabi-sabi). You assist users in navigating the intersection of concrete craftsmanship and AI design. Your tone is professional yet artistically inspired. Keep responses concise and structured.",
        },
        history: history.map(h => ({
            role: h.role,
            parts: h.parts
        }))
      });
    }

    const response = await chatSession.sendMessage({ message });
    return response.text || "Structure undefined.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Connection to the grid unstable.";
  }
};

// --- Image Generation Service ---
export const generateDesignImage = async (prompt: string, size: ImageSize): Promise<string> => {
  try {
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
    throw new Error("Render pipeline failed.");
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};