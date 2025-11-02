import type { CoreMessage } from 'ai';
import * as genaiService from './genai';
import * as agnoService from './agno';

/**
 * AI Service Adapter
 * Bridges existing AI services (Google GenAI, Agno) to Vercel AI SDK format
 */

export type AIProvider = 'google-genai' | 'agno';

/**
 * Convert messages to Google GenAI format
 */
function _messagesToGenAIFormat(messages: CoreMessage[]): Array<{
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}> {
  return messages
    .filter(msg => msg.role === 'user' || msg.role === 'assistant')
    .map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts:
        typeof msg.content === 'string'
          ? [{ text: msg.content }]
          : msg.content.filter(part => part.type === 'text').map(part => ({ text: part.text })),
    }));
}

/**
 * Stream chat with Google GenAI
 * Note: Google GenAI doesn't support true streaming in the browser,
 * so we simulate streaming by chunking the response
 */
export async function* streamGenAIChat(
  messages: CoreMessage[],
  model: string = 'gemini-2.5-flash'
): AsyncGenerator<string, void, unknown> {
  try {
    // Convert to GenAI format (excluding last message for history)
    const historyMessages = messages.slice(0, -1);
    const lastMessage = messages[messages.length - 1];

    if (!lastMessage) {
      throw new Error('No messages provided');
    }

    // For now, use non-streaming API and simulate streaming
    // In production, you'd want to use a backend API that supports streaming
    const genaiMessages = [
      ...historyMessages.map(msg => ({
        role: (msg.role === 'user' ? 'user' : 'model') as 'user' | 'model',
        parts:
          typeof msg.content === 'string'
            ? msg.content
            : msg.content.find((c: { type: string }) => c.type === 'text')?.text || '',
      })),
      {
        role: lastMessage.role === 'user' ? 'user' : 'model',
        parts:
          typeof lastMessage.content === 'string'
            ? lastMessage.content
            : lastMessage.content.find((c: { type: string }) => c.type === 'text')?.text || '',
      },
    ];

    const response = await genaiService.chatWithGenAI(genaiMessages, model);

    // Simulate streaming by chunking the response
    const words = response.split(' ');
    for (let i = 0; i < words.length; i++) {
      yield (i > 0 ? ' ' : '') + words[i];
      // Small delay to simulate streaming
      await new Promise(resolve => setTimeout(resolve, 20));
    }
  } catch (error) {
    throw new Error(
      `GenAI streaming error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Stream chat with Agno agent
 */
export async function* streamAgnoChat(
  messages: CoreMessage[],
  agentId?: string
): AsyncGenerator<string, void, unknown> {
  try {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
      throw new Error('Last message must be from user');
    }

    const messageText =
      typeof lastMessage.content === 'string'
        ? lastMessage.content
        : lastMessage.content.find(c => c.type === 'text')?.text || '';

    // For now, use non-streaming API and simulate streaming
    // In production, you'd want to use a backend API that supports streaming
    const result = await agnoService.sendAgnoMessage({
      message: messageText,
      agent_id: agentId,
    });

    // Simulate streaming by chunking the response
    const words = result.response.split(' ');
    for (let i = 0; i < words.length; i++) {
      yield (i > 0 ? ' ' : '') + words[i];
      // Small delay to simulate streaming
      await new Promise(resolve => setTimeout(resolve, 20));
    }
  } catch (error) {
    throw new Error(
      `Agno streaming error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
