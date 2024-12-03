import { createContext } from 'react';
import { User } from '../../types/SharedInterfaces';
export interface AuthContextType {
  token: string | null;
  user: User | null;
  loginAction: (data: LoginData) => Promise<LoginResponse>;
  signUpAction: (data: SignUpData) => Promise<SignUpResponse>;
  logOut: () => void;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface SignUpData extends LoginData {
  re_password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  expiresIn: string;
  msg: string;
}

export interface SignUpResponse {
  success: boolean;
  token: string;
  expiresIn: string;
  msg: ErrorMessage[];
}

interface ErrorMessage {
  msg: string;
}
const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
