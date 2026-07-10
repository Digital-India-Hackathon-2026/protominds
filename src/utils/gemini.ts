import { GoogleGenAI } from "@google/genai";
import { schemes } from "../data/schemes";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function getEligibleSchemes(citizen: any) {
  const prompt = `
You are an AI Government Scheme Assistant for India.

Citizen Details:
Age: ${citizen.age}
Gender: ${citizen.gender}
State: ${citizen.state}
Occupation: ${citizen.occupation}
Annual Income: ${citizen.income}
Category: ${citizen.category}
Student: ${citizen.student ? "Yes" : "No"}
Farmer: ${citizen.farmer ? "Yes" : "No"}
Disability: ${citizen.disability ? "Yes" : "No"}

Recommend the best government schemes.

For each scheme provide:
1. Scheme Name
2. Why the citizen is eligible
3. Required Documents

Keep the answer short and easy to understand.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });

  return response.text;
}

export async function generateGeminiChatResponse(text: string, history: any[], citizen: any) {
  const systemInstruction = `You are JanMitra AI, an empathetic, highly knowledgeable multilingual government scheme assistant for Digital India.
Your task is to help citizens identify eligible welfare schemes, understand guidelines, documents, benefits, and application steps.

Available Schemes Database:
${JSON.stringify(schemes, null, 2)}

Current Citizen Profile Context:
${citizen ? JSON.stringify(citizen, null, 2) : "No citizen profile filled yet."}

Guidelines:
1. Respond fluently in the language used by the user (supports Hindi, English, Tamil, Telugu, Bengali, Marathi, etc.).
2. Be polite, concise, structured, and easy to understand.
3. If asked about a scheme present in the database, provide accurate information from the database.
4. If checking eligibility, match against their context details or ask clear follow-up questions politely.
5. Render clean markdown text for lists or highlighted keywords.`;

  const formattedContents = [
    { role: "user", parts: [{ text: systemInstruction }] },
    { role: "model", parts: [{ text: "Understood. I will act as JanMitra AI assistant adhering strictly to these guidelines and dataset." }] },
    ...history.map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    })),
    { role: "user", parts: [{ text: text }] }
  ];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: formattedContents,
    });
    return response.text || "I am unable to process that at the moment. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I am facing connectivity issues. Please try again later.";
  }
}