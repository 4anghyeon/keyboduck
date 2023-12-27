import RowContainer from '@/components/home/RowContainer';
import GridContainer from '@/components/home/GridContainer';
import {findAllKeyboard} from '@/pages/api/keyboard';
import {Tables} from '@/shared/supabase/types/supabase';

export default function HomePage({keyboard}: Readonly<{keyboard: Tables<'keyboard'>[]}>) {
  console.log(keyboard);
  return (
    <>
      <RowContainer title={'인기 키보드'} keyboard={keyboard} />
      <RowContainer title={'새로나온 키보드'} keyboard={keyboard} />
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
