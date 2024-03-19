import {useToast} from '@/hooks/useToast';
import {useState, useEffect} from 'react';

const useImageUpload = () => {
  const [imageFile, setImageFile] = useState<string[]>([]);
  const {warnTopCenter} = useToast();

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
  };

  // 이미지 삭제
  const imageDeleteHandler = (index: number) => {
    const updatedImageFiles = [...imageFile];
    updatedImageFiles.splice(index, 1);
    setImageFile(updatedImageFiles);
  };

  // blob형태를 url로 변환
  const fetchImageFile = async (blobUrl: string): Promise<File> => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], 'upload.png', {type: 'image/png'});
  };

  useEffect(() => {
    // 컴포넌트 언마운트 시 URL 객체 해제
    return () => {
      imageFile.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imageFile]);

  return {
    imageFile,
    setImageFile,
    handleDragOver,
    handleDrop,
    imageUploadHandler,
    imageDeleteHandler,
    fetchImageFile,
  };
};

export default useImageUpload;
