import React, {useRef, useState} from 'react';
import signup from './index.module.css';

const Signup = () => {
  const [profileImg, setProfileImg] = useState<string | ArrayBuffer | null>(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );
  const fileInput = useRef<HTMLInputElement>(null);

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

  return (
    <div className={signup.wrapper}>
      <form className={signup.formbox} onSubmit={clickLoginHandler}>
        <div className={signup.input}>
          <p className={signup.ptagposition}>이메일</p>
          <input className={signup.inputsize} placeholder="이메일 형식으로 입력해주세요" />
          <button className={signup.button}>중복확인</button>
        </div>
        <div className={signup.input}>
          <p className={signup.ptagposition}>비밀번호</p>
          <input className={signup.inputsize} placeholder="최소 4자 이상 입력해주세요" />
        </div>
        <div className={signup.input}>
          <p className={signup.ptagposition}>비밀번호 확인</p>
          <input className={signup.inputsize} placeholder="비밀번호와 동일하게 입력해주세요" />
        </div>
        <div className={signup.input}>
          <p className={signup.ptagposition}>닉네임</p>
          <input className={signup.inputsize} placeholder="최소 2자 이상입력해주세요" />
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
        <button className={signup.lastbutton}>회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
