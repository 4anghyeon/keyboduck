import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';
import {ReviewType} from '@/shared/types/review';
import {PostgrestError} from '@supabase/supabase-js';

// 리뷰데이터 가져오기
export const fetchReview = async () => {
  const fetchReviewQuery = await supabase.from('review').select('*').returns<Tables<'review'>[]>();

  const {data: fetchReviewData, error} = fetchReviewQuery;
  return {data: fetchReviewData, error};
};
