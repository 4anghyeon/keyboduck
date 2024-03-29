import React from 'react';
import styles from './keyboard-card.module.css';
import {Tables} from '@/shared/supabase/types/supabase';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {GiPlasticDuck} from 'react-icons/gi';

const KeyboardCard = ({item}: {item: Tables<'keyboard'>}) => {
  const router = useRouter();

  return (
    <div className={styles.card} onClick={() => router.push(`/keyboard/${item.id}`)}>
      <Image src={item.photo ?? ''} alt={item.name} width={300} height={300} priority={true} />
      <div className={styles['hidden-message']}>상세정보 보러 가기</div>
      <div className={styles.description}>
        <span>{item.name}</span>
        <span>
          <GiPlasticDuck size={20} /> <span>{item.keyboard_like[0].count}</span>
        </span>
      </div>
    </div>
  );
};

export default KeyboardCard;
