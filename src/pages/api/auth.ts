import {supabase} from '@/shared/supabase/supabase';
import {useToast} from '@/hooks/useToast';
import {Tables} from '@/shared/supabase/types/supabase';

interface Props {
  userName: string;
  profileImg: string | null;
  auth: UserType;
}

interface ImgProps {
  uploadUrl: string;
  auth: UserType;
}

// github 회원가입,로그인
export const signInWithGithub = async () => {
  const {errorTopRight} = useToast();
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

  if (error) errorTopRight({message: '로그인 후 이용해 주세요!', timeout: 4000});
};

// google 회원가입, 로그인
export const googleLogin = async () => {
  const {errorTopRight} = useToast();
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
      //메타데이터는 용량한계가 있음
      data: {
        username: nickname,
        avatar_url: photourl,
      },
    },
  });
};

export const findUserName = async (userName: string) => {
  const {data, error} = await supabase
    .from('profiles')
    .select('username')
    .eq('username', userName)
    .returns<Tables<'profiles'>[]>();
  return data;
};

export const updateUserData = async ({userName, profileImg, auth}: Props) => {
  await supabase
    .from('profiles')
    .update({avatar_url: profileImg?.toString(), username: userName})
    .eq('id', auth.id)
    .select();
};

export const updateImage = async ({uploadUrl, auth}: ImgProps) => {
  const {error} = await supabase.from('profiles').update({avatar_url: uploadUrl}).eq('id', auth.id).select();
  return error;
};

export const bringId = async (idValue: string) => {
  const {data} = await supabase.from('profiles').select('email').eq('email', idValue).returns<Tables<'profiles'>[]>();
  return data;
};

export const bringUserName = async (nickNameValue: string) => {
  const {data} = await supabase
    .from('profiles')
    .select('username')
    .eq('username', nickNameValue)
    .returns<Tables<'profiles'>[]>();
  return data;
};
