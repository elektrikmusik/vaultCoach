import type { AgnoAgentResponse, AgnoMessageRequest } from '@/types';
import { ApiError, getErrorMessage } from '@/lib/errors';

/**
 * Agno AgentOS client service
 * Connects to Agno FastAPI backend
 */

const AGNO_BASE_URL = import.meta.env.VITE_AGNO_AGENTOS_URL || 'http://localhost:8000';

/**
 * Check if error is a network/fetch error
 */
function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError) {
    return (
      error.message.includes('fetch') ||
      error.message.includes('network') ||
      error.message.includes('Failed to fetch')
    );
  }
  const message = getErrorMessage(error).toLowerCase();
  return (
    message.includes('failed to fetch') ||
    message.includes('network error') ||
    message.includes('networkerror')
  );
}

/**
 * Get helpful error message for network errors
 */
function getNetworkErrorMessage(url: string): string {
  return `Cannot connect to Agno service at ${url}. Please ensure:
- The Agno backend server is running
- The URL is correct (check VITE_AGNO_AGENTOS_URL in your .env file)
- CORS is properly configured if the URL differs from the frontend origin`;
}

/**
 * Send a message to an Agno agent
 */
export async function sendAgnoMessage(request: AgnoMessageRequest): Promise<AgnoAgentResponse> {
  const url = `${AGNO_BASE_URL}/agents/message`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: request.message,
        agent_id: request.agent_id,
        context: request.context,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || errorData.detail || 'Failed to communicate with Agno agent',
        response.status,
        response.statusText
      );
    }

    const data = await response.json();
    return {
      response: data.response || data.message || '',
      agent_id: data.agent_id || request.agent_id || '',
      timestamp: data.timestamp || new Date().toISOString(),
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Provide better error messages for network issues
    if (isNetworkError(error)) {
      throw new ApiError(
        getNetworkErrorMessage(url),
        0, // Network errors don't have HTTP status codes
        'Network Error'
      );
    }

    throw new ApiError(`Agno service error: ${getErrorMessage(error)}`, 500);
  }
}

/**
 * Get available agents
 */
export async function getAgnoAgents() {
  const url = `${AGNO_BASE_URL}/agents`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || errorData.detail || 'Failed to fetch agents',
        response.status,
        response.statusText
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Provide better error messages for network issues
    if (isNetworkError(error)) {
      throw new ApiError(
        getNetworkErrorMessage(url),
        0, // Network errors don't have HTTP status codes
        'Network Error'
      );
    }

    throw new ApiError(getErrorMessage(error), 500);
  }
}
