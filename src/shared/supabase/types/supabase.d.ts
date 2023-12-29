export type Json = string | number | boolean | null | {[key: string]: Json | undefined} | Json[];

export interface Database {
  public: {
    Tables: {
      answer: {
        Row: {
          author: string | null;
          content: string | null;
          id: number;
          is_accept: boolean | null;
          question_id: number;
          write_date: string | null;
          is_edit: boolean | null;
        };
        Insert: {
          author?: string | null;
          content?: string | null;
          id?: number;
          is_accept?: boolean | null;
          question_id: number;
          write_date?: string | null;
          is_edit: boolean | null;
        };
        Update: {
          author?: string | null;
          content?: string | null;
          id?: number;
          is_accept?: boolean | null;
          question_id?: number;
          write_date?: string | null;
          is_edit: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'answer_question_id_fkey';
            columns: ['question_id'];
            isOneToOne: false;
            referencedRelation: 'question';
            referencedColumns: ['id'];
          },
        ];
      };
      keyboard: {
        Row: {
          brand: string;
          id: number;
          is_wireless: boolean | null;
          name: string;
          operating_systems: string | null;
          photo: string | null;
          price: number;
          purchase_link: string;
          release_date: string;
          youtube_link: string[] | null;
          keyboard_like: [{count: number}];
        };
        Insert: {
          brand?: string | null;
          id?: number;
          is_wireless?: boolean | null;
          name: string;
          operating_systems?: string | null;
          photo?: string | null;
          price?: number | null;
          purchase_link?: string | null;
          release_date?: string | null;
          youtube_link?: string[] | null;
        };
        Update: {
          brand?: string | null;
          id?: number;
          is_wireless?: boolean | null;
          name?: string;
          operating_systems?: string | null;
          photo?: string | null;
          price?: number | null;
          purchase_link?: string | null;
          release_date?: string | null;
          youtube_link?: string[] | null;
        };
        Relationships: [];
      };
      keyboard_like: {
        Row: {
          id: number;
          target_id: number;
          user_id: string | null;
        };
        Insert: {
          id?: number;
          target_id: number;
          user_id?: string | null;
        };
        Update: {
          id?: number;
          target_id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'keyboard_like_target_id_fkey';
            columns: ['target_id'];
            isOneToOne: false;
            referencedRelation: 'keyboard';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'keyboard_like_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      question: {
        Row: {
          author: string | null;
          category: string;
          content: string | null;
          id: number;
          title: string | null;
          write_date: string | null;
        };
        Insert: {
          author?: string | null;
          category: string;
          content?: string | null;
          id?: number;
          title?: string | null;
          write_date?: string | null;
        };
        Update: {
          author?: string | null;
          category?: string;
          content?: string | null;
          id?: number;
          title?: string | null;
          write_date?: string | null;
        };
        Relationships: [];
      };
      review: {
        Row: {
          author: string | null;
          content: string | null;
          id: number;
          keyboard_id: number;
          photo: string | null;
          title: string | null;
          write_date: string | null;
        };
        Insert: {
          author?: string | null;
          content?: string | null;
          id?: number;
          keyboard_id: number;
          photo?: string | null;
          title?: string | null;
          write_date?: string | null;
        };
        Update: {
          author?: string | null;
          content?: string | null;
          id?: number;
          keyboard_id?: number;
          photo?: string | null;
          title?: string | null;
          write_date?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'review_keyboard_id_fkey';
            columns: ['keyboard_id'];
            isOneToOne: false;
            referencedRelation: 'keyboard';
            referencedColumns: ['id'];
          },
        ];
      };
      review_comment: {
        Row: {
          author: string | null;
          content: string | null;
          id: number;
          review_id: number;
          write_date: string | null;
        };
        Insert: {
          author?: string | null;
          content?: string | null;
          id?: number;
          review_id: number;
          write_date?: string | null;
        };
        Update: {
          author?: string | null;
          content?: string | null;
          id?: number;
          review_id?: number;
          write_date?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'review_comment_review_id_fkey';
            columns: ['review_id'];
            isOneToOne: false;
            referencedRelation: 'review';
            referencedColumns: ['id'];
          },
        ];
      };
      review_like: {
        Row: {
          id: number;
          target_id: number | null;
          user_id: string | null;
        };
        Insert: {
          id?: number;
          target_id?: number | null;
          user_id?: string | null;
        };
        Update: {
          id?: number;
          target_id?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'review_like_target_id_fkey';
            columns: ['target_id'];
            isOneToOne: false;
            referencedRelation: 'review';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'review_like_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views'])
  ? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | {schema: keyof Database},
  EnumName extends PublicEnumNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends {schema: keyof Database}
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never;
