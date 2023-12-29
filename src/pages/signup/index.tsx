import React, {useRef, useState} from 'react';
import signup from './index.module.css';
import {signUpNewUser} from '../api/auth';
import {v4 as uuidv4} from 'uuid';

const Signup = () => {
  const [idValue, setIdValue] = useState<string>('');
  const [pwValue, setPwValue] = useState<string>('');
  const [pwConfirmValue, setPwConfirmValue] = useState<string>('');
  const [nickNameValue, setNicknameValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState<string | ArrayBuffer | null>(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );
  const fileInput = useRef<HTMLInputElement>(null);

  const handleSignUp = () => {
    signUpNewUser(idValue, pwValue, profileImg, nickNameValue);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLFormElement>) => {
    if (e.target.files[0]) {
      setProfileImg(e.target!.files[0]);
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

  const handleIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idValue = e.target.value;
    setIdValue(idValue);
    idValue.includes('@') && pwValue.length >= 6 && pwValue === pwConfirmValue && nickNameValue.length >= 2
      ? setIsValid(true)
      : setIsValid(false);
  };

  const handlePwInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwValue = e.target.value;
    setPwValue(pwValue);
    idValue.includes('@') && pwValue.length >= 6 && pwValue === pwConfirmValue && nickNameValue.length >= 2
      ? setIsValid(true)
      : setIsValid(false);
  };

  const handlePwConfirmInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwConfirmValue = e.target.value;
    setPwConfirmValue(pwConfirmValue);
    idValue.includes('@') && pwValue.length >= 6 && pwValue === pwConfirmValue && nickNameValue.length >= 2
      ? setIsValid(true)
      : setIsValid(false);
  };

  const handleNicknameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickNameValue = e.target.value;
    setNicknameValue(nickNameValue);
    idValue.includes('@') && pwValue.length >= 6 && pwValue === pwConfirmValue && nickNameValue.length >= 2
      ? setIsValid(true)
      : setIsValid(false);
  };

  return (
    <div className={signup.wrapper}>
      <form className={signup.formbox} onSubmit={clickLoginHandler}>
        <div className={signup.input}>
          <p className={signup.ptagposition}>이메일</p>
          <input
            className={signup.inputsize}
            placeholder="이메일 형식으로 입력해주세요"
            value={idValue}
            onChange={handleIdInput}
          />
          <button className={signup.button}>중복확인</button>
        </div>
        <div className={signup.input}>
          <p className={signup.ptagposition}>비밀번호</p>
          <input
            className={signup.inputsize}
            placeholder="최소 6자 이상 입력해주세요"
            value={pwValue}
            onChange={handlePwInput}
          />
        </div>
        <div className={signup.input}>
          <p className={signup.ptagposition}>비밀번호 확인</p>
          <input
            className={signup.inputsize}
            placeholder="비밀번호와 동일하게 입력해주세요"
            value={pwConfirmValue}
            onChange={handlePwConfirmInput}
          />
        </div>
        <div className={signup.input}>
          <p className={signup.ptagposition}>닉네임</p>
          <input
            className={signup.inputsize}
            placeholder="최소 2자 이상입력해주세요"
            value={nickNameValue}
            onChange={handleNicknameInput}
          />
          <button className={signup.button}>중복확인</button>
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
          disabled={!isValid}
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
