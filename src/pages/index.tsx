import RowContainer from '@/components/home/RowContainer';
import GridContainer from '@/components/home/GridContainer';
import {findAllKeyboardAndLikes} from '@/pages/api/keyboard';
import {Tables} from '@/shared/supabase/types/supabase';
import {useEffect} from 'react';
import moment from 'moment';

const HomPage = ({keyboardList}: Readonly<{keyboardList: Tables<'keyboard'>[]}>) => {
  // 인기 키보드
  const popularList = [...keyboardList]
    .sort((a, b) => {
      return b.keyboard_like[0].count - a.keyboard_like[0].count;
    })
    .slice(0, 10);

  // 출시일 순으로 정렬한 키보드 데이터
  const recentlyList = [...keyboardList]
    .sort((a, b) => {
      return moment(b.release_date).isAfter(a.release_date) ? 1 : -1;
    })
    .slice(0, 5);

  useEffect(() => {}, []);

  return (
    <>
      <RowContainer title={'인기 키보드'} keyboardList={popularList} />
      <RowContainer title={'새로나온 키보드'} keyboardList={recentlyList} />
      <GridContainer keyboardList={keyboardList} />
    </>
  );
};

export default HomPage;

export const getStaticProps = async () => {
  const {keyboardList} = await findAllKeyboardAndLikes();

  return {
    props: {
      keyboardList,
    },
    revalidate: 60,
  };
};
