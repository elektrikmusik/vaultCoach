/**
 * Supabase database types
 * This file should be generated using Supabase CLI:
 * npx supabase gen types typescript --project-id <project-id> > src/types/supabase.ts
 *
 * For now, providing a basic type structure
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      // Add your table types here when generated
      [key: string]: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
    Views: {
      [key: string]: {
        Row: Record<string, unknown>;
      };
    };
    Functions: {
      [key: string]: {
        Args: Record<string, never>;
        Returns: unknown;
      };
    };
    Enums: {
      [key: string]: string;
    };
  };
}
