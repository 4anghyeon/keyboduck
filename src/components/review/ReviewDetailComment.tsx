import React from 'react';
import styles from './reviewDetailComment.module.css';
import {useState} from 'react';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {addReviewComment, deleteReviewComment, fetchReviewComment} from '@/pages/api/review-comment';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useToast} from '@/hooks/useToast';
import {queryClient} from '@/pages/_app';
import {useRouter} from 'next/router';
import Swal from 'sweetalert2';

const ReviewDetailComment = () => {
  const [comment, setComment] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [isEdit, SetIsEdit] = useState();
  const router = useRouter();
  const reviewId: number | null = Number(router.query.reviewId);

  const userInfo = useSelector((state: RootState) => state.userSlice);
  const {successTopCenter, warnTopCenter, errorTopCenter} = useToast();

  const {data: reviewCommentData} = useQuery({
    queryKey: ['fetchReviewCommentList'],
    queryFn: fetchReviewComment,
    refetchOnWindowFocus: false,
    staleTime: 3000,
  });

  const addCommentMutate = useMutation({
    mutationFn: async () => await addReviewComment(userId, comment, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['fetchReviewCommentList']});
    },
  });

  const deleteCommentMutate = useMutation({
    mutationFn: deleteReviewComment,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['fetchReviewCommentList']});
    },
  });

  const reviewCommentFilter = reviewCommentData?.data?.filter(review => {
    return review.review_id === reviewId;
  });

  const reviewCommentId = reviewCommentData?.data?.find(review => {
    return review.id === reviewId;
  });

  useEffect(() => {
    if (userInfo.id !== '') setUserId(userInfo.id);
  }, [userInfo]);

  const deleteButtonHandler = (id: number) => {
    Swal.fire({
      title: '정말로 삭제하시겠습니까?',
      text: '삭제하면 되돌릴 수 없습니다',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#83e0a5',
      cancelButtonColor: '#b0b0b0',
      confirmButtonText: 'Yes',
    }).then((result): void => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '삭제되었습니다',
          icon: 'success',
        });

        deleteCommentMutate.mutate(id);
      } else {
        return;
      }
    });
  };

  const commentChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => setComment(event.target.value);

  const commentSubmitHandler = () => {
    if (!comment) {
      warnTopCenter({message: '댓글을 입력해주세요', timeout: 2000});
      return;
    }
    if (userId === '') {
      warnTopCenter({message: '로그인 후 댓글 작성이 가능합니다', timeout: 2000});
      return;
    }
    try {
      addCommentMutate.mutate();
      successTopCenter({message: '댓글을 등록하였습니다', timeout: 2000});
    } catch (error) {
      console.log('reviewCommentError', error);
      errorTopCenter({message: '댓글 등록이 실패하였습니다', timeout: 2000});
    }
  };

  return (
    <div>
      <div className={styles['comment-wrap']}>
        <div className={styles.comment}>
          <input type="text" placeholder="댓글을 입력해주세요" value={comment} onChange={commentChangeHandler} />
          <button onClick={commentSubmitHandler}>등록</button>
        </div>
      </div>
      {reviewCommentFilter?.length === 0 ? (
        <p className={styles.blank}>등록된 댓글이 없습니다. 가장먼저 댓글을 남겨주세요👀</p>
      ) : (
        reviewCommentFilter?.map(comment => {
          return (
            <div className={styles['comment-box']} key={comment.id}>
              <div className={styles['comment-user']}>
                <p>{comment.content}</p>
                <span>{comment.profiles.username}</span>
              </div>
              <div className={styles['comment-user']}>
                <span>{comment.write_date?.substring(0, 10)}</span>
                {userId === comment.user_id && (
                  <div>
                    <button>수정 |</button>
                    <button onClick={() => deleteButtonHandler(comment.id)}>삭제</button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ReviewDetailComment;
