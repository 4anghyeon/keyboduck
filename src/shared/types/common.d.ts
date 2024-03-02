interface Brand {
  name: string;
  enName: string;
}

type TargetType = 'answer' | 'comment' | 'accept';

interface ToastArgs {
  message: string;
  timeout?: number;
}

interface UserType {
  id: string;
  username: string;
  avatar: string;
}
