import React from 'react';
import styles from '@/pages/qna/list/index.module.css';
import Link from 'next/link';

const Qna = () => {
  return (
    <div className={styles['qna-container']}>
      <div className={styles['qna-title']}>
        <h2>QnA</h2>
      </div>
      <div className={styles['qna-sreach-bar']}>
        <input placeholder="검색어를 입력해주세요" />
        <button>⌕</button>
      </div>
      <div className={styles['qna-list']}>
        <div className={styles['qna-list-title']}>
          <p>날짜</p>
          <p>제목</p>
          <p>작성자</p>
        </div>
        <div className={styles['qna-list-item']}>
          {/* 데이터 들어갈 자리 */}
          <p>2023-12-25</p>
          <p>키크론 k8 pro 좋은가요?</p>
          <p>HelloWorld</p>
        </div>
      </div>
      <div className={styles['qna-registration-btn']}>
        <button>
          <Link href="/qna/registration">작성하기 </Link>
        </button>
      </div>
    </div>
  );
};

export default Qna;