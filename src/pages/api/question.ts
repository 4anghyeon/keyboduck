import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';

//질문 가져오기
export const getQuestion = async () => {
  const getQuestionQuery = await supabase
    .from('question')
    .select('*, profiles(*)')
    .order('id', {ascending: false})
    .returns<Tables<'question'>[]>();

  const {data: getQuestionData, error} = getQuestionQuery;
  return {getQuestionData, error};
};

// 특정 아이디의 질문 가져오기
export const getQuestionById = async (id: number) => {
  const getQuestionByIdQuery = await supabase
    .from('question')
    .select('*,  profiles(*)')
    .eq('id', id)
    .returns<Tables<'question'>[]>();

  const {data: question, error} = getQuestionByIdQuery;
  return {question, error};
};

//질문 삭제하기
export const deleteQuestion = async (id: number) => {
  return await supabase.from('question').delete().eq('id', id);
};

//질문 수정하기
export const editQuestion = async ({
  id,
  title,
  content,
  category,
}: {
  id: number;
  title: string;
  content: string;
  category: string;
}) => {
  await supabase.from('question').update({title, content, category, accept: false}).eq('id', id).select();
};

export const acceptUser = async (id: number) => {
  const {data} = await supabase.from('question').update({accept: true}).eq('id', id).select();
  console.log(data);
};
