import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';

export const findLikeByKeyboardId = async (keyboardId: number) => {
  let {data: keyboardLike} = await supabase.from('keyboard_like').select('*').eq('target_id', keyboardId);

  return keyboardLike;
};

export const addLikeByKeyboardIdAndUserId = async (keyboardId: number, userId: string) => {
  await supabase
    .from('keyboard_like')
    .insert([{target_id: keyboardId, user_id: userId}])
    .select();
};

export const removeLikeByKeyboardIdAndUserId = async (keyboardId: number, userId: string) => {
  await supabase.from('keyboard_like').delete().eq('user_id', userId).eq('target_id', keyboardId);
};

export const findKeyboardLikeByUserId = async (userId: string) => {
  let {data} = await supabase
    .from('keyboard_like')
    .select('*, keyboard(*)')
    .eq('user_id', userId)
    .returns<Tables<'keyboard_like'>[]>();

  return data;
};
