import React from 'react';
import styles from '@/components/question/Pagination.module.css';

const Pagination = ({
  page,
  setPage,
  numPages,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  numPages: number;
}) => {
  // 전체 페이지 수만큼 숫자 생성
  const showedLecture = new Array(numPages).fill(0);

  return (
    <div className={styles['btn-container']}>
      {showedLecture.map((item, index) => {
        return (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={index + 1 === page ? styles['select-btn'] : styles['btn']}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
