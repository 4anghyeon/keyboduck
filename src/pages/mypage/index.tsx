import React, {useEffect, useRef, useState} from 'react';
import mypage from './index.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import Link from 'next/link';
import {useQuery} from '@tanstack/react-query';
import {fetchReview} from '../api/review';
import {useToast} from '@/hooks/useToast';
import {supabase} from '@/shared/supabase/supabase';
import {Tables} from '@/shared/supabase/types/supabase';
import {setUserInfo} from '@/redux/modules/userSlice';
import {useKeyboardLike} from '@/hooks/useKeyboardLike';

const MyPage = () => {
  const auth = useSelector((state: RootState) => {
    return state.userSlice;
  });
  const dispatch = useDispatch();
  const {successTopRight, errorTopRight} = useToast();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [defaultuserName, setDefaultUserName] = useState<string>(auth.username);
  const [userName, setUserName] = useState<string>('');
  const [profileImg, setProfileImg] = useState<string | ArrayBuffer | null>(auth.avatar);
  const fileInput = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<boolean>(true);
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

  const {likelist} = useKeyboardLike();

  const filteredReviewData = fetchReviewData?.data?.filter(item => {
    return item.user_id === auth.id;
  });

  useEffect(() => {
    setDefaultUserName(auth.username);
    setProfileImg(auth.avatar);
  }, [auth, isValid]);

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

  const updateUserName = async () => {
    const {data, error} = await supabase
      .from('profiles')
      .select('username')
      .eq('username', userName)
      .returns<Tables<'profiles'>[]>();
    if (data?.length === 0 && userName.length >= 2) {
      setIsValid(!isValid);
      successTopRight({message: '프로필이 업데이트 되었습니다!', timeout: 2000});
      const {data, error} = await supabase
        .from('profiles')
        .update({avatar_url: profileImg?.toString(), username: userName})
        .eq('id', auth.id)
        .select();
      dispatch(setUserInfo([{id: auth.id, avatar_url: profileImg?.toString(), username: userName}]));
    }

    if (data!.length >= 1 || userName.length < 2) {
      errorTopRight({message: '사용중인 닉네임 혹은 닉네임을 2글자 이상 써주세요!', timeout: 2000});
      setUserName('');
    }
    if (error) alert('오류입니다');
  };

  const updateImg = async () => {
    setIsValid(!isValid);
    successTopRight({message: '프로필이 업데이트 되었습니다!', timeout: 2000});
    const {data, error} = await supabase
      .from('profiles')
      .update({avatar_url: profileImg?.toString()})
      .eq('id', auth.id)
      .select();
    dispatch(setUserInfo([{id: auth.id, avatar_url: profileImg?.toString(), username: defaultuserName}]));
    if (error) alert('오류입니다');
  };

  return (
    <div className={mypage.wrapper}>
      <div className={mypage.input}>
        <div className={isValid === false ? mypage.unvalidimgbox : mypage.imgbox}>
          <img
            style={{border: 'none'}}
            className={isValid === false ? mypage.unvalidimgbox : mypage.imgbox}
            src={profileImg?.toString()}
            onClick={() => {
              if (isValid) fileInput.current!.click();
            }}
          />
        </div>
        {isValid ? (
          <button className={mypage.compeletebutton} onClick={updateImg}>
            사진 수정완료
          </button>
        ) : null}
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
            <button className={mypage.compeletebutton} onClick={updateUserName}>
              이름 수정완료
            </button>
            <button
              className={mypage.compeletebutton}
              onClick={() => {
                setIsValid(false);
              }}
            >
              취소
            </button>
          </div>
        )}
      </div>
      <div className={mypage['reviewbox']}>
        <p
          className={category ? mypage['onactive'] : mypage['reviewboxptag']}
          onClick={() => {
            setCategory(true);
          }}
        >
          내가 쓴 리뷰
        </p>
        <p
          className={!category ? mypage['onactive'] : mypage['reviewboxptag']}
          onClick={() => {
            setCategory(false);
          }}
        >
          좋아요 목록
        </p>
      </div>
      {category ? (
        <div className={filteredReviewData?.length === 0 ? mypage['noreview-h1'] : mypage['grid-container']}>
          {filteredReviewData?.length === 0 ? (
            <h1 className={mypage['review-h1']}>등록된 리뷰가 없습니다. 리뷰를 남겨주세요💁🏻‍♀️</h1>
          ) : (
            filteredReviewData?.map(review => {
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
        </div>
      ) : (
        <div className={likelist?.length === 0 ? mypage['noreview-h1'] : mypage['grid-container']}>
          {likelist?.length === 0 ? (
            <h1 className={mypage['review-h1']}>좋아요한 게시물이 없습니다. 좋아요를 남겨보세요💁🏻‍♀️</h1>
          ) : (
            likelist?.map(item => {
              return (
                <div className={mypage['content-container']} key={item.id}>
                  <Link href={`/keyboard/${item.target_id}`} className={mypage['content-link']}>
                    <div className={mypage['content-wrap']}>
                      {item.keyboard.photo ? (
                        <img src={item.keyboard.photo} alt="review-image" className={mypage['content-image']} />
                      ) : null}
                      <div>
                        <div className={mypage['user-wrap']}>
                          <div className={mypage['user']}>
                            <img src={auth.avatar} alt="유저프로필" className={mypage['user-profile']} />
                            <p>{item.keyboard.brand}</p>
                          </div>
                          <p>{item.keyboard.release_date?.substring(0, 10)}</p>
                        </div>
                        <span>{item.keyboard.name}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default MyPage;
