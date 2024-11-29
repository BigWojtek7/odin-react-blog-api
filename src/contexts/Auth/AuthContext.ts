import { createContext } from 'react';

interface AuthContextType {
  token: string | null;
  user: any;
  loginAction: (data: any) => Promise<any>;
  signUpAction: (data: any) => Promise<any>;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
