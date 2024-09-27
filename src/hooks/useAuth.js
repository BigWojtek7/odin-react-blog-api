import AuthContext from '../contexts/AuthContext';
import { useContext } from 'react';

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      'Please use useLoader inside the context of LoaderProvider'
    );
  }
  return authContext;
};

export default useAuth;
