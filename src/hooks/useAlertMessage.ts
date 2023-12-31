import {useMutation, useQuery} from '@tanstack/react-query';
import {addAlertMessageByIdAndTarget, AlertMessageArgs, findAllMessageByUserId} from '@/pages/api/alert-message';

const QUERY_KEY = 'alert-message';

export const useAlertMessage = (userId?: string) => {
  const {data: messageList} = useQuery({
    queryKey: [QUERY_KEY],
    enabled: userId !== undefined && userId !== '',
    queryFn: () => findAllMessageByUserId(userId!),
  });

  const {mutate: addAlertMessage} = useMutation({
    mutationFn: async (arg: AlertMessageArgs) => {
      return await addAlertMessageByIdAndTarget(arg);
    },
  });

  return {addAlertMessage, messageList};
};
