import React from 'react';
import styles from './searchKeyboard.module.css';
import {useState} from 'react';
import {useCallback} from 'react';
import {Modal} from '../modal/Modal';
import {useQuery} from '@tanstack/react-query';
import {findAllKeyboard} from '@/pages/api/keyboard';
import {Tables} from '@/shared/supabase/types/supabase';
import {ReactNode} from 'react';

interface Props {
  keyboardList: Tables<'keyboard'>[];
}

const SearchKeyboard = (props: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  // const {data} = useQuery({
  //   queryKey: ['allKeyboardData'],
  //   queryFn: findAllKeyboard,
  // });

  const clickOpenModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <h3>검색한키보드</h3>
        {isOpenModal && (
          <div>
            <Modal onClickToggleHandler={clickOpenModal}>
              <div className={styles['modal-comment-container']}>
                <input className={styles['modal-comment']} placeholder="키보드를 검색하세요" />
                <button className={styles['modal-button']}>🔎</button>
              </div>
              <ul className={styles.keyboard}>
                {props.keyboardList?.map((keyboard, index) => {
                  <li key={index}>{keyboard.name}</li>;
                })}
              </ul>
            </Modal>
          </div>
        )}
        <div className={styles['search-wrap']}>
          <button onClick={clickOpenModal}>키보드 종류 검색</button>
        </div>
      </div>
    </div>
  );
};

export default SearchKeyboard;
