import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';

export const findAllKeyboard = async () => {
  const findAllKeyboardQuery = await supabase.from('keyboard').select('*').returns<Tables<'keyboard'>[]>();

  const {data: keyboardList, error} = findAllKeyboardQuery;

  return {keyboardList, error};
};

export const findKeyboardById = async (id: number) => {
  const findKeyboardByIdQuery = await supabase
    .from('keyboard')
    .select('*')
    .eq('id', id)
    .returns<Tables<'keyboard'>[]>();

  const {data: keyboard, error} = findKeyboardByIdQuery;

  return {keyboard, error};
};

export const findKeyboardIdList = async () => {
  const findKeyboardIdListQuery = await supabase.from('keyboard').select('id').returns<Tables<'keyboard'>[]>();

  const {data: keyboardIdList, error} = findKeyboardIdListQuery;

  return {keyboardIdList, error};
};