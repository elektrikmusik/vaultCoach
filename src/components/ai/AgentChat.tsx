import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai/conversation';
import { Message, MessageContent, MessageAvatar } from '@/components/ai/message';
import { Response } from '@/components/ai/response';
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputSubmit,
} from '@/components/ai/prompt-input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { streamAgnoChat } from '@/services/ai';
import { useAuthStore } from '@/stores/authStore';
import { useState, useRef, useEffect } from 'react';
import type { CoreMessage } from 'ai';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Agno Agent Chat component using shadcn AI components
 */
export function AgentChat() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsStreaming(true);

    // Create assistant message placeholder
    const assistantMessageId = `msg-${Date.now() + 1}`;
    let assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
    };

    setMessages([...newMessages, assistantMessage]);

    try {
      abortControllerRef.current = new AbortController();
      let fullResponse = '';

      // Convert to CoreMessage format
      const coreMessages: CoreMessage[] = newMessages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      for await (const chunk of streamAgnoChat(coreMessages)) {
        if (abortControllerRef.current?.signal.aborted) {
          break;
        }
        fullResponse += chunk;
        assistantMessage = {
          ...assistantMessage,
          content: fullResponse,
        };
        setMessages([...newMessages, assistantMessage]);
      }
    } catch (error) {
      console.error('Error with Agno agent:', error);
      setMessages([
        ...newMessages,
        {
          ...assistantMessage,
          content:
            error instanceof Error
              ? `Error: ${error.message}`
              : 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Agno Agent Chat</CardTitle>
        <CardDescription>Chat with Agno AI agent</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-[600px] p-0">
        <Conversation className="flex-1 overflow-y-auto">
          <ConversationContent>
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                Start a conversation with the Agno agent
              </div>
            )}
            {messages.map(message => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  <Response>{message.content}</Response>
                </MessageContent>
                <MessageAvatar
                  src={
                    message.role === 'user'
                      ? user?.avatar_url || 'https://github.com/shadcn.png'
                      : 'https://github.com/agno.png'
                  }
                  name={
                    message.role === 'user'
                      ? user?.name || user?.email?.split('@')[0] || 'You'
                      : 'Agno Agent'
                  }
                />
              </Message>
            ))}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputTextarea
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            disabled={isStreaming}
          />
          <PromptInputToolbar>
            <PromptInputSubmit
              status={isStreaming ? 'streaming' : undefined}
              disabled={isStreaming || !input.trim()}
            />
          </PromptInputToolbar>
        </PromptInput>
      </CardContent>
    </Card>
  );
}
