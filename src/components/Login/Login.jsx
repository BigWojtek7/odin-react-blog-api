import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [fetchData, setFetchData] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // let formData = new FormData();
    // formData.append('username', e.target.username.value);
    // formData.append('password', e.target.password.value);
    const postApi = async () => {
      const res = await fetch('http://localhost:3000/login', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
        method: 'post',
      });
      const data = await res.json();
      setFetchData(data);
      const token = data.token;
      localStorage.setItem("token", token)

      if (data.success) {
        navigate('/');
      }
      console.log(data);
    };
    postApi();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        <button>Log In</button>
      </form>
      {fetchData && <p>{fetchData.msg}</p>}
    </>
  );
}

export default Login;
