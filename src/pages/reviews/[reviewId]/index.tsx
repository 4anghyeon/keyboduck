import React from 'react';
import styles from './index.module.css';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {MdOutlineArrowBackIos, MdOutlineArrowForwardIos} from 'react-icons/md';
import defaultImg from '../../../assets/defaultImg.png';
import ReviewDetailComment from '@/components/review/ReviewDetailComment';
import {useQuery} from '@tanstack/react-query';
import Loading from '@/components/layout/loading/Loading';
import {fetchReview} from '@/pages/api/review';

const ReviewDetail = () => {
  const router = useRouter();
  const reviewId: number | null = Number(router.query.reviewId);

  const {
    isLoading,
    isError,
    data: fetchReviewData,
  } = useQuery({
    queryKey: ['fetchReviewList'],
    queryFn: fetchReview,
    refetchOnWindowFocus: false,
    staleTime: 3000,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h2>🙇🏻‍♀️ 리스트를 불러오지 못했습니다 🙇🏻‍♀️</h2>;
  }

  const detailReviewId = fetchReviewData?.data?.find(review => {
    return review.id === reviewId;
  });

  return (
    <div>
      <div className={styles.container}>
        <div>
          <div className={styles['title-wrap']}>
            <h1 className={styles.title}>{detailReviewId?.title}</h1>
            <div className={styles['user-profile']}>
              <Image src={defaultImg} alt="profile-image" width={60} height={60} />
              <p>{detailReviewId?.profiles.username}</p>
            </div>
            <div className={styles.wrap}>
              <span>{detailReviewId?.write_date!.replace('T', ' ').substring(0, 19)}</span>
              <div>
                <button>수정 |</button>
                <button>삭제</button>
              </div>
            </div>
          </div>
          <div className={styles['image-slide']}>
            <button>
              <MdOutlineArrowBackIos />
            </button>
            <div className={styles['image-container']}>
              {detailReviewId?.photo ? <img src={detailReviewId.photo[0]} alt="review-image" /> : null}
            </div>
            <button>
              <MdOutlineArrowForwardIos />
            </button>
          </div>
          <div className={styles.contents}>
            <p>{detailReviewId?.content}</p>
          </div>
        </div>

        <ReviewDetailComment />
      </div>
    </div>
  );
};

export default ReviewDetail;
