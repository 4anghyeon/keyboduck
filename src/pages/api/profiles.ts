// userid를 입력 받아서 profiles테이블에서 id가 일치하는 것들만 가져오는 row생성
// table 업데이트하는 함수 생성

import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';

export const findUser = async (userId: string) => {
  const {data, error} = await supabase.from('profiles').select('*').eq('id', userId).returns<Tables<'profiles'>[]>();
  return data;
};
