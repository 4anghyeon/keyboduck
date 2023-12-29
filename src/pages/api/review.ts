import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';
import {ReviewType} from '@/shared/types/review';
import {PostgrestError} from '@supabase/supabase-js';

// 리뷰데이터 가져오기
export const fetchReview = async (): Promise<{data: ReviewType[] | null; error: PostgrestError | null}> => {
  const fetchReviewQuery = await supabase.from('review').select('*').returns<Tables<'review'>[]>();

  const {data: fetchReviewData, error} = fetchReviewQuery;
  return {data: fetchReviewData, error};
};

// 리뷰데이터 추가하기
// export const addReview = async (newReview: Review) => {
//   const addReviewQuery = await supabase.from('review').insert([newReview]).select();

//   const {data: addReviewData, error} = addReviewQuery;
//   return {addReviewData, error};
// };

// 리뷰데이터 수정하기
// export const updateReview = async () => {
//   const updateReviewQuery = await supabase.from('review').update({}).eq().select();

//   const {data: updateReviewData, error} = updateReviewQuery;
//   return {updateReviewData, error};
// };

// 리뷰데이터 삭제하기
// export const deleteReview = async () => {
//   const deleteReviewQuery = await supabase.from('review').delete().eq();

//   const {data: deleteReviewData, error} = deleteReviewQuery;
//   return {deleteReviewData, error};
// };
