import {useMutation, useQuery} from '@tanstack/react-query';
import {
  addLikeByKeyboardIdAndUserId,
  findLikeByKeyboardId,
  removeLikeByKeyboardIdAndUserId,
} from '@/pages/api/keyboard-like';
import {supabase} from '@/shared/supabase/supabase';
import {queryClient} from '@/pages/_app';
import {Tables} from '@/shared/supabase/types/supabase';

const QUERY_KEY = 'keyboardLike';

export const useKeyboardLike = (keyboardId: number) => {
  let userId = '';

  supabase.auth.getUserIdentities().then(info => {
    const {data} = info;
    if (data) {
      userId = data.identities[0].user_id;
    }
  });

  const {data: likes, isPending: isLikePending} = useQuery({
    queryKey: [QUERY_KEY, keyboardId],
    queryFn: () => findLikeByKeyboardId(keyboardId),
  });

  const {mutate: addLike} = useMutation({
    mutationFn: async () => {
      // 좋아요 Optimistic Query!!!
      // 네트워크 지연 상황에 따라 [keyboard-like]에 요청이 아직 있을 수 있으므로 먼저 keyboard-like 쿼리를 취소 시킨다.
      await queryClient.cancelQueries({queryKey: [QUERY_KEY, keyboardId]});

      // 캐시된 데이터를 가져온다
      const previousLikes = queryClient.getQueryData<Tables<'keyboard_like'>[]>([QUERY_KEY, keyboardId]);

      // 캐시된 데이터에 데이터를 넣어 먼저 set하고, 실제 네트워크 요청은 나중에 들어간다.
      if (previousLikes) {
        queryClient.setQueryData([QUERY_KEY, keyboardId], () => [
          {target_id: keyboardId, user_id: userId},
          ...previousLikes,
        ]);
      }

      if (userId === '' || keyboardId === 0) return;

      return await addLikeByKeyboardIdAndUserId(keyboardId, userId);
    },
  });

  const {mutate: removeLike} = useMutation({
    mutationFn: async () => {
      await queryClient.cancelQueries({queryKey: [QUERY_KEY, keyboardId]});
      const previousLikes = queryClient.getQueryData<Tables<'keyboard_like'>[]>([QUERY_KEY, keyboardId]);
      if (previousLikes) {
        queryClient.setQueryData([QUERY_KEY, keyboardId], () => previousLikes.filter(l => l.user_id !== userId));
      }

      if (userId === '' || keyboardId === 0) return;
      return await removeLikeByKeyboardIdAndUserId(keyboardId, userId);
    },
  });

  return {addLike, removeLike, likes, isLikePending};
};
