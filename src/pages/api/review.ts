import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';

// 리뷰데이터 가져오기
export const fetchReview = async () => {
  const fetchReviewQuery = await supabase.from('review').select('*').returns<Tables<'review'>[]>();

  const {data: fetchReviewData, error} = fetchReviewQuery;
  return {data: fetchReviewData, error};
};
