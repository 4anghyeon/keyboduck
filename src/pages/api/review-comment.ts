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

// 리뷰 댓글 추가하기
export const addReviewComment = async (userId: string, comment: string, reviewId: number) => {
  return await supabase
    .from('review_comment')
    .insert({user_id: userId, content: comment, review_id: reviewId})
    .select();
};

// 리뷰 댓글 삭제하기
export const deleteReviewComment = async (id: number) => {
  return await supabase.from('review_comment').delete().eq('id', id);
};

// 리뷰 댓글 수정하기
export const updateReviewComment = async ({id, editingComment}: {id: number; editingComment: string}) => {
  return await supabase.from('review_comment').update({content: editingComment}).eq('id', id).select();
};
