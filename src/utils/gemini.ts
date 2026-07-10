import { GoogleGenAI } from "@google/genai";

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