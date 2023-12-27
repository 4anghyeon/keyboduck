import React from 'react';
import styles from './grid-container.module.css';
import KeyboardCard from '@/components/home/KeyboardCard';
import {BRAND} from '@/shared/common-data';

const GridContainer = () => {
  return (
    <div className={styles.container}>
      <h1>브랜드별 키보드</h1>
      {BRAND.map(brand => {
        return (
          <button key={brand.name} className={styles['brand-button']}>
            {brand.name}
          </button>
        );
      })}
      <div className={styles.grid}>
        <KeyboardCard />
        <KeyboardCard />
        <KeyboardCard />
        <KeyboardCard />
        <KeyboardCard />
      </div>
    </div>
  );
};

export default GridContainer;
