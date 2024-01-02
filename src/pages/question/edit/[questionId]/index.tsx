import React, {useState} from 'react';
import styles from '@/pages/question/edit/[questionId]/index.module.css';
import {useToast} from '@/hooks/useToast';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {editQuestion, getQuestion} from '@/pages/api/question';
import {useRouter} from 'next/router';
import {OPTION} from '../../write';
import Swal from 'sweetalert2';
import Loading from '@/components/layout/loading/Loading';

const EditQuestion = () => {
  const {
    isLoading,
    isError,
    data: questionList,
  } = useQuery({
    queryKey: ['getQuestion'],
    queryFn: getQuestion,
    refetchOnWindowFocus: false,
  });
  const router = useRouter();
  const questionId: number | null = Number(router.query.questionId);
  const findEditQuestion = questionList?.getQuestionData?.find(question => question.id === questionId);

  const queryClient = useQueryClient();
  const editQuestionMutation = useMutation({
    mutationFn: editQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getQuestion']});
      successTopCenter({message: '수정되었습니다!', timeout: 2000});
      router.push(`/question/${findEditQuestion?.id}`);
    },
    onError: () => {
      errorTopCenter({message: '오류가 발생하였습니다😭 수정 전 페이지로 이동합니다'});
      router.push(`/question/${findEditQuestion?.id}`);
    },
  });

  const {successTopCenter, errorTopCenter} = useToast();
  const [title, setTitle] = useState<string>(findEditQuestion?.title || '');
  const [content, setContent] = useState<string>(findEditQuestion?.content || '');
  const [category, setCategory] = useState<string>(findEditQuestion?.category || '카테고리 선택');

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangeContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value);

  const clickCompletionQuestion = (id: number) => {
    editQuestionMutation.mutate({id, title, content, category});
  };

  const clickCancelEdit = () => {
    if (
      title !== findEditQuestion?.title ||
      content !== findEditQuestion?.content ||
      category !== findEditQuestion?.category
    ) {
      Swal.fire({
        title: '취소하시겠습니까?',
        text: '⚠️ 변경된 내용은 저장되지 않습니다',
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
          router.push(`/question/${findEditQuestion?.id}`);
        }
      });
    }
    router.push(`/question/${findEditQuestion?.id}`);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>🙇알 수 없는 오류가 발생하였습니다🙇</div>;
  }

  return (
    <div className={styles['qna-edit-container']}>
      <div className={styles['qna-edit-title']}>
        <h2>QnA</h2>
      </div>
      <div className={styles['qna-edit-select']}>
        <select value={category} onChange={onChangeCategory}>
          {OPTION.map(item => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles['qna-edit-contents']}>
        <input type="text" value={title} onChange={onChangeTitle} placeholder="제목을 입력해주세요" />
        <textarea rows={18} value={content} onChange={onChangeContents} placeholder="내용을 입력해주세요" />
      </div>
      <div className={styles['qna-edit-registration-btn']}>
        <button onClick={clickCancelEdit}>취소하기</button>
        <button onClick={() => clickCompletionQuestion(findEditQuestion?.id || 0)}>등록하기</button>
      </div>
    </div>
  );
};

export default EditQuestion;
