import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';

export const findAllKeyboard = async () => {
  const findAllKeyboardQuery = await supabase.from('keyboard').select('*').returns<Tables<'keyboard'>[]>();

  const {data: keyboard, error} = findAllKeyboardQuery;

  return {keyboard, error};
};
