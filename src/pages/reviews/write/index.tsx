'use client';
import React from 'react';
import styles from './index.module.css';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
const ReviewWrite = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  const contentChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(event.target.value);
  };

  const onSubmitButtonHandler = (event: React.FormEvent<HTMLFormElement>) => {
    if (!title) {
      toast('제목을 입력해주세요');
      return;
    }
    if (!content) {
      toast('내용을 입력해주세요');
      return;
    }

    const newReview = {
      title,
      content,
      writeDate: new Date(),
      photo: imageFile,
    };

    // add해주는 코드

    Swal.fire({
      title: '등록되었습니다',
      icon: 'success',
    });
  };

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>REVIEW</h1>
        <div className={styles['search-wrap']}>
          <button>키보드 종류 검색</button>
        </div>
        <div className={styles['write-container']}>
          <div className={styles.title}>
            <input
              type="text"
              value={title}
              onChange={titleChangeHandler}
              placeholder="제목을 입력해주세요(최대 15자)"
            />
          </div>
          <div className={styles.image}>
            <p>이미지는 필수입니다(최대5장)</p>
            <div className={styles['image-drag']}>
              <input id="inputImg" type="file" accept="image/*" />
              <label htmlFor="inputImg">드래그하거나 클릭하여 이미지를 업로드해주세요</label>
            </div>
            <div className={styles['image-preview']}>
              <Image src="" alt="preview" />
            </div>
            <div className={styles.contents}>
              <textarea value={content} onChange={contentChangeHandler} placeholder="내용을 입력해주세요(최대 300자)" />
            </div>
          </div>
        </div>
        <div className={styles['submit-btn']}>
          <Link href="/reviews/reviewId">상세페이지</Link>
          <button>등록하기</button>
          <ToastContainer
            position="top-right" // 알람 위치 지정
            autoClose={3000} // 자동 off 시간
            hideProgressBar={false} // 진행시간바 숨김
            closeOnClick // 클릭으로 알람 닫기
            rtl={false} // 알림 좌우 반전
            pauseOnFocusLoss // 화면을 벗어나면 알람 정지
            draggable // 드래그 가능
            pauseOnHover // 마우스를 올리면 알람 정지
            theme="light"
            // limit={1} // 알람 개수 제한
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewWrite;
