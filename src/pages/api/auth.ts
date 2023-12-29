import {supabase} from '@/shared/supabase/supabase';

// github 회원가입,로그인
export const signInWithGithub = async () => {
  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  if (data) alert('로그인 되었습니다');

  if (error) console.log('error:', error);
};

// google 회원가입, 로그인
export const googleLogin = async () => {
  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  console.log(data);
  if (data) alert('로그인 되었습니다');
  if (error) console.log('error', error);
};

// 이메일 회원가입
export const signUpNewUser = async (
  email: string,
  password: string,
  photourl: string | ArrayBuffer | null,
  nickname: string,
) => {
  const {data, error} = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      // emailRedirectTo: email,
      data: {
        username: nickname,
        avatar_url: photourl,
      },
    },
  });
  console.log(data);
};
