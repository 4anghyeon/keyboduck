import {supabase} from '@/shared/supabase/supabase';

export const findLikeByKeyboardIdAndUserId = async (keyboardId: number, userId: string) => {
  let {data: keyboardLike, error} = await supabase
    .from('keyboard_like')
    .select('*')
    .eq('user_id', userId)
    .eq('target_id', keyboardId);

  return keyboardLike;
};

export const addLikeByKeyboardId = async (keyboardId: number, userId: string) => {
  await supabase
    .from('keyboard_like')
    .insert([{target_id: keyboardId, user_id: userId}])
    .select();
};
