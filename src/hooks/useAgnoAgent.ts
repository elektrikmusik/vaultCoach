import { useMutation, useQuery } from '@tanstack/react-query';
import * as agnoService from '@/services/agno';
import type { AgnoMessageRequest } from '@/types';

/**
 * Hook for interacting with Agno agents
 */
export function useAgnoAgent() {
  // Get available agents
  const agnoUrl = import.meta.env.VITE_AGNO_AGENTOS_URL as string | undefined;
  const { data: agents, isLoading: isLoadingAgents } = useQuery({
    queryKey: ['agno', 'agents'],
    queryFn: () => agnoService.getAgnoAgents(),
    enabled: !!agnoUrl,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: (request: AgnoMessageRequest) => agnoService.sendAgnoMessage(request),
  });

  return {
    agents,
    isLoadingAgents,
    sendMessage: sendMessageMutation.mutateAsync,
    isSending: sendMessageMutation.isPending,
    error: sendMessageMutation.error,
  };
}
