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
