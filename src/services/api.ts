import { supabase } from './supabase';
import { ApiError, getErrorMessage } from '@/lib/errors';
import type { ApiResponse, PaginatedResponse } from '@/types';

/**
 * Generic API service with error handling
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Fetch wrapper with error handling
 */
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || response.statusText,
        response.status,
        response.statusText
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(getErrorMessage(error), 500);
  }
}

/**
 * Example API functions
 */
export const apiService = {
  /**
   * Get users (example endpoint)
   */
  async getUsers(): Promise<ApiResponse<PaginatedResponse<unknown>>> {
    return fetchAPI('/api/users');
  },

  /**
   * Make authenticated requests using Supabase
   */
  async authenticatedRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new ApiError('Not authenticated', 401);
    }

    return fetchAPI<T>(endpoint, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${session.access_token}`,
      },
    });
  },
};
