import RowContainer from '@/components/home/RowContainer';
import GridContainer from '@/components/home/GridContainer';

export default function HomePage() {
  return (
    <>
      <RowContainer title={'인기 키보드'} />
      <RowContainer title={'새로나온 키보드'} />
      <GridContainer />
    </>
  );
}
