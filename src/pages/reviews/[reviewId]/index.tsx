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
import {useKeyboard} from '@/hooks/useKeyboard';
import {useState} from 'react';

const ReviewDetail: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const {data: keyboardData} = useKeyboard();
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

  const detailReviewId = fetchReviewData?.data?.find(review => {
    return review.id === reviewId;
  });

  const selectKeyboardName = keyboardData?.keyboardList?.find(keyboard => {
    return keyboard.id === detailReviewId?.keyboard_id;
  });
  const showMultiImages = detailReviewId?.photo && detailReviewId.photo.length > 1;

  const prevImageButtonHandler = () => {
    if (detailReviewId?.photo && detailReviewId.photo.length > 0) {
      setCurrentImage(prevIndex => (prevIndex > 0 ? prevIndex - 1 : detailReviewId.photo.length - 1));
    }
  };

  const nextImageButtonHandler = () => {
    if (detailReviewId?.photo && detailReviewId.photo.length > 0) {
      setCurrentImage(prevIndex => (prevIndex + 1) % detailReviewId.photo.length);
    }
  };

  const totalImages = detailReviewId?.photo?.length || 0;

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h2>🙇🏻‍♀️ 리스트를 불러오지 못했습니다 🙇🏻‍♀️</h2>;
  }

  return (
    <div>
      <div className={styles.container}>
        <div>
          <div className={styles['title-wrap']}>
            <h1 className={styles.title}>{detailReviewId?.title}</h1>
            <div className={styles['keyboard-wrap']}>
              <p>{selectKeyboardName?.name}</p>
              <div className={styles['user-profile']}>
                <Image src={defaultImg} alt="profile-image" width={60} height={60} />
                <p>{detailReviewId?.profiles.username}</p>
              </div>
            </div>
            <div className={styles.wrap}>
              <span>{detailReviewId?.write_date!.replace('T', ' ').substring(0, 16)}</span>
              <div>
                <button>수정 |</button>
                <button>삭제</button>
              </div>
            </div>
          </div>
          {showMultiImages ? (
            <div className={styles['image-slide']}>
              <button onClick={prevImageButtonHandler}>
                <MdOutlineArrowBackIos />
              </button>
              <div className={styles['image-container']}>
                <img src={detailReviewId?.photo?.[currentImage]} alt="Review Image" />
              </div>
              <button onClick={nextImageButtonHandler}>
                <MdOutlineArrowForwardIos />
              </button>
            </div>
          ) : (
            detailReviewId?.photo?.length === 1 && (
              <div className={styles['image-container']}>
                <img src={detailReviewId.photo[0]} alt="Review Image" />
              </div>
            )
          )}
          <div className={styles.progressBar}>
            {Array.from({length: totalImages}, (_, index) => (
              <span key={index} className={`${styles.circle} ${index === currentImage ? styles.active : ''}`} />
            ))}
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
