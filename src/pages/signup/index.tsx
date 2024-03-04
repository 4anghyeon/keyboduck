import React, {useEffect, useRef, useState} from 'react';
import signup from './index.module.css';
import {signUpNewUser} from '../api/auth';
import {supabase} from '@/shared/supabase/supabase';
import {useRouter} from 'next/navigation';
import {useConfirmId} from '@/hooks/useAuth';

const Signup = () => {
  const [idValue, setIdValue] = useState<string>('');
  const [pwValue, setPwValue] = useState<string>('');
  const [pwConfirmValue, setPwConfirmValue] = useState<string>('');
  const [nickNameValue, setNicknameValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [idVaild, setIdValid] = useState<boolean>(false);
  const [nicknameValid, setNicknameValid] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState<string | ArrayBuffer | null>(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );
  const [imageFile, setImageFile] = useState<File>();
  const fileInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const {determineId, determineUserName} = useConfirmId({
    idValue,
    setIdValid,
    setIdValue,
    nickNameValue,
    setNicknameValid,
    setNicknameValue,
  });

  const handleSignUp = async () => {
    // storage 업로드
    let uploadUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    if (imageFile) {
      let {data: uploadData, error: uploadError} = await supabase.storage
        .from('avatars')
        .upload(`profiles/${Date.now()}_${Math.floor(Math.random() * 1000)}.png`, imageFile, {
          contentType: 'image/png',
        });
      const bucketName = 'avatars';
      const supabaseUrl = 'https://eaxjoqjnwoyrpkpvzosu.supabase.co';
      uploadUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${uploadData?.path}`;
    }

    await signUpNewUser(idValue, pwValue, uploadUrl, nickNameValue);
    router.push('/');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLFormElement>) => {
    if (e.target.files[0]) {
      setImageFile(e.target!.files[0]);
    } else {
      setProfileImg('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
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

  const clickLoginHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    // id 비밀번호 닉네임... 다 만족할때 isValid를 true로 만드는 조건 작성
    if (!idValue.includes('@')) {
      setIsValid(false);
      return;
    }
    if (pwValue.length < 6) {
      setIsValid(false);
      return;
    }
    if (pwValue !== pwConfirmValue) {
      setIsValid(false);
      return;
    }
    if (nickNameValue.length < 2) {
      setIsValid(false);
      return;
    }
    if (!(idVaild && nicknameValid)) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
  }, [idValue, pwValue, pwConfirmValue, nickNameValue, idVaild, nicknameValid]);

  return (
    <div className={signup.wrapper}>
      <form className={signup.formbox} onSubmit={clickLoginHandler}>
        <div className={signup.input}>
          <p className={signup.ptagposition}>이메일</p>
          <input
            className={signup.inputsize}
            placeholder="이메일 형식으로 입력해주세요"
            value={idValue}
            onChange={e => {
              setIdValue(e.target.value);
              setIdValid(false);
            }}
          />
          <button className={signup.button} onClick={() => determineId()}>
            중복확인
          </button>
        </div>
        <div className={signup.input}>
          <p className={signup.ptagposition}>비밀번호</p>
          <input
            type="password"
            className={signup.inputsize}
            placeholder="최소 6자 이상 입력해주세요"
            value={pwValue}
            onChange={e => {
              setPwValue(e.target.value);
            }}
          />
        </div>
        <div className={signup.input}>
          <p className={signup.ptagposition}>비밀번호 확인</p>
          <input
            type="password"
            className={signup.inputsize}
            placeholder="비밀번호와 동일하게 입력해주세요"
            value={pwConfirmValue}
            onChange={e => {
              setPwConfirmValue(e.target.value);
            }}
          />
        </div>
        <div className={signup.input}>
          <p className={signup.ptagposition}>닉네임</p>
          <input
            className={signup.inputsize}
            placeholder="최소 2자 이상입력해주세요"
            value={nickNameValue}
            onChange={e => {
              setNicknameValue(e.target.value);
              setNicknameValid(false);
            }}
          />
          <button className={signup.button} onClick={() => determineUserName()}>
            중복확인
          </button>
        </div>
        <div className={signup.input}>
          <p className={signup.ptagposition}>프로필이미지</p>
          <div className={signup.imgbox}>
            <img
              style={{border: 'none'}}
              className={signup.imgbox}
              src={profileImg?.toString()}
              onClick={() => {
                fileInput.current!.click();
              }}
            />
          </div>
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            style={{display: 'none'}}
            ref={fileInput}
            onChange={onChange}
            className={signup.inputsize}
          />
        </div>
        <button
          className={signup.lastbutton}
          disabled={isValid ? false : true}
          style={{backgroundColor: isValid ? '#83E0A5' : '#a3a3a3'}}
          onClick={handleSignUp}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Signup;
