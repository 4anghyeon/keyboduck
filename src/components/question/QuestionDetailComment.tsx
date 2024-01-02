import React, {useEffect, useState} from 'react';
import styles from '@/components/question/QuestionDetailComment.module.css';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {completionAnswer, deleteAnswer, isAcceptAnswer} from '@/pages/api/answer';
import Swal from 'sweetalert2';
import {useToast} from '@/hooks/useToast';
import {Tables} from '@/shared/supabase/types/supabase';
import {RootState} from '@/redux/store';
import {useSelector} from 'react-redux';
import {FaCheck} from 'react-icons/fa';
import {acceptUser} from '@/pages/api/question';
import {useRouter} from 'next/router';
import {useAlertMessage} from '@/hooks/useAlertMessage';

const QuestionDetailComment = ({
  getAnswer,
  userId,
  getQuestionUserId,
  accept,
}: {
  getAnswer: Tables<'answer'>;
  userId: string;
  getQuestionUserId: string;
  accept: boolean | undefined;
}) => {
  const router = useRouter();
  const questionId = Number(router.query.questionId);
  const [isEdit, setIsEdit] = useState(getAnswer.is_edit);
  const [user, setUser] = useState('');
  const [answerContent, setAnswerContent] = useState(getAnswer.content);
  const [revisedAnswer, setRevisedAnswer] = useState<string>(getAnswer.content!);
  const userInfo = useSelector((state: RootState) => state.userSlice);

  const {addAlertMessage} = useAlertMessage();
  const {successTopCenter, warnTopCenter} = useToast();

  const onChangeRevisedAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) => setRevisedAnswer(e.target.value);

  useEffect(() => {
    if (userInfo.username !== '') setUser(userInfo.username);
  }, [userInfo]);

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

  const isAcceptAnswerMutation = useMutation({
    mutationFn: isAcceptAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getAnswer']});
      successTopCenter({message: '채택되었습니다!', timeout: 2000});

      if (getAnswer.user_id !== userId) {
        addAlertMessage({
          type: 'accept',
          message: `작성하신 답변이 채택되었습니다.`,
          userId: getAnswer.user_id!,
          targetId: questionId,
        });
      }
    },
  });
  const acceptUserMutation = useMutation({
    mutationFn: acceptUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getQuestion']});
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

  const clickIsAccept = (id: number, accept: boolean) => {
    acceptUserMutation.mutate(questionId);
    isAcceptAnswerMutation.mutate({id, accept});
  };

  return (
    <div
      key={getAnswer.id}
      className={getAnswer.is_accept ? styles['detail-answer-true'] : styles['detail-answer-false']}
    >
      {getAnswer.is_accept ? (
        <div className={styles['select-answer']}>
          <FaCheck />
          <p>채택된 답변</p>
        </div>
      ) : null}
      <div className={styles['detail-answer-user']}>
        <p>{getAnswer.profiles.username}</p>
        <div className={styles['detail-answer-select']}>
          {userId !== getQuestionUserId ||
          getAnswer.user_id === getQuestionUserId ||
          getAnswer.is_accept ||
          accept ? null : (
            <button onClick={() => clickIsAccept(getAnswer.id, getAnswer.is_accept!)}>채택하기</button>
          )}

          {getAnswer.profiles.id === userId && user !== null && getAnswer.is_accept === false ? (
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
        <p>
          {new Date(getAnswer.write_date!).toLocaleDateString('ko', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </p>
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
