/**
 * Global type definitions
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type Theme = 'light' | 'dark' | 'system';

export interface AgnoAgentResponse {
  response: string;
  agent_id: string;
  timestamp: string;
}

export interface AgnoMessageRequest {
  message: string;
  agent_id?: string;
  context?: Record<string, unknown>;
}

export interface GenAIMessage {
  role: 'user' | 'model';
  parts: string;
}
