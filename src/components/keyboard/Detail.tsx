import React from 'react';
import styles from './detail.module.css';
import Image from 'next/image';
import {Tables} from '@/shared/supabase/types/supabase';

const Detail = ({item}: {item: Tables<'keyboard'>}) => {
  if (!item) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles['grid-1']}>
        <Image src={item.photo ?? ''} alt={item.name} width={400} height={400} />
      </div>
      <div>
        <h1>{item.name}</h1>
        <button>좋아요</button>
      </div>
      <div>
        <ul>
          <li>제조사: {item.brand}</li>
          <li>출시일: {item.release_date}</li>
          <li>가격: {item.price}</li>
          <li>연결방식: {item.is_wireless ? '무선' : '유선'}</li>
          <li>구매 링크: {item.purchase_link}</li>
        </ul>
      </div>
    </div>
  );
};

export default Detail;
