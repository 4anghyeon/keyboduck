import {supabase} from '@/shared/supabase/supabase';

export interface AlertMessageArgs {
  type: TargetType;
  message: string;
  userId: string;
  targetId: number;
}

export const addAlertMessageByIdAndTarget = async ({type, message, userId, targetId}: AlertMessageArgs) => {
  await supabase
    .from('alert_message')
    .insert([{type, message, user_id: userId, target_id: targetId}])
    .select();
};
