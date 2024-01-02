import {useMutation, useQuery} from '@tanstack/react-query';
import {
  addLikeByKeyboardIdAndUserId,
  findKeyboardLikeByUserId,
  findLikeByKeyboardId,
  removeLikeByKeyboardIdAndUserId,
} from '@/pages/api/keyboard-like';
import {supabase} from '@/shared/supabase/supabase';
import {queryClient} from '@/pages/_app';
import {Tables} from '@/shared/supabase/types/supabase';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';

const QUERY_KEY = 'keyboardLike';

export const useKeyboardLike = (keyboardId?: number) => {
  const {id: userId} = useSelector((state: RootState) => state.userSlice);

  const {data: likes, isPending: isLikePending} = useQuery({
    queryKey: [QUERY_KEY, keyboardId],
    queryFn: () => findLikeByKeyboardId(keyboardId ?? 0),
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

      return await addLikeByKeyboardIdAndUserId(keyboardId ?? 0, userId);
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
      return await removeLikeByKeyboardIdAndUserId(keyboardId ?? 0, userId);
    },
  });

  const {data: likelist, isPending: isLikelistPending} = useQuery({
    queryKey: [QUERY_KEY, userId],
    queryFn: () => findKeyboardLikeByUserId(userId),
  });

  return {addLike, removeLike, likes, isLikePending, likelist};
};
