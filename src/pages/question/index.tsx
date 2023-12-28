'use client';

import React, {useEffect, useState} from 'react';
import styles from '@/pages/question/index.module.css';
import Link from 'next/link';
import QuestionList from '@/components/question/QuestionList';
import {supabase} from '@/shared/supabase/supabase';

import {QuestionType} from './types/question';

const Question = () => {
  const [questionList, setQuestionList] = useState<QuestionType[] | null>([]);

  useEffect(() => {
    const getQuestionList = async () => {
      const {data: question, error} = await supabase.from('question').select('*');

      setQuestionList(question);
    };
    getQuestionList();
  }, []);

  return (
    <div className={styles['qna-container']}>
      <div className={styles['qna-title']}>
        <h2>QnA</h2>
      </div>
      <div className={styles['qna-sreach-bar']}>
        <input type="text" placeholder="검색어를 입력해주세요" />
        <button>⌕</button>
      </div>
      <div className={styles['qna-list']}>
        <div className={styles['qna-list-title']}>
          <p>날짜</p>
          <p>제목</p>
          <p>작성자</p>
        </div>
        {/* 데이터 들어갈 자리 */}
        {questionList?.map(question => {
          return <QuestionList key={question.id} question={question} />;
        })}
      </div>
      <div className={styles['qna-registration-btn']}>
        <Link href="/question/write">
          <button>등록하기</button>
        </Link>
      </div>
    </div>
  );
};

export default Question;
