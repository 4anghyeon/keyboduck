import React, {useEffect, useRef, useState} from 'react';
import mypage from './index.module.css';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import Link from 'next/link';
import Image from 'next/image';

const MyPage = () => {
  const auth = useSelector((state: RootState) => {
    return state.userSlice;
  });
  console.log(auth);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [defaultuserName, setDefaultUserName] = useState<string>(auth.username);
  const [userName, setUserName] = useState<string>('');
  const [profileImg, setProfileImg] = useState<string | ArrayBuffer | null>(auth.avatar);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDefaultUserName(auth.username);
    setProfileImg(auth.avatar);
    console.log(defaultuserName);
    console.log(profileImg);
  }, [auth]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLFormElement>) => {
    if (e.target.files[0]) {
      setProfileImg(e.target!.files[0]);
    } else {
      setProfileImg(auth.avatar);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className={mypage.wrapper}>
      <div className={mypage.input}>
        <div className={mypage.imgbox}>
          <img
            style={{border: 'none'}}
            className={mypage.imgbox}
            src={profileImg?.toString()}
            onClick={() => {
              if (isValid) fileInput.current!.click();
            }}
          />
        </div>
        <div className={mypage.ptagposition}>
          <p>{`안녕하세요 ${defaultuserName}님!`}</p>
        </div>
        <input
          type="file"
          accept="image/jpg,image/png,image/jpeg"
          style={{display: 'none'}}
          ref={fileInput}
          onChange={onChange}
          className={mypage.inputsize}
        />
      </div>
      <div>
        {!isValid ? (
          <button
            className={mypage.button}
            onClick={() => {
              setIsValid(!isValid);
            }}
          >
            프로필 수정하기
          </button>
        ) : (
          <div>
            <input
              className={mypage.nicknameinput}
              value={userName}
              onChange={e => {
                setUserName(e.target.value);
              }}
            />
            <button
              className={mypage.compeletebutton}
              onClick={() => {
                setIsValid(!isValid);
              }}
            >
              수정완료
            </button>
          </div>
        )}
      </div>
      <div>
        {/* <div className={mypage['grid-container']}>
          {fetchReviewData?.data?.length === 0 ? (
            <h1>등록된 리뷰가 없습니다. 리뷰를 남겨주세요💁🏻‍♀️</h1>
          ) : (
            fetchReviewData?.data?.map(review => {
              return (
                <div className={mypage['content-container']} key={review.id}>
                  <Link href={`/reviews/${review.id}`} className={mypage['content-link']}>
                    <div className={mypage['content-wrap']}>
                      {review.photo ? (
                        <img src={review.photo[0]} alt="review-image" className={mypage['content-image']} />
                      ) : null}
                      <div>
                        <div className={mypage['user-wrap']}>
                          <div className={mypage['user']}>
                            <img src={auth.avatar} alt="유저프로필" className={mypage['user-profile']} />
                            <p>{review.profiles.username}</p>
                          </div>
                          <p>{review.write_date?.substring(0, 10)}</p>
                        </div>
                        <span>{review.title}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div> */}
      </div>
    </div>
  );
};

export default MyPage;
