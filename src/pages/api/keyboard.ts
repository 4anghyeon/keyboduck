import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';

/**
 * 모든 키보드 데이터를 찾는다.
 */
export const findAllKeyboard = async () => {
  const findAllKeyboardQuery = await supabase.from('keyboard').select('*').returns<Tables<'keyboard'>[]>();

  const {data: keyboardList, error} = findAllKeyboardQuery;

  return {keyboardList, error};
};

/**
 * 모든 키보드 데이터를 좋아요 갯수와 함께 가져온다.
 */
export const findAllKeyboardAndLikes = async () => {
  const findAllKeyboardAndLikesQuery = await supabase
    .from('keyboard')
    .select(`*, keyboard_like(count)`)
    .returns<Tables<'keyboard'>[]>();

  const {data: keyboardList, error} = findAllKeyboardAndLikesQuery;

  return {keyboardList, error};
};

/**
 * 키보드 상세 데이터를 관련 리뷰와 같이 가져온다. 리뷰는 작성 순으로 최대 3개까지만 가져온다.
 * @param id
 */
export const findKeyboardByIdWithReview = async (id: number) => {
  // 키보드 상세 정보를 해당 키보드에 대한 리뷰 데이터와 함께 가져온다.
  // 리뷰 데이터는 작성순으로 3개 가지만 가져온다.
  const findKeyboardByIdQuery = await supabase
    .from('keyboard')
    .select('*, review(*, profiles(*))')
    .order('write_date', {referencedTable: 'review', ascending: false})
    .range(0, 2, {foreignTable: 'review'})
    .eq('id', id)
    .returns<Tables<'keyboard'>[]>();

  const {data: keyboard, error} = findKeyboardByIdQuery;

  return {keyboard, error};
};

/**
 * 전체 키보드의 아이디 목록만 가져온다.
 */
export const findKeyboardIdList = async () => {
  const findKeyboardIdListQuery = await supabase.from('keyboard').select('id').returns<Tables<'keyboard'>[]>();

  const {data: keyboardIdList, error} = findKeyboardIdListQuery;

  return {keyboardIdList, error};
};
