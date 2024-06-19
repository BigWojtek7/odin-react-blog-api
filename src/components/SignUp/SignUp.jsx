import { useState } from 'react';

function SignUp() {
  const [fetchData, setFetchData] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    // const dataToSubmit = new FormData(e.target);
    console.log(e.target.username.value);

    const postApi = async () => {
      const res = await fetch('http://localhost:3000/sign-up', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
          re_password: e.target.re_password.value,
          is_admin: false
        }),
        method: 'post',
      });
      const json = await res.json();
      setFetchData(json);
      console.log(json);
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
        <label htmlFor="re_password">Re-Password</label>
        <input id="re_password" name="re_password" type="password" />
        <button>Sign Up</button>
      </form>
      {fetchData && <p>{fetchData.msg}</p>}
    </>
  );
}

export default SignUp;
