import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import requestWithNativeFetch from '../../utils/fetchApi';
import useAuth from '../../hooks/useAuth';

function SignUp() {
  const [fetchData, setFetchData] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchDataForCreateUser = async () => {
      try {
        const options = {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value,
            re_password: e.target.re_password.value,
            is_admin: false,
          }),
          method: 'post',
        };
        const createUserData = await requestWithNativeFetch(
          `${import.meta.env.VITE_BACKEND_URL}/sign-up`,
          options
        );
        setFetchData(createUserData);
        setIsLoading(false);
        if (createUserData.success) {
          navigate('/');
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataForCreateUser();
  };

  return (
    <>
      {!token ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
          <label htmlFor="re_password">Re-Password</label>
          <input id="re_password" name="re_password" type="password" />
          <button>Sign Up</button>
          {!fetchData?.success &&
            fetchData?.msg.map((err, index) => <p key={index}>{err.msg}</p>)}
        </form>
      ) : (
        <p>You are logged in</p>
      )}
    </>
  );
}

export default SignUp;
