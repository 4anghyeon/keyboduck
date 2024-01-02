import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';

// 리뷰데이터 가져오기
export const fetchReview = async () => {
  const fetchReviewQuery = await supabase
    .from('review')
    .select('*, profiles(*), review_comment(count)')
    .order('id', {ascending: false})
    .returns<Tables<'review'>[]>();

  const {data: fetchReviewData, error} = fetchReviewQuery;
  console.log('🚀 ~ file: review.ts:13 ~ fetchReview ~ fetchReviewData:', fetchReviewData);

  return {data: fetchReviewData, error};
};

// 리뷰 삭제하기
export const deleteReview = async (id: number) => {
  await supabase.from('review').delete().eq('id', id);
};

// 리뷰 수정하기
export const updateReview = async ({
  id,
  keyboard_id,
  title,
  content,
  photo,
}: {
  id: number;
  keyboard_id: number;
  title: string;
  content: string;
  photo: string[];
}) => {
  const {data} = await supabase.from('review').update({keyboard_id, title, content, photo}).eq('id', id).select();
};
