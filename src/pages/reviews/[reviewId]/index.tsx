import React from 'react';
import styles from './index.module.css';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {MdOutlineArrowBackIos, MdOutlineArrowForwardIos} from 'react-icons/md';
import defaultImg from '../../../assets/defaultImg.png';
import ReviewDetailComment from '@/components/review/ReviewDetailComment';
import {useMutation, useQuery} from '@tanstack/react-query';
import Loading from '@/components/layout/loading/Loading';
import {deleteReview, fetchReview} from '@/pages/api/review';
import {useKeyboard} from '@/hooks/useKeyboard';
import {useState} from 'react';
import Swal from 'sweetalert2';
import {queryClient} from '@/pages/_app';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {useEffect} from 'react';

const ReviewDetail: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [userId, setUserId] = useState<string>('');
  const {data: keyboardData} = useKeyboard();
  const router = useRouter();
  const reviewId: number | null = Number(router.query.reviewId);

  const userInfo = useSelector((state: RootState) => state.userSlice);

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

  const deleteMutate = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['fetchReviewList']});
    },
  });

  useEffect(() => {
    if (userInfo.id !== '') setUserId(userInfo.id);
  }, [userInfo]);

  // 리뷰 작성 시 선택한 키보드 이름 가져오기
  const selectKeyboardName = keyboardData?.keyboardList?.find(keyboard => {
    return keyboard.id === detailReviewId?.keyboard_id;
  });

  // 등록된 이미지가 1장 이상일 경우
  const showMultiImages = detailReviewId?.photo && detailReviewId.photo.length > 1;

  const prevImageButtonHandler = () => {
    if (detailReviewId?.photo && detailReviewId.photo.length > 0) {
      setCurrentImage(prevIndex => (prevIndex > 0 ? prevIndex - 1 : detailReviewId.photo!.length - 1));
    }
  };

  const nextImageButtonHandler = () => {
    if (detailReviewId?.photo && detailReviewId.photo.length > 0) {
      setCurrentImage(prevIndex => (prevIndex + 1) % detailReviewId.photo!.length);
    }
  };

  const totalImages = detailReviewId?.photo?.length || 0;

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
        deleteMutate.mutate(id);
        router.push('/reviews');
      } else {
        return;
      }
    });
  };

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
              {userId === detailReviewId?.user_id && (
                <div>
                  <button>수정 |</button>
                  <button onClick={() => deleteButtonHandler(detailReviewId?.id!)}>삭제</button>
                </div>
              )}
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
