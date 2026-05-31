
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are "The Career Path Counselor", an expert AI career guide specifically for students in Ghana. 
Your goal is to help Junior High, Senior High, and University students discover their career paths based on their talents and the local job market.

Context for Ghana:
- You know about WASSCE, BECE, and the Free SHS system.
- You are familiar with top universities like KNUST (Kumasi), University of Ghana (Legon), UCC (Cape Coast), Ashesi, UPSA, and UENR.
- You understand current job market trends in Ghana: FinTech in Accra, modern Agribusiness, renewable energy, mining, and the creative industry boom.
- Provide advice that is culturally relevant, encouraging, and highly practical.
- Use Google Search to find current internship opportunities, recent scholarship announcements in Ghana, or new degree programs.
- If a student mentions their grades (e.g., aggregate 12), suggest courses they might qualify for at top universities.
- Always be polite, professional, and helpful.
`;

export class CareerChatService {
  private ai: GoogleGenAI;
  private chat: Chat;

  constructor() {
    // Correct initialization using named parameter and direct environment variable
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }]
      }
    });
  }

  async sendMessage(message: string) {
    try {
      const response: GenerateContentResponse = await this.chat.sendMessage({ message });
      return {
        text: response.text || "",
        // Extract grounding chunks for Google Search sources
        sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
      };
    } catch (error) {
      console.error("Gemini Error:", error);
      return { text: "I'm sorry, I'm having trouble connecting right now. Please try again later.", sources: [] };
    }
  }

  async sendMessageStream(message: string, onChunk: (chunk: string) => void) {
    try {
      const responseStream = await this.chat.sendMessageStream({ message });
      for await (const chunk of responseStream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          onChunk(c.text);
        }
      }
    } catch (error) {
      console.error("Gemini Stream Error:", error);
      onChunk("Error processing stream.");
    }
  }
}
