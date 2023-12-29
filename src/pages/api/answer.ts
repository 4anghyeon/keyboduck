import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';

//댓글 가져오기
export const getAnswer = async () => {
  const getAnswerQuery = await supabase.from('answer').select('*').returns<Tables<'answer'>[]>();

  const {data: getAnswerData, error} = getAnswerQuery;
  return {getAnswerData, error};
};
