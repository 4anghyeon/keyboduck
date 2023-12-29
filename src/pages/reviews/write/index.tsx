'use client';
import React from 'react';
import styles from './index.module.css';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import Swal from 'sweetalert2';
import {useRef} from 'react';
import {useToast} from '@/hooks/useToast';
import {MdDeleteForever} from 'react-icons/md';
import SearchKeyboard from '@/components/review/SearchKeyboard';
import {useEffect} from 'react';
import {supabase} from '@/shared/supabase/supabase';
import router from 'next/router';
import {createClient} from '@supabase/supabase-js';

const ReviewWrite = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imageFile, setImageFile] = useState<string[]>([]);
  const [author, setAuthor] = useState<string>('');
  // const [imageUrl, setImageUrl] = useState<string>('');
  const fileInput = useRef<HTMLInputElement>(null);
  const {warnTopCenter, errorTopCenter} = useToast();

  useEffect(() => {
    supabase.auth.getUserIdentities().then(info => {
      const author = info.data?.identities[0].identity_data?.name;
      if (author) setAuthor(author);
    });
  }, []);

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => setTitle(event.target.value);
  const contentChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => setContent(event.target.value);

  // 이미지 파일 미리보기, 최대5장
  const processImageFiles = (files: FileList, existingImageFiles: string[]): string[] => {
    let imageFiles: string[] = [...existingImageFiles];

    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      const reviewImageUrl: string = URL.createObjectURL(file);
      imageFiles.push(reviewImageUrl);
    }

    if (imageFiles.length > 5) {
      warnTopCenter({message: '최대 5장 까지만 업로드 할 수 있습니다', timeout: 2000});
      imageFiles = imageFiles.slice(0, 5);
    }
    return imageFiles;
  };

  // 이미지 드래그 앤 드롭으로 가져오기
  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();

    if (!event.dataTransfer.files) return;

    const droppedFiles: FileList = event.dataTransfer.files;
    const processedImageFiles = processImageFiles(droppedFiles, imageFile);
    setImageFile(processedImageFiles);
  };

  // 이미지 클릭해서 업로드하기
  const imageUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files: FileList = event.target.files;
    const processedImageFiles = processImageFiles(files, imageFile);
    setImageFile(processedImageFiles);
    // setImageFile((prev) => [...prev, event.target.files![0]]);
  };
  // const imgRef = useRef()
  // // 이미지 blob변환
  // const imageFileChange = async () => {
  //   const imageFiles=imgRef.current!.file[0];
  //   const reader = new FileReader()
  //   reader.onloadend=()=>{
  //     if(reader.result instanceof ArrayBuffer) {
  //       const blob = new Blob([reader.result], {type: 'image/png'});
  //       const blobUrl = URL.createObjectURL(blob)
  //       setImageFile(blobUrl)
  //     }
  //   }
  //   reader.readAsArrayBuffer(imageFiles)
  // }

  // 이미지 삭제
  const imageDeleteHandler = (index: number) => {
    const updatedImageFiles = [...imageFile];
    updatedImageFiles.splice(index, 1);
    setImageFile(updatedImageFiles);
  };

  // 이미지 스토리지에 업로드
  const reviewImgUpload = async file => {
    const {data: reviewImageData, error} = await supabase.storage.from('review_images').upload(`${author}/`, file);
    if (reviewImageData) {
      router.push('/reviews');
    } else {
      console.log(error);
      errorTopCenter({message: '등록에 실패하였습니다🙅🏻‍♀️', timeout: 2000});
    }
  };

  // 리뷰 등록하기
  const onSubmitButtonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
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

    const {data: addReviewData, error} = await supabase
      .from('review')
      .insert({title, keyboard_id: 27, content, author, photo: imageFile})
      .select();
    if (addReviewData) {
      router.push('/reviews');
    } else {
      console.log(error);
      errorTopCenter({message: '등록에 실패하였습니다🙅🏻‍♀️', timeout: 2000});
    }

    Swal.fire({
      title: '등록되었습니다',
      icon: 'success',
    });
  };

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>REVIEW</h1>
        <SearchKeyboard />
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
                <div>
                  <button onClick={() => imageDeleteHandler(index)} className={styles['delete-button']}>
                    <MdDeleteForever />
                  </button>
                  <Image
                    key={index}
                    src={imageFile}
                    alt="preview"
                    className={styles['images']}
                    width={300}
                    height={300}
                  />
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
          <Link href="/reviews/reviewId">상세페이지</Link>
          <button onClick={onSubmitButtonHandler}>등록하기</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewWrite;
