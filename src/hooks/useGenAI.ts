import { useMutation } from '@tanstack/react-query';
import * as genaiService from '@/services/genai';
import type { GenAIMessage } from '@/types';

/**
 * Hook for Google Generative AI interactions
 */
export function useGenAI() {
  const generateTextMutation = useMutation({
    mutationFn: ({ prompt, model }: { prompt: string; model?: string }) =>
      genaiService.generateText(prompt, model),
  });

  const chatMutation = useMutation({
    mutationFn: ({ messages, model }: { messages: GenAIMessage[]; model?: string }) =>
      genaiService.chatWithGenAI(messages, model),
  });

  return {
    generateText: generateTextMutation.mutateAsync,
    chat: chatMutation.mutateAsync,
    isGenerating: generateTextMutation.isPending,
    isChatting: chatMutation.isPending,
    error: generateTextMutation.error || chatMutation.error,
  };
}
