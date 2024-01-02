import React from 'react';
import {Tables} from '@/shared/supabase/types/supabase';
import Detail from '@/components/keyboard/Detail';
import {findKeyboardByIdWithReview, findKeyboardIdList} from '@/pages/api/keyboard';
import {GetStaticPaths} from 'next';
import RelatedVideos from '@/components/keyboard/RelatedVideos';
import Head from 'next/head';
import {makeTitle} from '@/shared/helper';
import {useRouter} from 'next/router';
import Loading from '@/components/layout/loading/Loading';
import RelatedReviews from '@/components/keyboard/RelatedReviews';

const KeyboardDetailPage = ({keyboard}: {keyboard: Tables<'keyboard'>}) => {
  const router = useRouter();
  if (router.isFallback) return <Loading />;

  if (!keyboard) router.push('/404');

  return (
    <article>
      <Head>
        <title>{makeTitle(keyboard.name)}</title>
      </Head>
      <Detail item={keyboard} />
      <RelatedVideos item={keyboard} />
      <RelatedReviews reviews={keyboard.review} />
    </article>
  );
};

export default KeyboardDetailPage;

export const getStaticProps = async (props: {params: {keyboardId: string}}) => {
  const {keyboard} = await findKeyboardByIdWithReview(+props.params.keyboardId);

  return {
    props: {
      keyboard: keyboard && keyboard[0],
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const {keyboardIdList} = await findKeyboardIdList();

  // 데이터베이스에서 모든 키보드 아이디를 불러온 후 해당 키보드들의 상세 페이지를 사전 렌더링 한다.
  return {
    paths: keyboardIdList!.map(keyboard => ({
      params: {
        keyboardId: keyboard.id.toString(),
      },
    })),
    fallback: true,
  };
};
