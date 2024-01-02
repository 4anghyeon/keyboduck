import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';

// 리뷰데이터 가져오기
export const fetchReview = async () => {
  const fetchReviewQuery = await supabase
    .from('review')
    .select('*, profiles(*)')
    .order('id', {ascending: false})
    .returns<Tables<'review'>[]>();

  const {data: fetchReviewData, error} = fetchReviewQuery;

  return {data: fetchReviewData, error};
};

// 리뷰 삭제하기
export const deleteReview = async (id: number) => {
  return await supabase.from('review').delete().eq('id', id);
};
