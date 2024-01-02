import React from 'react';
import styles from './reviewDetailComment.module.css';
import {useState} from 'react';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {
  addReviewComment,
  deleteReviewComment,
  fetchReviewComment,
  updateReviewComment,
} from '@/pages/api/review-comment';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useToast} from '@/hooks/useToast';
import {queryClient} from '@/pages/_app';
import {useRouter} from 'next/router';
import Swal from 'sweetalert2';
import {useAlertMessage} from '@/hooks/useAlertMessage';
import moment from 'moment';
import 'moment/locale/ko';

const ReviewDetailComment = ({
  title,
  authorId,
  commentCountUpdate,
}: {
  title: string;
  authorId: string;
  commentCountUpdate: (count: number) => void;
}) => {
  const [comment, setComment] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [currentComment, setCurrentComment] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editingComment, setEditingComment] = useState<string>('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const router = useRouter();
  const reviewId: number | null = Number(router.query.reviewId);

  const {addAlertMessage} = useAlertMessage();
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

      if (authorId !== userInfo.id) {
        addAlertMessage({
          type: 'comment',
          message: `작성하신 리뷰 ${title} 에 댓글이 달렸습니다.`,
          userId: authorId,
          targetId: reviewId,
        });
      }
    },
  });

  const deleteCommentMutate = useMutation({
    mutationFn: deleteReviewComment,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['fetchReviewCommentList']});
    },
  });

  const updateCommentMutate = useMutation({
    mutationFn: updateReviewComment,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['fetchReviewCommentList']});
    },
  });

  // 각 게시물 마다의 댓글 보여주기
  const reviewCommentFilter = reviewCommentData?.data?.filter(review => {
    return review.review_id === reviewId;
  });

  useEffect(() => {
    if (userInfo.id !== '') setUserId(userInfo.id);
  }, [userInfo]);

  useEffect(() => {
    commentCountUpdate(reviewCommentFilter?.length ?? 0);
  }, [reviewCommentFilter, commentCountUpdate]);

  const commentChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => setComment(event.target.value);

  // 댓글 등록하기
  const commentSubmitHandler = async () => {
    if (!comment) {
      warnTopCenter({message: '댓글을 입력해주세요', timeout: 2000});
      return;
    }
    if (userId === '') {
      warnTopCenter({message: '로그인 후 댓글 작성이 가능합니다', timeout: 2000});
      return;
    }
    try {
      await addCommentMutate.mutate();
      setComment('');
      successTopCenter({message: '댓글을 등록하였습니다', timeout: 2000});
    } catch (error) {
      console.log('reviewCommentError', error);
      errorTopCenter({message: '댓글 등록이 실패하였습니다', timeout: 2000});
    }
  };

  // 수정하려다가 취소버튼 클릭
  const isEditButtonHandler = (commentId: number) => {
    if (editingCommentId === commentId) {
      Swal.fire({
        title: '취소하시겠습니까?',
        text: '⚠️ 수정된 내용은 저장되지 않습니다',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#83e0a5',
        cancelButtonColor: '#b0b0b0',
        confirmButtonText: '네',
        cancelButtonText: '아니요',
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire({
            title: '취소되었습니다',
            icon: 'success',
          });
          setEditingCommentId(null);
        }
      });
    } else {
      setIsEdit(!isEdit);
    }
  };

  // 수정완료버튼 클릭
  const completeButtonHandler = async (id: number) => {
    if (editingComment === currentComment) {
      warnTopCenter({message: '변경된 내용이 없습니다', timeout: 2000});
      return;
    }
    try {
      await updateCommentMutate.mutate({id, editingComment});
      setEditingComment(editingComment);
      setEditingCommentId(null);
      successTopCenter({message: '수정이 완료되었습니다', timeout: 2000});
    } catch (error) {
      console.log('updateCommentError', error);
      errorTopCenter({message: '댓글 수정이 실패하였습니다', timeout: 2000});
    }
  };

  // 수정버튼 클릭
  const startEditing = (id: number, currentContent: string) => {
    setEditingCommentId(id);
    setIsEdit(true);
    setEditingComment(currentContent);
    setCurrentComment(currentContent);
  };

  // 삭제버튼 클릭
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

  return (
    <div>
      <div className={styles['comment-wrap']}>
        <div className={styles.comment}>
          <input
            type="text"
            placeholder="댓글을 입력해주세요(최대 50자)"
            value={comment}
            onChange={commentChangeHandler}
          />
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
                {editingCommentId === comment.id ? (
                  <input onChange={e => setEditingComment(e.target.value)} value={editingComment} maxLength={50} />
                ) : (
                  <p>{comment.content}</p>
                )}
                <span className={styles['user-name']}>{comment.profiles.username}</span>
              </div>
              <div className={styles['comment-user']}>
                <span className={styles['comment-date']}>
                  {' '}
                  {moment(comment.write_date).locale('ko').format('yyyy년 MM월 DD일 A hh:mm')}
                </span>
                {userId === comment.user_id && (
                  <div className={styles['comment-button']}>
                    {editingCommentId === comment.id ? (
                      <div>
                        <button onClick={() => isEditButtonHandler(comment.id)}>취소 |</button>
                        <button onClick={() => completeButtonHandler(comment.id)}>완료</button>
                      </div>
                    ) : (
                      <div>
                        <button onClick={() => startEditing(comment.id, comment.content!)}>수정 |</button>
                        <button onClick={() => deleteButtonHandler(comment.id)}>삭제</button>
                      </div>
                    )}
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
