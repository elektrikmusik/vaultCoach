export const APP_NAME = import.meta.env.VITE_APP_NAME || 'SaaS Boilerplate';
export const APP_ENV = import.meta.env.VITE_APP_ENV || 'development';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  ABOUT: '/about',
} as const;

export const API_ENDPOINTS = {
  USERS: '/api/users',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;
