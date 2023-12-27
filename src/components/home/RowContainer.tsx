import React from 'react';
import styles from './row-container.module.css';
import KeyboardCard from '@/components/home/KeyboardCard';
import {MdOutlineArrowBackIos, MdOutlineArrowForwardIos} from 'react-icons/md';
import {Tables} from '@/shared/supabase/types/supabase';

interface Props {
  title: string;
  keyboard: Tables<'keyboard'>[];
}

const RowContainer = (props: Props) => {
  return (
    <div className={styles.container}>
      <h1>{props.title}</h1>
      <div className={styles.row}>
        {props.keyboard.map(item => {
          return <KeyboardCard key={item.id} item={item} />;
        })}
      </div>
      <button className={[styles['prev-button'], styles['button']].join(' ')}>
        <MdOutlineArrowBackIos />
      </button>
      <button className={[styles['next-button'], styles['button']].join(' ')}>
        <MdOutlineArrowForwardIos />
      </button>
    </div>
  );
};

export default RowContainer;
