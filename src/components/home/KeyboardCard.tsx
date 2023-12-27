import React from 'react';
import styles from './keyboard-card.module.css';
import {Tables} from '@/shared/supabase/types/supabase';
import Image from 'next/image';
import {useRouter} from 'next/router';

const KeyboardCard = ({item}: {item: Tables<'keyboard'>}) => {
  const router = useRouter();

  if (!item) return <p>Loading...</p>;
  return (
    <div className={styles.card} onClick={() => router.push(`/keyboard/${item.id}`)}>
      <Image src={item.photo ?? ''} alt={item.name} width={300} height={300} />
    </div>
  );
};

export default KeyboardCard;
