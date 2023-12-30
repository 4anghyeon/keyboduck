export interface QuestionType {
  user_id: string | null;
  category: string;
  content: string | null;
  id: number;
  title: string | null;
  write_date: string | null;
  profiles: {
    avatar_url: string | null;
    email: string | null;
    id: string | null;
    username: string | null;
  };
}

export interface AnswerType {
  author: string | null;
  content: string | null;
  id: number;
  is_accept: boolean | null;
  question_id: number;
  write_date: string | null;
  is_edit: boolean | null;
}
