import React from 'react';
import styles from '@/components/question/QuestionDetailComment.module.css';

const QuestionDetailComment = () => {
  return (
    <div>
      <div className={styles['detail-answer']}>
        <div className={styles['detail-answer-user']}>
          <p>답변자</p>
          <div className={styles['detail-answer-select']}>
            <button>채택하기</button>
            <div className={styles['detail-answer-btn']}>
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>
        </div>
        <div className={styles['detail-answer-date']}>
          <p>2023년 12월 25일 12시 25분</p>
        </div>
        <div className={styles['detail-answer-content']}>답변 내용</div>
      </div>
    </div>
  );
};

export default QuestionDetailComment;
