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
    .order('created_at', {ascending: false})
    .range(pageParam === 0 ? pageParam : pageParam + 1, pageParam === 0 ? 2 : pageParam + ALERT_MESSAGE_PAGE_SIZE)
    .eq('user_id', userId)
    .returns<Tables<'alert_message'>[]>();

  const {data, error} = findAllMessageQuery;

  return {data, error};
};

/**
 * alert_message 테이블에 데이터를 넣는다.
 * userId인 사람에게 메시지를 보낸다.
 * @param type -- 리뷰댓글, 답변, 채택 등
 * @param message -- 메시지 내용
 * @param userId -- 메시지를 받는 유저 아이디
 * @param targetId -- 글 아이디 (리뷰글 아이디, 질문글 아이디)
 */

export const addAlertMessageByIdAndTarget = async ({type, message, userId, targetId}: AlertMessageArgs) => {
  await supabase
    .from('alert_message')
    .insert([{type, message, user_id: userId, target_id: targetId}])
    .select();
};

/**
 * 메시지 클릭시 해당 메시지를 읽음 상태로 만든다.
 * @param id -- 메시지 아이디
 */
export const updateAlertMessageRead = async (id: string) => {
  await supabase.from('alert_message').update({read: true}).eq('id', id);
  await queryClient.invalidateQueries({
    queryKey: [ALERT_MESSAGE_QUERY_KEY],
  });
};
