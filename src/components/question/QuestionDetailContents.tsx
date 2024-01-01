import React from 'react';
import styles from '@/components/question/QusetionDetailContents.module.css';
import {FaRegUserCircle} from 'react-icons/fa';
import {useRouter} from 'next/router';

import Link from 'next/link';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteQuestion} from '@/pages/api/question';
import Swal from 'sweetalert2';
import {Tables} from '@/shared/supabase/types/supabase';

const QuestionDetailContents = ({getQuestionData, userId}: {getQuestionData: Tables<'question'>[]; userId: string}) => {
  const router = useRouter();
  const questionId: number | null = Number(router.query.questionId);
  const findQuestion = getQuestionData?.find(question => question.id === questionId);
  const queryClient = useQueryClient();
  const deleteQuestionMutation = useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getQuestion']});
    },
  });

  const clickQuestionDelete = (id: number) => {
    Swal.fire({
      title: '삭제하시겠습니까?',
      text: '⚠️ 삭제 시 되돌릴 수 없습니다',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#b0b0b0',
      cancelButtonColor: '#83e0a5',
      confirmButtonText: '네',
      cancelButtonText: '아니요',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
        });
        deleteQuestionMutation.mutate(id);
        router.push('/question');
      }
    });
  };

  return (
    <div className={styles['detail-contents-container']}>
      <div className={styles['detail-category']}>
        {/* 카테고리 이름 */}
        <p>{findQuestion?.category}</p>
      </div>
      <div className={styles['detail-title']}>
        <h2>{findQuestion?.title}</h2>
        <div className={styles['detail-user']}>
          <img className={styles['detail-user-profile']} src={findQuestion?.profiles.avatar_url!} />
          <p>{findQuestion?.profiles.username}</p>
        </div>
      </div>
      <div className={styles['detail-date']}>
        <p>{findQuestion?.write_date?.substring(0, 10)}</p>
      </div>
      <div className={!!userId ? styles['detail-contents-login'] : styles['detail-contents-logout']}>
        <p>{findQuestion?.content}</p>
      </div>
      {!!userId && findQuestion?.user_id === userId ? (
        <div className={styles['detail-board-btn']}>
          <Link href={`/question/edit/${questionId}`}>
            <button>수정</button>
          </Link>
          <button onClick={() => clickQuestionDelete(findQuestion.id)}>삭제</button>
        </div>
      ) : null}
    </div>
  );
};

export default QuestionDetailContents;
