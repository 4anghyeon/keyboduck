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

//질문 삭제하기
export const deleteQuestion = async (id: number) => {
  return await supabase.from('question').delete().eq('id', id);
};
