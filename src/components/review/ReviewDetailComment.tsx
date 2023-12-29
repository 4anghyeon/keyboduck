import React from 'react';
import styles from './reviewDetailComment.module.css';

const ReviewDetailComment = () => {
  return (
    <div>
      <div className={styles['comment-wrap']}>
        <div className={styles.comment}>
          <input type="text" placeholder="댓글을 입력해주세요" />
          <button>등록</button>
        </div>
      </div>
      <div className={styles['comment-box']}>
        <div className={styles['comment-user']}>
          <p>댓글입니다</p>
          <span>닉네임입니다</span>
        </div>
        <div className={styles['comment-user']}>
          <span>댓글입력시간</span>
          <div>
            <button>수정 |</button>
            <button>삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailComment;
