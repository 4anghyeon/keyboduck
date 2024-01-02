import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';

/**
 * 해당 키보드의 좋아요 갯수를 가져온다.
 * @param keyboardId
 */
export const findLikeByKeyboardId = async (keyboardId: number) => {
  let {data: keyboardLike} = await supabase
    .from('keyboard_like')
    .select('*')
    .eq('target_id', keyboardId)
    .returns<Tables<'keyboard_like'>[]>();

  return keyboardLike;
};

/**
 * 좋아요 테이을에 값을 추가한다.
 * @param keyboardId
 * @param userId
 */
export const addLikeByKeyboardIdAndUserId = async (keyboardId: number, userId: string) => {
  await supabase
    .from('keyboard_like')
    .insert([{target_id: keyboardId, user_id: userId}])
    .select();
};

/**
 * 좋아요 테이블에서 유저의 좋아요 정보를 삭제한다.
 * @param keyboardId
 * @param userId
 */
export const removeLikeByKeyboardIdAndUserId = async (keyboardId: number, userId: string) => {
  await supabase.from('keyboard_like').delete().eq('user_id', userId).eq('target_id', keyboardId);
};
