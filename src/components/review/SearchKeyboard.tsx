import React from 'react';
import styles from './searchKeyboard.module.css';
import {useState} from 'react';
import {useCallback} from 'react';
import {Modal} from '../modal/Modal';

const SearchKeyboard = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const clickOpenModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <div className={styles.container}>
      {isOpenModal && (
        <div>
          <Modal onClickToggleHandler={clickOpenModal}>
            <div className={styles['modal-comment-container']}>
              <input className={styles['modal-comment']} placeholder="키보드를 검색하세요" />
              <button className={styles['modal-button']}>🔎</button>
            </div>
            <ul className={styles.keyboard}>
              <li>키보드1</li>
              <li>키보드2</li>
            </ul>
          </Modal>
        </div>
      )}
      <div className={styles['search-wrap']}>
        <button onClick={clickOpenModal}>키보드 종류 검색</button>
      </div>
    </div>
  );
};

export default SearchKeyboard;
