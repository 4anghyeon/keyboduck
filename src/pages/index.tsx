import RowContainer from '@/components/home/RowContainer';
import GridContainer from '@/components/home/GridContainer';
import {findAllKeyboard} from '@/pages/api/keyboard';
import {Tables} from '@/shared/supabase/types/supabase';

export default function HomePage({keyboardList}: Readonly<{keyboardList: Tables<'keyboard'>[]}>) {
  // 인기 키보드
  // TODO: 나중에 좋아요 순으로 정렬 해야함
  const popularList = [...keyboardList]
    .sort((a, b) => {
      return new Date(a.release_date).getDate() - new Date(b.release_date).getDate();
    })
    .slice(0, 10);

  // 출시일 순으로 정렬한 키보드 데이터
  const recentlyList = [...keyboardList]
    .sort((a, b) => {
      return new Date(b.release_date).getDate() - new Date(a.release_date).getDate();
    })
    .slice(0, 5);

  return (
    <>
      <RowContainer title={'인기 키보드'} keyboardList={popularList} />
      <RowContainer title={'새로나온 키보드'} keyboardList={recentlyList} />
      <GridContainer keyboardList={keyboardList} />
    </>
  );
}

export const getStaticProps = async () => {
  const {keyboardList, error} = await findAllKeyboard();

  return {
    props: {
      keyboardList,
    },
    revalidate: 60,
  };
};
