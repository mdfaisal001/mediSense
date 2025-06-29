import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });


export const askGemini = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const text = result?.response?.text();
    return text || "⚠️ Empty response from Gemini.";
  } catch (error) {
    console.error("🔥 Gemini API Error:", error); // 👈 Print actual error
    return "⚠️ I'm having trouble thinking right now. Please try again in a moment.";
  }
};
