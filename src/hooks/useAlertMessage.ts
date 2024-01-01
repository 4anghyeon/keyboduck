import {useInfiniteQuery, useMutation} from '@tanstack/react-query';
import {
  addAlertMessageByIdAndTarget,
  ALERT_MESSAGE_PAGE_SIZE,
  AlertMessageArgs,
  findAllMessageByUserId,
  updateAlertMessageRead,
} from '@/pages/api/alert-message';

export const ALERT_MESSAGE_QUERY_KEY = 'alert-message';

export const useAlertMessage = (userId?: string) => {
  /**
   * 메시지 목록을 infiniteQuery 를 이용해 가져온다.
   * 한번 가져올 때마다 ALERT_MESSAGE_PAGE_SIZE 길이만큼만 가져온다.
   * 지난 알림 더 보기 클릭시 계속해서 ALERT_MESSAGE_PAGE_SIZE 만큼 추가 된다.
   */
  const {
    data: messageList,
    hasNextPage,
    isFetching: isMessageFeting,
    fetchNextPage: fetchNextMessageList,
  } = useInfiniteQuery({
    queryKey: [ALERT_MESSAGE_QUERY_KEY, {userId}],
    enabled: userId !== undefined && userId !== '',
    queryFn: ({pageParam}) => findAllMessageByUserId({userId: userId ?? '', pageParam}),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      // 마지막으로 가져온 페이지의 길이가 가져와야 하는 페이지의 길이가 같은 경우에만 return
      // 아닐 경우 hasNextPage값이 false가 됨.
      if (lastPage.data!.length === ALERT_MESSAGE_PAGE_SIZE) return lastPageParam + ALERT_MESSAGE_PAGE_SIZE; // 페이지마다 10개의 아이템을 가져오기 때문에 계산식을 맞춰야 함
    },
    select: data => {
      return data.pages.map(p => p.data).flat();
    },
  });

  const {mutate: addAlertMessage} = useMutation({
    mutationFn: async (arg: AlertMessageArgs) => {
      return await addAlertMessageByIdAndTarget(arg);
    },
  });

  const {mutate: updateAlertMessage} = useMutation({
    mutationFn: async (id: string) => {
      return await updateAlertMessageRead(id);
    },
  });

  return {addAlertMessage, messageList, hasNextPage, fetchNextMessageList, updateAlertMessage, isMessageFeting};
};
