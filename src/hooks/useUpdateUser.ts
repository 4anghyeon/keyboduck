import {findUserName, updateImage, updateUserData} from '@/pages/api/auth';
import {setUserInfo} from '@/redux/modules/userSlice';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';
import {useToast} from './useToast';
import {supabase} from '@/shared/supabase/supabase';

interface Props {
  userName: string;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  isValid: boolean;
  auth: UserType;
}

interface ImgProps {
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  isValid: boolean;
  auth: UserType;
  imageFile: File | null;
  setProfileImg: React.Dispatch<React.SetStateAction<string | null>>;
  defaultuserName: string;
}

export const useUpdateUserName = ({userName, setIsValid, isValid, auth}: Props) => {
  const {successTopRight} = useToast();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {data: userProfile, error} = useQuery({queryKey: ['userName'], queryFn: () => findUserName(userName)});
  const {mutate: userData} = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['userName']});
      setIsValid(!isValid);
      successTopRight({message: '프로필이 업데이트 되었습니다!', timeout: 2000});
      dispatch(setUserInfo([{id: auth.id, avatar_url: auth.avatar, username: userName}]));
    },
  });
  return {userProfile, error, userData};
};

export const useUpdateImg = ({auth, imageFile, setProfileImg, setIsValid, isValid, defaultuserName}: ImgProps) => {
  const {successTopRight} = useToast();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {mutate: userImgData} = useMutation({
    mutationFn: updateImage,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['userImage']});
      setIsValid(!isValid);
      successTopRight({message: '프로필이 업데이트 되었습니다!', timeout: 2000});
    },
    onError: () => {
      alert('오류입니다');
    },
  });

  const ImgData = async () => {
    let uploadUrl = auth.avatar;
    if (imageFile) {
      const {data: uploadData} = await supabase.storage
        .from('avatars')
        .upload(`profiles/${Date.now()}_${Math.floor(Math.random() * 1000)}.png`, imageFile, {
          contentType: 'image/png',
        });

      const bucketName = 'avatars';
      const supabaseUrl = 'https://eaxjoqjnwoyrpkpvzosu.supabase.co';
      uploadUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${uploadData?.path}`;
      userImgData({uploadUrl, auth});
      setProfileImg(uploadUrl);
      dispatch(setUserInfo([{id: auth.id, avatar_url: uploadUrl, username: defaultuserName}]));
    }
  };
  return {ImgData};
};
