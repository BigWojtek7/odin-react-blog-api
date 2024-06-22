import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

function Login() {
  const [fetchData, setFetchData] = useState(false);
  const [token, setToken] = useOutletContext();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // let formData = new FormData();
    // formData.append('username', e.target.username.value);
    // formData.append('password', e.target.password.value);
    const postApi = async () => {
      const res = await fetch('https://incandescent-creative-gaura.glitch.me/login', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
        method: 'post',
      });
      const data = await res.json();
      setFetchData(data);
      const dataToken = data.token;
      localStorage.setItem('token', dataToken);
      setToken(dataToken);

      if (data.success) {
        navigate('/');
      }
    };
    postApi();
  };

  return (
    <>
      {!token ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
          <button>Log In</button>
        </form>
      ) : (
        <p>You are logged in</p>
      )}
      {fetchData && <p>{fetchData.msg}</p>}
    </>
  );
}

export default Login;
