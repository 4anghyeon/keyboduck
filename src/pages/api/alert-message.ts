import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';
import {queryClient} from '@/pages/_app';
import {ALERT_MESSAGE_QUERY_KEY} from '@/hooks/useAlertMessage';

export const ALERT_MESSAGE_PAGE_SIZE = 3;

export interface AlertMessageArgs {
  type: TargetType;
  message: string;
  userId: string;
  targetId: number;
}

/**
 * alert_message 테이블에서 ALERT_MESSAGE_PAGE_SIZE 만큼만 가져온다.
 * @param userId
 * @param pageParam useInfiniteQuery 사용시 자동으로 증가한다.
 */
export const findAllMessageByUserId = async ({userId, pageParam = 0}: {userId: string; pageParam?: number}) => {
  const findAllMessageQuery = await supabase
    .from('alert_message')
    .select('*')
    .order('created_at')
    .range(pageParam === 0 ? pageParam : pageParam + 1, pageParam === 0 ? 2 : pageParam + ALERT_MESSAGE_PAGE_SIZE)
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

export const updateAlertMessageRead = async (id: string) => {
  await supabase.from('alert_message').update({read: true}).eq('id', id);
  await queryClient.invalidateQueries({
    queryKey: [ALERT_MESSAGE_QUERY_KEY],
  });
};
