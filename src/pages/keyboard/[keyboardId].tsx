import React from 'react';
import {Tables} from '@/shared/supabase/types/supabase';
import Detail from '@/components/keyboard/Detail';
import {findKeyboardById, findKeyboardIdList} from '@/pages/api/keyboard';
import {GetStaticPaths} from 'next';
import RelatedVideos from '@/components/keyboard/RelatedVideos';

const KeyboardDetailPage = ({keyboard}: {keyboard: Tables<'keyboard'>}) => {
  console.log(keyboard);
  return (
    <div>
      <Detail item={keyboard} />
      <RelatedVideos />
    </div>
  );
};

export default KeyboardDetailPage;

export const getStaticProps = async (props: {params: {keyboardId: string}}) => {
  const {keyboard, error} = await findKeyboardById(+props.params.keyboardId);

  return {
    props: {
      keyboard: keyboard?.[0],
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const {keyboardIdList, error} = await findKeyboardIdList();

  return {
    paths: keyboardIdList!.map(keyboard => ({
      params: {
        keyboardId: keyboard.id.toString(),
      },
    })),
    fallback: false,
  };
};
