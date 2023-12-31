import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';

export interface AlertMessageArgs {
  type: TargetType;
  message: string;
  userId: string;
  targetId: number;
}

export const findAllMessageByUserId = async (userId: string) => {
  const findAllMessageQuery = await supabase
    .from('alert_message')
    .select('*')
    .eq('user_id', userId)
    .returns<Tables<'alert_message'>[]>();

  const {data, error} = findAllMessageQuery;
  return {data, error};
};

export const addAlertMessageByIdAndTarget = async ({type, message, userId, targetId}: AlertMessageArgs) => {
  await supabase
    .from('alert_message')
    .insert([{type, message, user_id: userId, target_id: targetId}])
    .select();
};
