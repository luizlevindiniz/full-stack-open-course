import { useState } from "react";
const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const login = async (event) => {
    event.preventDefault();
    let loginObject = {
      username: username,
      password: password,
    };

    try {
      await handleLogin(loginObject);
    } catch (err) {
      console.log(err);
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <>
      <h1 aria-label="loginHeader">Login</h1>
      <div className="loginFormDiv">
        <form onSubmit={login}>
          <div>
            <label htmlFor="username">username: </label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              required
              onChange={(e) => handleUsername(e)}
            />
          </div>
          <div>
            <label htmlFor="password">password: </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              required
              onChange={(e) => handlePassword(e)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
      <hr />
    </>
  );
};

export default LoginForm;
