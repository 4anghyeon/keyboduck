import {useMutation} from '@tanstack/react-query';
import {addAlertMessageByIdAndTarget, AlertMessageArgs} from '@/pages/api/alert-message';

export const useAlertMessage = () => {
  const {mutate: addAlertMessage} = useMutation({
    mutationFn: async (arg: AlertMessageArgs) => {
      return await addAlertMessageByIdAndTarget(arg);
    },
  });

  return {addAlertMessage};
};
