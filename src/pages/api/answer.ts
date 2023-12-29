import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';

//댓글 가져오기
export const getAnswer = async () => {
  const getAnswerQuery = await supabase.from('answer').select('*').returns<Tables<'answer'>[]>();

  const {data: getAnswerData, error} = getAnswerQuery;
  return {getAnswerData, error};
};

// 댓글 추가하기
export const addAnswer = async (author: string, comment: string, questionId: number) => {
  // const {data: addAnswerData, error} =
  await supabase.from('answer').insert({author, content: comment, question_id: questionId, is_accept: false}).select();
  // return addAnswerData;
};
