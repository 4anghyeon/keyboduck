import React, {useState} from 'react';
import styles from './grid-container.module.css';
import KeyboardCard from '@/components/home/KeyboardCard';
import {BRAND} from '@/shared/common-data';
import {Tables} from '@/shared/supabase/types/supabase';

interface Props {
  keyboard: Tables<'keyboard'>[];
}

const GridContainer = (props: Props) => {
  const [selectedBrand, setSelectedBrand] = useState(BRAND[0]);

  const onClickBrandButton = (brand: Brand) => {
    setSelectedBrand(brand);
  };

  const selectedBrandList = props.keyboard.filter(
    k => k.brand === selectedBrand.name || k.brand === selectedBrand.enName,
  );

  return (
    <div className={styles.container}>
      <h1>브랜드별 키보드</h1>
      {BRAND.map(brand => {
        return (
          <button
            key={brand.name}
            className={[styles['brand-button'], selectedBrand.name === brand.name ? styles['selected'] : ''].join(' ')}
            onClick={onClickBrandButton.bind(null, brand)}
          >
            {brand.name}
          </button>
        );
      })}
      <div className={styles.grid}>
        {selectedBrandList.map(item => {
          return <KeyboardCard item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default GridContainer;
