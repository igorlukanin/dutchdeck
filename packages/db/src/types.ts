export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          languages: string[]
          interface_language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          languages?: string[]
          interface_language?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          languages?: string[]
          interface_language?: string
          created_at?: string
          updated_at?: string
        }
      }
      words: {
        Row: {
          id: string
          dutch: string
          english: string | null
          russian: string | null
          gender: 'de' | 'het' | null
          verb_type: 'regular' | 'irregular' | null
          cefr_level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
          source: string | null
          audio_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          dutch: string
          english?: string | null
          russian?: string | null
          gender?: 'de' | 'het' | null
          verb_type?: 'regular' | 'irregular' | null
          cefr_level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
          source?: string | null
          audio_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          dutch?: string
          english?: string | null
          russian?: string | null
          gender?: 'de' | 'het' | null
          verb_type?: 'regular' | 'irregular' | null
          cefr_level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
          source?: string | null
          audio_url?: string | null
          created_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          word_id: string
          familiarity_score: number
          last_reviewed: string | null
          times_reviewed: number
          times_correct: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          word_id: string
          familiarity_score?: number
          last_reviewed?: string | null
          times_reviewed?: number
          times_correct?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          word_id?: string
          familiarity_score?: number
          last_reviewed?: string | null
          times_reviewed?: number
          times_correct?: number
          created_at?: string
          updated_at?: string
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          active_word_count: number
          daily_goal: number
          current_streak: number
          last_practice_date: string | null
          cefr_level: 'A0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          active_word_count?: number
          daily_goal?: number
          current_streak?: number
          last_practice_date?: string | null
          cefr_level?: 'A0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          active_word_count?: number
          daily_goal?: number
          current_streak?: number
          last_practice_date?: string | null
          cefr_level?: 'A0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}