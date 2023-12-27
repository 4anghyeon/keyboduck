import React, {useState} from 'react';
import login from './index.module.css';
import {signInWithGithub, googleLogin} from '../api/auth';

const LoginPage = () => {
  const [idValue, setIdValue] = useState<string>('');
  const [pwValue, setPwValue] = useState<string>('');
  console.log(pwValue);
  console.log(idValue);

  const clickLoginHandler = e => {
    e.preventDefault();
  };

  return (
    <div className={login.wrapper}>
      <form className={login.inputbox} onSubmit={clickLoginHandler}>
        <div className={login.input}>
          <p className={login.ptagposition}>이메일</p>
          <input
            className={login.inputsize}
            placeholder="이메일 형식으로 입력해주세요"
            value={idValue}
            onChange={e => {
              setIdValue(e.target.value);
            }}
            minLength={4}
          ></input>
        </div>
        <div className={login.input}>
          <p className={login.ptagposition}>비밀번호</p>
          <input
            className={login.inputsize}
            type="password"
            placeholder="최소 4자 이상 입력해주세요"
            value={pwValue}
            onChange={e => {
              setPwValue(e.target.value);
            }}
            minLength={4}
          ></input>
        </div>
      </form>
      <div className={login.buttonbox}>
        <button type="submit" className={login.button} disabled={idValue.length < 4 || pwValue.length < 4}>
          로그인
        </button>
        <button className={login.button} onClick={googleLogin}>
          Google로 로그인하기
        </button>
        <button className={login.button} onClick={signInWithGithub}>
          Github로 로그인하기
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
