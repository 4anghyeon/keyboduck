import RowContainer from '@/components/home/RowContainer';
import GridContainer from '@/components/home/GridContainer';
import {findAllKeyboard} from '@/pages/api/keyboard';
import {Tables} from '@/shared/supabase/types/supabase';

export default function HomePage({keyboard}: Readonly<{keyboard: Tables<'keyboard'>[]}>) {
  // 출시일 순으로 정렬한 키보드 데이터
  const recentlyList = keyboard.toSorted((a, b) => {
    return new Date(b.release_date).getDate() - new Date(a.release_date).getDate();
  });

  console.log(recentlyList);

  return (
    <>
      <RowContainer title={'인기 키보드'} keyboard={keyboard} />
      <RowContainer title={'새로나온 키보드'} keyboard={recentlyList} />
      <GridContainer keyboard={keyboard} />
    </>
  );
}

export async function getStaticProps() {
  const {keyboard, error} = await findAllKeyboard();

  return {
    props: {
      keyboard,
    },
    revalidate: 60,
  };
}
