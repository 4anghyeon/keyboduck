import React from 'react';
import styles from './row-container.module.css';
import KeyboardCard from '@/components/home/KeyboardCard';
import {MdOutlineArrowBackIos, MdOutlineArrowForwardIos} from 'react-icons/md';

interface Props {
  title: string;
}

const RowContainer = (props: Props) => {
  return (
    <div className={styles.container}>
      <h1>{props.title}</h1>
      <div className={styles.row}>
        <KeyboardCard />
        <KeyboardCard />
        <KeyboardCard />
        <KeyboardCard />
        <KeyboardCard />
        <KeyboardCard />
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
