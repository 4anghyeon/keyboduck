export interface QuestionType {
  author: string | null;
  category: string;
  content: string | null;
  id: number;
  title: string | null;
  write_date: string | null;
}

export interface AnswerType {
  author: string | null;
  content: string | null;
  id: number;
  is_accept: boolean | null;
  question_id: number;
  write_date: string | null;
}
