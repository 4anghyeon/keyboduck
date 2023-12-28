import {toast, ToastOptions, ToastPosition} from 'react-toastify';

class ToastOption {
  position: ToastPosition;
  hideProgressBar = false;
  autoClose = 1000;
  closeOnClick = true;
  pauseOnHover = false;
  draggable = false;

  constructor(position: ToastPosition, timeout: number) {
    this.autoClose = timeout;
    this.position = position;
  }
}

interface ToastArgs {
  message: string;
  timeout?: number;
}

/**
 * 사용방법
 * 1. react-toastify를 사용하기 원하는 컴포넌트에서 useToast() 호출
 *    e.g) const {successTopCenter = useToast()}
 * 2. message (필수), timeout(선택)을 인자로 주고 호출
 *    e.g) successTopCenter({message: '성공'});
 *    e.g) successTopCenter({message: '성공', timeout: 2000});
 */
export const useToast = () => {
  const successTopCenter = ({message, timeout}: ToastArgs) => {
    const topCenter: ToastOptions = new ToastOption('top-center', timeout ?? 1000);
    toast.success(message, topCenter);
  };

  const errorTopCenter = ({message, timeout}: ToastArgs) => {
    const topCenter: ToastOptions = new ToastOption('top-center', timeout ?? 1000);
    toast.error(message, topCenter);
  };

  const warnTopCenter = ({message, timeout}: ToastArgs) => {
    const topCenter: ToastOptions = new ToastOption('top-center', timeout ?? 1000);
    toast.warn(message, topCenter);
  };

  const successTopRight = ({message, timeout}: ToastArgs) => {
    const topCenter: ToastOptions = new ToastOption('top-right', timeout ?? 1000);
    toast.success(message, topCenter);
  };

  const errorTopRight = ({message, timeout}: ToastArgs) => {
    const topCenter: ToastOptions = new ToastOption('top-right', timeout ?? 1000);
    toast.error(message, topCenter);
  };

  const warnTopRight = ({message, timeout}: ToastArgs) => {
    const topCenter: ToastOptions = new ToastOption('top-right', timeout ?? 1000);
    toast.warn(message, topCenter);
  };

  return {successTopCenter, errorTopCenter, warnTopCenter, successTopRight, errorTopRight, warnTopRight};
};
