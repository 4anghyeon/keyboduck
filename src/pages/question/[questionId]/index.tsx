import React from 'react';
import styles from '@/pages/question/[questionId]/index.module.css';
import {FaRegUserCircle} from 'react-icons/fa';

const QuestionDetail = () => {
  return (
    <div className={styles['detail-container']}>
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
      <div className={styles['detail-answer-container']}>
        <div className={styles['detail-answer-register-btn']}>
          <button>답변 등록하기</button>
        </div>
        {/* 댓글 들어갈 곳 */}
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
      </div>
    </div>
  );
};

export default QuestionDetail;
