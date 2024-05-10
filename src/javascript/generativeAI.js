import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAAleX-Yat_42BPzap6__FAXh7jnIaTnZQ";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function initializeGenerativeAI() {
    return await genAI.getGenerativeModel({ 
        model: "gemini-1.0-pro",
    }).startChat({
        generationConfig: {
            maxOutputTokens: 2000,
            temperature: 1,
            topP: 1,
            topK: 1,
        },
    });
}
