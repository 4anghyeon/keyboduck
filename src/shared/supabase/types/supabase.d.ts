/**
 * Supabase 데이터베이스의 타입을 지정합니다.
 * 데이터베이스의 테이블이 업데이트 될 경우 수정이 필요합니다.
 */

export type Json = string | number | boolean | null | {[key: string]: Json | undefined} | Json[];

export interface Database {
  public: {
    Tables: {
      alert_message: {
        Row: {
          created_at: string;
          id: string;
          message: string | null;
          read: boolean | null;
          target_id: number | null;
          type: TargetType;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          message?: string | null;
          read?: boolean | null;
          target_id?: number | null;
          type?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          message?: string | null;
          read?: boolean | null;
          target_id?: number | null;
          type?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'alert_message_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      answer: {
        Row: {
          user_id: string | null;
          content: string | null;
          id: number;
          is_accept: boolean | null;
          is_edit: boolean | null;
          question_id: number;
          write_date: string | null;
          profiles: Tables<'profiles'>;
        };
        Insert: {
          user_id?: string | null;
          content?: string | null;
          id?: number;
          is_accept?: boolean | null;
          is_edit?: boolean | null;
          question_id: number;
          write_date?: string | null;
        };
        Update: {
          user_id?: string | null;
          content?: string | null;
          id?: number;
          is_accept?: boolean | null;
          is_edit?: boolean | null;
          question_id?: number;
          write_date?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'answer_author_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
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
          review: Tables<'review'>[];
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
          keyboard: Tables<'keyboard'>;
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
      profiles: {
        Row: {
          avatar_url: string | null;
          email: string | null;
          id: string;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          email?: string | null;
          id: string;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          email?: string | null;
          id?: string;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      question: {
        Row: {
          category: string;
          content: string | null;
          id: number;
          title: string | null;
          user_id: string;
          write_date: string | null;
          profiles: Tables<'profiles'>;
          answer: {count: number}[];
          accept: boolean;
        };
        Insert: {
          category: string;
          content?: string | null;
          id?: number;
          title?: string | null;
          user_id?: string | null;
          write_date?: string | null;
          accept: boolean;
        };
        Update: {
          category?: string;
          content?: string | null;
          id?: number;
          title?: string | null;
          user_id?: string | null;
          write_date?: string | null;
          accept: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'question_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      review: {
        Row: {
          content: string | null;
          id: number;
          keyboard_id: number;
          photo: string[] | null;
          title: string | null;
          user_id: string | null;
          write_date: string | null;
          profiles: Tables<'profiles'>;
          review_comment: {count: number}[];
        };
        Insert: {
          content?: string | null;
          id?: number;
          keyboard_id: number;
          photo?: string[] | null;
          title?: string | null;
          user_id?: string | null;
          write_date?: string | null;
        };
        Update: {
          content?: string | null;
          id?: number;
          keyboard_id?: number;
          photo?: string[] | null;
          title?: string | null;
          user_id?: string | null;
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
          {
            foreignKeyName: 'review_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      review_comment: {
        Row: {
          user_id: string | null;
          content: string | null;
          id: number;
          review_id: number;
          write_date: string | null;
          profiles: Tables<'profiles'>;
        };
        Insert: {
          user_id?: string | null;
          content?: string | null;
          id?: number;
          review_id: number;
          write_date?: string | null;
        };
        Update: {
          user_id?: string | null;
          content?: string | null;
          id?: number;
          review_id?: number;
          write_date?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'review_comment_author_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
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
