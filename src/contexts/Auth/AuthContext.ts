import { createContext } from 'react';
import { User } from '../../types/SharedInterfaces';
export interface AuthContextType {
  token: string | null;
  user: User | null;
  loginAction: (data: any) => Promise<any>;
  signUpAction: (data: any) => Promise<any>;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
