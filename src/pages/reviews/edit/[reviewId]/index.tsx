import React from 'react';
import styles from './index.module.css';
import {useState, useRef, useEffect} from 'react';
import Swal from 'sweetalert2';
import {useToast} from '@/hooks/useToast';
import {MdDeleteForever} from 'react-icons/md';
import SearchKeyboard from '@/components/review/SearchKeyboard';
import {supabase} from '@/shared/supabase/supabase';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {useMutation, useQuery} from '@tanstack/react-query';
import {fetchReview, updateReview} from '@/pages/api/review';
import {queryClient} from '@/pages/_app';
import useImageUpload from '@/hooks/useImageUpload';

const ReviewWrite = () => {
  const {data: fetchReviewData} = useQuery({
    queryKey: ['fetchReviewList'],
    queryFn: fetchReview,
    refetchOnWindowFocus: false,
    staleTime: 3000,
  });

  const router = useRouter();
  const reviewId: number | null = Number(router.query.reviewId);
  const findEditReview = fetchReviewData?.data?.find(review => review.id === reviewId);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [editSelectedKeyboardId, setEditSelectedKeyboardId] = useState(0);

  const userInfo = useSelector((state: RootState) => state.userSlice);

  const fileInput = useRef<HTMLInputElement>(null);
  const {successTopCenter, warnTopCenter, errorTopCenter} = useToast();
  const {imageFile, setImageFile, handleDragOver, handleDrop, imageUploadHandler, imageDeleteHandler, fetchImageFile} =
    useImageUpload();

  const updateReviewtMutate = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['fetchReviewList']});
    },
  });

  useEffect(() => {
    if (userInfo.id !== '') setUserId(userInfo.id);
  }, [userInfo]);

  useEffect(() => {
    if (findEditReview) {
      setTitle(findEditReview.title!);
      setContent(findEditReview.content!);
      setEditSelectedKeyboardId(findEditReview.keyboard_id!);
      if (findEditReview.photo && findEditReview.photo.length > 0) {
        setImageFile(findEditReview.photo);
      }
    }
  }, [findEditReview]);

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => setTitle(event.target.value);
  const contentChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => setContent(event.target.value);

  const selectKeyboardHandler = (keyboardId: number) => {
    setEditSelectedKeyboardId(keyboardId);
  };

  // 리뷰 수정하기
  const onSubmitButtonHandler = async () => {
    if (editSelectedKeyboardId === null) {
      warnTopCenter({message: '키보드를 선택해주세요', timeout: 2000});
      return;
    }
    if (!title) {
      warnTopCenter({message: '제목을 입력해주세요', timeout: 2000});
      return;
    }
    if (imageFile.length === 0) {
      warnTopCenter({message: '이미지를 업로드해주세요', timeout: 2000});
      return;
    }
    if (!content) {
      warnTopCenter({message: '내용을 입력해주세요', timeout: 2000});
      return;
    }

    try {
      // 1. 이미지 스토리지에 업로드
      let uploadPaths = [];
      for (const imageUrl of imageFile) {
        const file = await fetchImageFile(imageUrl);

        const {data: uploadData, error: uploadError} = await supabase.storage
          .from('review_images')
          .upload(`images/${Date.now()}_${Math.floor(Math.random() * 1000)}.png`, file, {
            contentType: 'image/png',
          });

        if (uploadError) {
          console.error(uploadError);
          errorTopCenter({message: '이미지 업로드 중 오류가 발생했습니다🙅🏻‍♀️', timeout: 2000});
          return;
        }

        if (uploadData) {
          uploadPaths.push(uploadData.path);
        }
      }

      // 2. 리뷰내용 테이블에 등록
      const bucketName = 'review_images';
      const supabaseUrl = 'https://eaxjoqjnwoyrpkpvzosu.supabase.co';
      const publicUrls = uploadPaths.map(path => `${supabaseUrl}/storage/v1/object/public/${bucketName}/${path}`);

      await updateReviewtMutate.mutate({
        id: reviewId,
        keyboard_id: editSelectedKeyboardId,
        title,
        content,
        photo: publicUrls,
      });
      router.push(`/reviews/${findEditReview?.id}`);
      successTopCenter({message: '수정이 완료되었습니다', timeout: 2000});
    } catch (error) {
      console.log(error);
      errorTopCenter({message: '수정에 실패하였습니다🙅🏻‍♀️', timeout: 2000});
    }
  };

  // 취소하기
  const clickCancelEdit = () => {
    Swal.fire({
      title: '취소하시겠습니까?',
      text: '⚠️ 변경된 내용은 저장되지 않습니다',
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
        router.push(`/reviews/${findEditReview?.id}`);
      }
    });
  };

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>REVIEW</h1>
        <SearchKeyboard onSelectedKeyboard={selectKeyboardHandler} />
        <div className={styles['write-container']}>
          <div className={styles.title}>
            <input
              type="text"
              value={title}
              onChange={titleChangeHandler}
              placeholder="제목을 입력해주세요(최대 15자)"
              maxLength={15}
            />
          </div>
          <div className={styles.image}>
            <p>이미지는 필수입니다(최대5장)</p>
            <div className={styles['image-drag']}>
              <input
                id="inputImg"
                type="file"
                accept="image/*"
                ref={fileInput}
                onChange={e => imageUploadHandler(e)}
                multiple
              />
              <label htmlFor="inputImg" onDrop={handleDrop} onDragOver={handleDragOver}>
                드래그하거나 클릭하여 이미지를 업로드해주세요
              </label>
            </div>

            <div className={styles['image-preview']}>
              {imageFile?.map((imageFile, index) => (
                <div key={index}>
                  <button onClick={() => imageDeleteHandler(index)} className={styles['delete-button']}>
                    <MdDeleteForever />
                  </button>
                  <img src={imageFile} alt="preview" className={styles['images']} width={300} height={300} />
                </div>
              ))}
            </div>
            <div className={styles.contents}>
              <textarea
                value={content}
                onChange={contentChangeHandler}
                placeholder="내용을 입력해주세요(최대 300자)"
                maxLength={300}
              />
            </div>
          </div>
        </div>
        <div className={styles['submit-btn']}>
          <button onClick={clickCancelEdit}>취소하기</button>
          <button onClick={onSubmitButtonHandler}>수정하기</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewWrite;
