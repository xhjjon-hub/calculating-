import { GoogleGenAI, Type } from "@google/genai";
import { SolveResult } from "../types";

const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const solveMathProblem = async (problem: string): Promise<SolveResult> => {
  if (!API_KEY) {
    throw new Error("Missing API Key");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Solve this math problem or conversion: "${problem}". Provide the final numerical answer and a brief explanation.`,
      config: {
        systemInstruction: "You are a concise mathematical assistant. Return the response in strict JSON format.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: { type: Type.STRING, description: "The concise numerical or text result" },
            explanation: { type: Type.STRING, description: "A very brief explanation (max 1 sentence)" }
          },
          required: ["answer", "explanation"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as SolveResult;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to solve problem");
  }
};