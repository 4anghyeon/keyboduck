import {supabase} from '@/shared/supabase/supabase';
import {useToast} from '@/hooks/useToast';

// github 회원가입,로그인
export const signInWithGithub = async () => {
  const {successTopRight, errorTopRight} = useToast();
  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: process.env.NEXT_PUBLIC_SUPACE_REDIRECT_TO,
    },
  });
  if (data) successTopRight({message: '로그인 되었습니다!', timeout: 4000});

  if (error) errorTopRight({message: '로그인 후 이용해 주세요!', timeout: 4000});
};

// google 회원가입, 로그인
export const googleLogin = async () => {
  const {successTopRight, errorTopRight} = useToast();
  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: process.env.NEXT_PUBLIC_SUPACE_REDIRECT_TO,
    },
  });
  if (data) successTopRight({message: '로그인 되었습니다!', timeout: 4000});
  if (error) errorTopRight({message: '로그인 후 이용해 주세요!', timeout: 4000});
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
