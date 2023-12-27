import React from 'react';
import login from './index.module.css';

const LoginPage = () => {
  return (
    <div className={login.wrapper}>
      <div className={login.inputbox}>
        <div className={login.input}>
          <p className={login.ptagposition}>이메일</p>
          <input className={login.inputsize} placeholder="이메일 형식으로 입력해주세요"></input>
        </div>
        <div className={login.input}>
          <p className={login.ptagposition}>비밀번호</p>
          <input className={login.inputsize} placeholder="최소 4자 이상 입력해주세요"></input>
        </div>
      </div>
      <div className={login.buttonbox}>
        <button className={login.button}>로그인</button>
        <button className={login.button}>Google로 로그인하기</button>
        <button className={login.button}>Github로 로그인하기</button>
      </div>
    </div>
  );
};

export default LoginPage;
