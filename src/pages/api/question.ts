import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';

//질문 가져오기
export const getQuestion = async () => {
  const getQuestionQuery = await supabase.from('question').select('*').returns<Tables<'question'>[]>();

  const {data: getQuestionData, error} = getQuestionQuery;
  return {getQuestionData, error};
};
