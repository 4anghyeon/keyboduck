import {queryClient} from '@/pages/_app';
import {
  addReviewComment,
  deleteReviewComment,
  fetchReviewComment,
  updateReviewComment,
} from '@/pages/api/review-comment';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useAlertMessage} from './useAlertMessage';

interface UserInfo {
  id: string;
}

const useReviewComment = (
  reviewId: number,
  authorId: string,
  userInfo: UserInfo,
  title: string,
  userId: string,
  comment: string,
) => {
  const {addAlertMessage} = useAlertMessage();

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
  return {
    reviewCommentData,
    addCommentMutate,
    deleteCommentMutate,
    updateCommentMutate,
  };
};

export default useReviewComment;
