import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';

//답변 가져오기
export const getAnswer = async () => {
  const getAnswerQuery = await supabase.from('answer').select('*,  profiles(*)').returns<Tables<'answer'>[]>();

  const {data: getAnswerData, error} = getAnswerQuery;
  return {getAnswerData, error};
};

// 답변 추가하기
export const addAnswer = async (userId: string, comment: string, questionId: number) => {
  await supabase
    .from('answer')
    .insert({user_id: userId, content: comment, question_id: questionId, is_accept: false, is_edit: false})
    .select();
};

// 답변 삭제하기
export const deleteAnswer = async (id: number) => {
  return await supabase.from('answer').delete().eq('id', id);
};

// 답변 수정상태로 변경하기
export const isEditAnswer = async (id: number) => {
  await supabase.from('answer').update({is_edit: true}).eq('id', id).select();
};

// 답변 완료상태로 변경하기
export const isCompletionAnswer = async (id: number) => {
  await supabase.from('answer').update({is_edit: false}).eq('id', id).select();
};

// 답변 완료상태로 변경하기
export const completionAnswer = async ({id, revisedAnswer}: {id: number; revisedAnswer: string}) => {
  await supabase.from('answer').update({content: revisedAnswer, is_edit: false}).eq('id', id).select();
};
