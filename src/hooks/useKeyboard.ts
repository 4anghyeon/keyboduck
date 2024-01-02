import {useQuery} from '@tanstack/react-query';
import {findAllKeyboard} from '@/pages/api/keyboard';

const QUERY_KEY = 'keyboard';

export const useKeyboard = () => {
  const {data, isPending: isKeyboardListPending} = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => findAllKeyboard(),
  });

  return {data, isKeyboardListPending};
};
