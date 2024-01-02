import RowContainer from '@/components/home/RowContainer';
import GridContainer from '@/components/home/GridContainer';
import {findAllKeyboardAndLikes} from '@/pages/api/keyboard';
import {Tables} from '@/shared/supabase/types/supabase';
import moment from 'moment';
import Head from 'next/head';
import {makeTitle} from '@/shared/helper';
import styles from './index.module.css';
import React, {useEffect, useState} from 'react';
import {GoMoveToTop} from 'react-icons/go';

const HomPage = ({keyboardList}: Readonly<{keyboardList: Tables<'keyboard'>[]}>) => {
  const [showTopButton, setShowTopButton] = useState(false);

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

  // 화면 최상단으로 스크롤
  const handleScrollToTop = (behavior: 'smooth' | 'auto') => {
    window.scrollTo({top: 0, behavior: behavior});
  };

  useEffect(() => {
    // 스크롤 이벤트
    handleScrollToTop('auto');

    // 디바운싱을 위한 timer
    let timer: number | null = null;

    const handleScroll = () => {
      if (timer) {
        clearTimeout(timer);
      }

      // 일정 구간 이상 스크롤이 내려갔을 때 Top 버튼이 보이도록 한다.
      timer = window.setTimeout(() => {
        if (window.scrollY > window.outerHeight / 3) setShowTopButton(true);
        else setShowTopButton(false);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);

    // 화면 나갈 때 스크롤 이벤트 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>{makeTitle('당신의 키보드를 찾아보세요')}</title>
      </Head>
      <RowContainer title={'인기 키보드'} keyboardList={popularList} />
      <RowContainer title={'새로나온 키보드'} keyboardList={recentlyList} />
      <GridContainer keyboardList={keyboardList} />
      {showTopButton && (
        <button className={styles['top-button']} onClick={handleScrollToTop.bind(null, 'smooth')}>
          <GoMoveToTop />
        </button>
      )}
    </div>
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
