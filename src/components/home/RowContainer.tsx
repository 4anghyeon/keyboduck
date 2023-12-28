import React, {useRef, useState} from 'react';
import styles from './row-container.module.css';
import KeyboardCard from '@/components/home/KeyboardCard';
import {MdOutlineArrowBackIos, MdOutlineArrowForwardIos} from 'react-icons/md';
import {Tables} from '@/shared/supabase/types/supabase';

interface Props {
  title: string;
  keyboardList: Tables<'keyboard'>[];
}

const CARD_MOVE_SIZE = 400;

const RowContainer = (props: Props) => {
  const [cardIndex, setCardIndex] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);

  const onClickNextButton = () => {
    if (cardIndex > props.keyboardList.length - 1) return;
    setCardIndex(prev => ++prev);
    rowRef.current!.style.transform = `translateX(${-CARD_MOVE_SIZE * (cardIndex + 1)}px)`;
  };

  const onClickPrevButton = () => {
    if (cardIndex < 1) return;
    setCardIndex(prev => --prev);
    rowRef.current!.style.transform = `translateX(${-CARD_MOVE_SIZE * (cardIndex + 1) + CARD_MOVE_SIZE * 2}px)`;
  };

  return (
    <section className={styles.container}>
      <h1>{props.title}</h1>
      <div className={styles.row} ref={rowRef}>
        {props.keyboardList.map(item => {
          return <KeyboardCard key={item.id} item={item} />;
        })}
      </div>
      {cardIndex !== 0 && (
        <button className={[styles['prev-button'], styles['button']].join(' ')} onClick={onClickPrevButton}>
          <MdOutlineArrowBackIos />
        </button>
      )}

      {cardIndex < props.keyboardList.length - 1 && (
        <button className={[styles['next-button'], styles['button']].join(' ')} onClick={onClickNextButton}>
          <MdOutlineArrowForwardIos />
        </button>
      )}
    </section>
  );
};

export default RowContainer;
