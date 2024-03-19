import React from 'react';
import styles from './index.module.css';
import Swal from 'sweetalert2';
import {useState, useRef, useEffect} from 'react';
import {useToast} from '@/hooks/useToast';
import {MdDeleteForever} from 'react-icons/md';
import SearchKeyboard from '@/components/review/SearchKeyboard';
import {supabase} from '@/shared/supabase/supabase';
import router from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import useImageUpload from '@/hooks/useImageUpload';

const ReviewWrite = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [selectedKeyboardId, setSelectedKeyboardId] = useState<number | null>(null);
  const userInfo = useSelector((state: RootState) => state.userSlice);

  const fileInput = useRef<HTMLInputElement>(null);
  const {warnTopCenter, errorTopCenter} = useToast();
  const {imageFile, handleDragOver, handleDrop, imageUploadHandler, imageDeleteHandler, fetchImageFile} =
    useImageUpload();
  useEffect(() => {
    if (userInfo.id !== '') setUserId(userInfo.id);
  }, [userInfo]);

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => setTitle(event.target.value);
  const contentChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => setContent(event.target.value);

  const selectKeyboardHandler = (keyboardId: number) => {
    setSelectedKeyboardId(keyboardId);
  };

  // 리뷰 등록하기
  const onSubmitButtonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedKeyboardId === null) {
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

      const {data: addReviewData} = await supabase
        .from('review')
        .insert({title, keyboard_id: selectedKeyboardId, content, user_id: userId, photo: publicUrls})
        .select();

      if (addReviewData) {
        router.push('/reviews');
      }

      Swal.fire({
        title: '등록되었습니다',
        icon: 'success',
      });
    } catch (error) {
      console.log(error);
      errorTopCenter({message: '등록에 실패하였습니다🙅🏻‍♀️', timeout: 2000});
    }
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
          <button onClick={onSubmitButtonHandler}>등록하기</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewWrite;
