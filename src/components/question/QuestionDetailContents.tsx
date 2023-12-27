import React from 'react';
import styles from '@/components/question/QusetionDetailContents.module.css';
import {FaRegUserCircle} from 'react-icons/fa';

const QuestionDetailContents = () => {
  return (
    <div className={styles['detail-contents-container']}>
      <div className={styles['detail-category']}>
        {/* 카테고리 이름 */}
        <p>카테고리</p>
      </div>
      <div className={styles['detail-title']}>
        <h2>키크론이랑 바밀로 중에 고민되네요</h2>
        <div className={styles['detail-user']}>
          <FaRegUserCircle size="25" color="#83e0a5" />
          <p>작성자</p>
        </div>
      </div>
      <div className={styles['detail-date']}>
        <p>2023-12-27</p>
      </div>
      <div className={styles['detail-contents']}>
        <p>질문 내용</p>
      </div>
      <div className={styles['detail-board-btn']}>
        <button>수정</button>
        <button>삭제</button>
      </div>
    </div>
  );
};

export default QuestionDetailContents;
