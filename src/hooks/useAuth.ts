import {bringId, bringUserName} from '@/pages/api/auth';
import {useQuery} from '@tanstack/react-query';
import {useToast} from './useToast';

interface Props {
  idValue: string;
  setIdValid: React.Dispatch<React.SetStateAction<boolean>>;
  setIdValue: React.Dispatch<React.SetStateAction<string>>;
  nickNameValue: string;
  setNicknameValid: React.Dispatch<React.SetStateAction<boolean>>;
  setNicknameValue: React.Dispatch<React.SetStateAction<string>>;
}

export const useConfirmId = ({
  idValue,
  setIdValid,
  setIdValue,
  nickNameValue,
  setNicknameValid,
  setNicknameValue,
}: Props) => {
  const {successTopRight, errorTopRight} = useToast();
  const {data: id, isError: idError} = useQuery({queryKey: ['useEmail'], queryFn: () => bringId(idValue)});
  const {data: userName, isError: userNameError} = useQuery({
    queryKey: ['useEmail'],
    queryFn: () => bringUserName(idValue),
  });
  // 이메일 사용가능
  const determineId = () => {
    if (id?.length === 0 && idValue.includes('@')) {
      successTopRight({message: '사용가능한 이메일이에요!', timeout: 2000});
      setIdValid(true);
    }

    // 이메일 사용중
    if (id!.length >= 1 || !idValue.includes('@')) {
      errorTopRight({message: '이메일 형식오류 혹은 사용중인 이메일이에요!', timeout: 2000});
      setIdValue('');
    }
    if (idError) alert('오류입니다');
  };
  const determineUserName = () => {
    if (userName?.length === 0 && nickNameValue.length >= 2) {
      successTopRight({message: '사용가능한 닉네임이에요!', timeout: 2000});
      setNicknameValid(true);
    }
    if (userName!.length >= 1 || nickNameValue.length < 2) {
      errorTopRight({message: '사용중인 닉네임 혹은 닉네임을 2글자 이상 써주세요!', timeout: 2000});
      setNicknameValue('');
    }
    if (userNameError) alert('오류입니다');
  };

  return {determineId, determineUserName};
};
