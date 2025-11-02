import { GoogleGenerativeAI } from '@google/generative-ai';
import type { GenAIMessage } from '@/types';

/**
 * Google Generative AI service
 */

const API_KEY = import.meta.env.VITE_GOOGLE_GENAI_API_KEY;

if (!API_KEY) {
  console.warn('Google GenAI API key not found. GenAI features will not work.');
}

let genAI: GoogleGenerativeAI | null = null;

/**
 * Initialize Google Generative AI client
 */
function getGenAIClient(): GoogleGenerativeAI {
  if (!API_KEY) {
    throw new Error('Google GenAI API key is not configured');
  }

  if (!genAI) {
    genAI = new GoogleGenerativeAI(API_KEY);
  }

  return genAI;
}

/**
 * Generate text using Google GenAI
 */
export async function generateText(
  prompt: string,
  model: string = 'gemini-2.5-flash'
): Promise<string> {
  try {
    const client = getGenAIClient();
    const genModel = client.getGenerativeModel({ model });

    const result = await genModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    throw new Error(`GenAI error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Chat with Google GenAI
 */
export async function chatWithGenAI(
  messages: GenAIMessage[],
  model: string = 'gemini-2.5-flash'
): Promise<string> {
  try {
    const client = getGenAIClient();
    const genModel = client.getGenerativeModel({ model });

    // Convert messages to GenAI format
    const chat = genModel.startChat({
      history: messages.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.parts }],
      })),
    });

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) {
      throw new Error('No messages provided');
    }
    const result = await chat.sendMessage(lastMessage.parts);
    const response = await result.response;
    return response.text();
  } catch (error) {
    throw new Error(
      `GenAI chat error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
