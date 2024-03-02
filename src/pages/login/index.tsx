import React, {useState} from 'react';
import login from './index.module.css';
import {signInWithGithub, googleLogin} from '../api/auth';
import {supabase} from '@/shared/supabase/supabase';
import {useRouter} from 'next/navigation';
import {useToast} from '@/hooks/useToast';
const LoginPage = () => {
  const [idValue, setIdValue] = useState<string>('');
  const [pwValue, setPwValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const router = useRouter();
  const {errorTopRight} = useToast();
  const clickLoginHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idValue = e.target.value;
    setIdValue(idValue);
    idValue.includes('@') && pwValue.length >= 6 ? setIsValid(true) : setIsValid(false);
  };

  const handlePwInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwValue = e.target.value;
    setPwValue(pwValue);
    idValue.includes('@') && pwValue.length >= 6 ? setIsValid(true) : setIsValid(false);
  };

  const loginHandler = async () => {
    const {data, error} = await supabase.auth.signInWithPassword({
      email: idValue,
      password: pwValue,
    });
    if (data.user !== null) {
      router.push('/');
    }
    if (error) errorTopRight({message: '아이디 혹은 비밀번호를 확인해주세요!', timeout: 2000});
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
            onChange={handleIdInput}
          />
        </div>
        <div className={login.input}>
          <p className={login.ptagposition}>비밀번호</p>
          <input
            className={login.inputsize}
            type="password"
            placeholder="최소 6자 이상 입력해주세요"
            value={pwValue}
            onChange={handlePwInput}
            minLength={4}
          />
        </div>
      </form>
      <div className={login.buttonbox}>
        <button
          type="submit"
          disabled={!isValid}
          className={login.button}
          style={{backgroundColor: isValid ? '#83E0A5' : '#a3a3a3'}}
          onClick={loginHandler}
        >
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
