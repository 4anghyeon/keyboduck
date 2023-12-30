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
  const showedLecture = new Array(numPages).fill(0);
  return (
    <div>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </button>
      {showedLecture.map((item, index) => {
        return (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={index + 1 === page ? styles[''] : styles['']}
          >
            {index + 1}
          </button>
        );
      })}
      <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
