export interface ReviewType {
  id: number;
  keyboard_id: number | null;
  title: string | null;
  content: string | null;
  author: string | null;
  write_date: string | null;
  photo: string[] | null;
}
