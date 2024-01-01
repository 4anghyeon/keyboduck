import React, {useEffect, useState} from 'react';
import router from 'next/router';
import styles from '@/pages/question/write/index.module.css';
import {supabase} from '@/shared/supabase/supabase';
import {useToast} from '@/hooks/useToast';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';

export const OPTION = ['카테고리 선택', '가격', '성능', '고장', '기타'];

const QuestionWrite = () => {
  const {successTopCenter, warnTopCenter, errorTopCenter} = useToast();
  const userInfo = useSelector((state: RootState) => state.userSlice);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [category, setCategory] = useState<string>('카테고리 선택');

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangeContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value);

  useEffect(() => {
    if (userInfo.id !== '') setUserId(userInfo.id);
  }, [userInfo]);

  const clickAddQuestion = async () => {
    if (title === '') {
      warnTopCenter({message: '제목을 입력해주세요!', timeout: 2000});
      return false;
    }
    if (content === '') {
      warnTopCenter({message: '내용을 입력해주세요!', timeout: 2000});
      return false;
    }
    if (category === '카테고리 선택') {
      warnTopCenter({message: '카테고리를 선택해주세요!', timeout: 2000});
      return false;
    }
    const {data, error} = await supabase
      .from('question')
      .insert({category, title, content, user_id: userId, accept: false})
      .select();
    if (data) {
      setTitle('');
      setContent('');
      setCategory('nothing');
      successTopCenter({message: '등록되었습니다😀', timeout: 2000});
      router.push('/question');
    } else {
      console.log(error);
      errorTopCenter({message: '오류가 발생하였습니다.', timeout: 2000});
    }
  };

  return (
    <div className={styles['qna-write-container']}>
      <div className={styles['qna-write-title']}>
        <h2>QnA</h2>
      </div>
      <div className={styles['qna-write-select']}>
        <select onChange={onChangeCategory}>
          {OPTION.map(item => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles['qna-write-contents']}>
        <input type="text" value={title} onChange={onChangeTitle} placeholder="제목을 입력해주세요" />
        <textarea rows={18} value={content} onChange={onChangeContents} placeholder="내용을 입력해주세요" />
      </div>
      <div className={styles['qna-write-registration-btn']}>
        <button onClick={clickAddQuestion}>등록하기</button>
      </div>
    </div>
  );
};

export default QuestionWrite;
