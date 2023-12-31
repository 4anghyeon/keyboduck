import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';

// 리뷰 댓글 가져오기
export const fetchReviewComment = async () => {
  const fetchReviewCommentQuery = await supabase
    .from('review_comment')
    .select('*, profiles(*)')
    .returns<Tables<'review_comment'>[]>();

  const {data: fetchReviewCommentData, error} = fetchReviewCommentQuery;
  return {data: fetchReviewCommentData, error};
};
