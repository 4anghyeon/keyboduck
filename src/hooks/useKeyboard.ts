import {useQuery} from '@tanstack/react-query';
import {findAllKeyboard} from '@/pages/api/keyboard';

const QUERY_KEY = 'keyboard';

const useKeyboard = () => {
  const {data: keyboardList, isPending: isKeyboardListPending} = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => findAllKeyboard(),
  });

  return {keyboardList, isKeyboardListPending};
};
