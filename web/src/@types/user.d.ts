interface ReqLogin {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface IUser {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  accessToken: string;
}
