import React from 'react';
import styles from '@/pages/question/write/index.module.css';

const OPTION = [
  {name: '카테고리 선택', value: 'select'},
  {name: '가격', value: 'price'},
  {name: '성능', value: 'performance'},
  {name: '고장', value: 'breakdown'},
  {name: '기타', value: 'atc'},
];

const QuestionWrite = () => {
  return (
    <div className={styles['qna-write-container']}>
      <div className={styles['qna-write-title']}>
        <h2>QnA</h2>
      </div>
      <div className={styles['qna-write-select']}>
        <select>
          {OPTION.map(item => {
            return (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles['qna-write-contents']}>
        <input type="text" placeholder="제목을 입력해주세요" />
        <textarea rows={18} placeholder="내용을 입력해주세요" />
      </div>
      <div className={styles['qna-write-registration-btn']}>
        <button>등록하기</button>
      </div>
    </div>
  );
};

export default QuestionWrite;
