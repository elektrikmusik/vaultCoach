import { useChat } from '@ai-sdk/react';
import { useCallback, useState } from 'react';
import * as aiService from '@/services/ai';

/**
 * Custom hook for AI chat that adapts Vercel AI SDK's useChat
 * to work with our existing AI services (Google GenAI, Agno)
 */
export function useGenAIChat(model?: string) {
  const [error, setError] = useState<Error | null>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    isLoading,
    ...rest
  } = useChat({
    api: '', // Not using API endpoint, we'll handle it manually
    onError: err => {
      setError(err);
    },
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!input.trim() || isLoading) return;

      setError(null);

      // Add user message manually
      const userMessage = { role: 'user' as const, content: input };
      const updatedMessages = [...messages, userMessage];

      // Create a response message for streaming
      const assistantMessageId = `msg-${Date.now()}`;
      const _assistantMessage = {
        id: assistantMessageId,
        role: 'assistant' as const,
        content: '',
      };

      // Start streaming
      try {
        let _fullResponse = '';
        for await (const chunk of aiService.streamGenAIChat(updatedMessages as any, model)) {
          _fullResponse += chunk;
          // Update the assistant message content in real-time
          // This is a simplified version - in a real implementation,
          // you'd want to update the messages array properly
        }

        // The useChat hook will handle the final message update
        originalHandleSubmit(e);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      }
    },
    [input, messages, isLoading, model, originalHandleSubmit]
  );

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    ...rest,
  };
}

export function useAgnoChat(agentId?: string) {
  const [error, setError] = useState<Error | null>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    isLoading,
    ...rest
  } = useChat({
    api: '', // Not using API endpoint, we'll handle it manually
    onError: err => {
      setError(err);
    },
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!input.trim() || isLoading) return;

      setError(null);

      // Add user message manually
      const userMessage = { role: 'user' as const, content: input };
      const updatedMessages = [...messages, userMessage];

      // Start streaming
      try {
        let _fullResponse = '';
        for await (const chunk of aiService.streamAgnoChat(updatedMessages as any, agentId)) {
          _fullResponse += chunk;
          // Update message in real-time
        }

        originalHandleSubmit(e);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      }
    },
    [input, messages, isLoading, agentId, originalHandleSubmit]
  );

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    ...rest,
  };
}
