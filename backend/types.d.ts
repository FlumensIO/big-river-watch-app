export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      records: {
        Row: {
          cid: string;
          created_at: string | null;
          data: Json | null;
          deleted: boolean;
          id: number;
          latitude: number;
          longitude: number;
          media: string[];
          updated_at: string | null;
        };
        Insert: {
          cid: string;
          created_at?: string | null;
          data?: Json | null;
          deleted?: boolean;
          id?: number;
          latitude: number;
          longitude: number;
          media: string[];
          updated_at?: string | null;
        };
        Update: {
          cid?: string;
          created_at?: string | null;
          data?: Json | null;
          deleted?: boolean;
          id?: number;
          latitude?: number;
          longitude?: number;
          media?: string[];
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
