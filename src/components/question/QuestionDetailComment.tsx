import React, {useEffect, useState} from 'react';
import styles from '@/components/question/QuestionDetailComment.module.css';
import {AnswerType} from '@/pages/question/types/question';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {completionAnswer, deleteAnswer, isEditAnswer} from '@/pages/api/answer';
import Swal from 'sweetalert2';
import {useToast} from '@/hooks/useToast';
import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';

const QuestionDetailComment = ({getAnswer, userId}: {getAnswer: Tables<'answer'>; userId: string}) => {
  const [isEdit, setIsEdit] = useState(getAnswer.is_edit);
  const [user, setUser] = useState(null);
  const [answerContent, setAnswerContent] = useState(getAnswer.content);
  const [revisedAnswer, setRevisedAnswer] = useState<string>(getAnswer.content!);

  const {successTopCenter, warnTopCenter} = useToast();

  const onChangeRevisedAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) => setRevisedAnswer(e.target.value);

  useEffect(() => {
    supabase.auth.getUserIdentities().then(info => {
      const author = info.data?.identities[0].identity_data?.name;
      if (author) setUser(author);
    });
  }, []);

  const queryClient = useQueryClient();
  const deleteAnswerMutation = useMutation({
    mutationFn: deleteAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getAnswer']});
    },
  });

  const completionAnswerMutation = useMutation({
    mutationFn: completionAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getAnswer']});
    },
  });

  const clickDeleteAnswer = (id: number) => {
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
        deleteAnswerMutation.mutate(id);
      }
    });
  };

  const clickEditAnswer = () => {
    if (isEdit) {
      Swal.fire({
        title: '취소하시겠습니까?',
        text: '⚠️ 수정된 내용은 저장되지 않습니다',
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
          setIsEdit(!isEdit);
        }
      });
    } else {
      setIsEdit(!isEdit);
    }
  };

  const clickCompletionAnswer = (id: number) => {
    if (answerContent === revisedAnswer) {
      warnTopCenter({message: '수정된 내용이 없습니다!', timeout: 2000});
      return false;
    }

    completionAnswerMutation.mutate({id, revisedAnswer});
    setAnswerContent(revisedAnswer);
    setIsEdit(!isEdit);
    successTopCenter({message: '수정되었습니다😀', timeout: 2000});
  };

  return (
    <div key={getAnswer.id} className={styles['detail-answer']}>
      <div className={styles['detail-answer-user']}>
        <p>{getAnswer.profiles.username}</p>
        <div className={styles['detail-answer-select']}>
          <button>채택하기</button>
          {getAnswer.profiles.id === userId && user !== null ? (
            <div className={styles['detail-answer-btn']}>
              {isEdit ? (
                <>
                  <button onClick={clickEditAnswer}>취소</button>
                  <button onClick={() => clickCompletionAnswer(getAnswer.id)}>완료</button>
                </>
              ) : (
                <>
                  <button onClick={clickEditAnswer}>수정</button>
                  <button onClick={() => clickDeleteAnswer(getAnswer.id)}>삭제</button>
                </>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles['detail-answer-date']}>
        <p>{getAnswer.write_date?.substring(0, 10)}</p>
      </div>
      {isEdit === true && user !== null ? (
        <div>
          <textarea
            rows={3}
            className={styles['detail-answer-content']}
            value={revisedAnswer!}
            onChange={onChangeRevisedAnswer}
          >
            {getAnswer.content}
          </textarea>
        </div>
      ) : (
        <div className={styles['detail-answer-content']}>{getAnswer.content}</div>
      )}
    </div>
  );
};

export default QuestionDetailComment;
