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
  if (!numPages) return;
  return (
    <div className={styles['btn-container']}>
      {[...Array(numPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            className={pageNumber === page ? styles['select-btn'] : styles['btn']}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
