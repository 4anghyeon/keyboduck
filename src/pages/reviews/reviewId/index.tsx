import React from 'react';
import styles from './index.module.css';
const ReviewDetail = () => {
  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>제목입니다</h1>
        <div className={styles['search-wrap']}>
          <button>키보드 종류 검색</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
