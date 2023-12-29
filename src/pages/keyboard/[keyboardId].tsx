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

  console.log(keyboard);
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
      keyboard: keyboard?.[0],
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const {keyboardIdList} = await findKeyboardIdList();

  return {
    paths: keyboardIdList!.map(keyboard => ({
      params: {
        keyboardId: keyboard.id.toString(),
      },
    })),
    fallback: true,
  };
};
