import './App.css';

import MainLayout from './layouts/MainLayout';
import AuthProvider from './context/AuthProvider';
import LoaderProvider from './context/LoaderProvider';

function App() {
  // const [user, setUser] = useState({});

  // const [isLoading, setIsLoading] = useState(false);

  // const currentToken = localStorage.getItem('token');
  // const [token, setToken] = useState(currentToken);
  // const options = useMemo(
  //   () => ({
  //     headers: {
  //       Authorization: token,
  //     },
  //   }),
  //   [token]
  // );

  // const {
  //   fetchData: userData,
  //   // error,
  //   // loading,
  // } = useFetch(
  //   token ? `${import.meta.env.VITE_BACKEND_URL}/user` : null,
  //   options
  // );

  // useEffect(() => {
  //   if (userData) {
  //     setUser(userData);
  //   }
  //   return () => setUser({});
  // }, [userData]);

  return (
    <>
      <LoaderProvider>
        <AuthProvider>
          <MainLayout />
        </AuthProvider>
      </LoaderProvider>
    </>
  );
}

export default App;
