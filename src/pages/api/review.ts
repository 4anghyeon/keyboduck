import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';

// 리뷰데이터 가져오기
const findAllReview = async () => {
  const findAllReviewQuery = await supabase.from('review').select('*').returns;
};
