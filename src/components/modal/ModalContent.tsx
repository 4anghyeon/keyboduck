import React, {useState} from 'react';
import styles from '@/components/modal/modalContent.module.css';
import {useToast} from '@/hooks/useToast';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import Swal from 'sweetalert2';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {addAnswer} from '@/pages/api/answer';
import {useAlertMessage} from '@/hooks/useAlertMessage';
import {Tables} from '@/shared/supabase/types/supabase';

const ModalContent = ({
  isOpenModal,
  setIsOpenModal,
  userId,
  getQuestionData,
  questionId,
}: {
  isOpenModal: boolean;
  setIsOpenModal: (value: React.SetStateAction<boolean>) => void;
  userId: string;
  getQuestionData: Tables<'question'>[] | null;
  questionId: number;
}) => {
  const [comment, setComment] = useState<string>('');
  const {addAlertMessage} = useAlertMessage();
  const findQuestion = getQuestionData?.find(question => question.id === questionId);

  const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value);

  const queryClient = useQueryClient();
  const addAnswerMutation = useMutation({
    mutationFn: async () => await addAnswer(userId, comment, questionId!),
    onSuccess: result => {
      queryClient.invalidateQueries({queryKey: ['getAnswer']});

      if (userId !== findQuestion?.user_id) {
        addAlertMessage({
          type: 'answer',
          targetId: findQuestion?.id ?? 0,
          userId: findQuestion?.user_id ?? '',
          message: `작성하신 질문 ${findQuestion?.title}에 답변이 등록되었습니다.`,
        });
      }
    },
  });
  const {successTopCenter, warnTopCenter, errorTopCenter} = useToast();

  const clickOpenModal = () => {
    if (comment !== '') {
      Swal.fire({
        title: '창을 닫으시겠습니까?',
        text: '⚠️ 내용은 저장되지 않습니다',
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
          setIsOpenModal(!isOpenModal);
        }
      });
    } else {
      setIsOpenModal(!isOpenModal);
    }
  };

  const writeComment = async () => {
    if (comment === '') {
      warnTopCenter({message: '답변을 입력해주세요!', timeout: 2000});
      return false;
    }
    try {
      addAnswerMutation.mutate();
      successTopCenter({message: '답변 등록이 완료되었습니다😀', timeout: 2000});
      setIsOpenModal(!isOpenModal);
    } catch (error) {
      console.log(error);
      errorTopCenter({message: '답변 등록에 실패하였습니다', timeout: 2000});
    }
  };

  return (
    <div className={styles['modal-container']}>
      <div className={styles['modal-close-container']}>
        <span className={styles['modal-close']} onClick={clickOpenModal}>
          <AiOutlineCloseCircle size={30} color={'#83E0A5'} />
        </span>
      </div>
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
    </div>
  );
};

export default ModalContent;
