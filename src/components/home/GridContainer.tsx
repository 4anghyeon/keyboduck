import React, {useEffect, useState} from 'react';
import styles from './grid-container.module.css';
import KeyboardCard from '@/components/home/KeyboardCard';
import {BRAND} from '@/shared/common-data';
import {Tables} from '@/shared/supabase/types/supabase';
import {useSearchParams} from 'next/navigation';

interface Props {
  keyboardList: Tables<'keyboard'>[];
}

const GridContainer = (props: Props) => {
  const [selectedBrand, setSelectedBrand] = useState(BRAND[0]);

  const onClickBrandButton = (brand: Brand) => {
    setSelectedBrand(brand);
    localStorage.setItem('selectedBrand', JSON.stringify(brand));
  };

  // 선택된 브랜드가 기타일 경우 목록에 없는 브랜드를 전부 포함한다.
  const selectedBrandList =
    selectedBrand.name === '기타'
      ? props.keyboardList.filter(
          k =>
            !BRAND.map(b => [b.name, b.enName])
              .flat()
              .find(b => b === k.brand),
        )
      : props.keyboardList.filter(k => k.brand === selectedBrand.name || k.brand === selectedBrand.enName);

  useEffect(() => {
    const prevSelected = localStorage.getItem('selectedBrand');
    if (prevSelected) {
      setSelectedBrand(JSON.parse(prevSelected));
    }
  }, []);

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
