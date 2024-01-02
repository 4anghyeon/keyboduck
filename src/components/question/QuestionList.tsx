import React from 'react';
import styles from '@/components/question/QuestionList.module.css';
import Link from 'next/link';
import {Tables} from '@/shared/supabase/types/supabase';

const QuestionList = ({question}: {question: Tables<'question'>}) => {
  return (
    <div className={styles['qna-a-tag']}>
      <Link href={`/question/${question.id}`}>
        <div className={styles['qna-list-item']}>
          <p className={styles['qna-p-tag']}>{question.write_date?.substring(0, 10)}</p>
          <p className={styles['qna-p-tag']}>{question.category}</p>
          <div className={styles['qna-title-wrapper']}>
            <p className={`${styles['qna-title']} ${styles['qna-p-tag']}`}>{question.title}</p>
            <span className={styles['qna-comments-count']}>{`[${question.answer[0].count}]`}</span>
          </div>
          <p className={styles['qna-p-tag']}>{question.profiles.username}</p>
        </div>
      </Link>
    </div>
  );
};

export default QuestionList;
