'use client';

import React, {useCallback, useEffect, useState} from 'react';
import styles from '@/components/questionModal/modalContent.module.css';
import {supabase} from '@/shared/supabase/supabase';
import {useRouter} from 'next/router';

const ModalContent = ({
  isOpenModal,
  setIsOpenModal,
}: {
  isOpenModal: boolean;
  setIsOpenModal: (value: React.SetStateAction<boolean>) => void;
}) => {
  const [comment, setComment] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value);

  const router = useRouter();
  const questionId: number | null = Number(router.query.questionId);

  useEffect(() => {
    supabase.auth.getUserIdentities().then(info => {
      const author = info.data?.identities[0].identity_data?.name;
      if (author) setAuthor(author);
    });
  }, []);

  const clickOpenModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const writeComment = async () => {
    const {data, error} = await supabase
      .from('answer')
      .insert({author, content: comment, question_id: questionId, is_accept: false})
      .select();
    clickOpenModal();
    console.log('data', data, 'error', error);
  };

  return (
    <div className={styles['modal-comment-container']}>
      <textarea
        rows={15}
        className={styles['modal-comment']}
        placeholder="답변을 입력하세요"
        value={comment}
        onChange={onChangeComment}
      />
      <button className={styles['modal-button']} onClick={writeComment}>
        등록하기
      </button>
    </div>
  );
};

export default ModalContent;
