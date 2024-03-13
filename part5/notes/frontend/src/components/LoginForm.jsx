const LoginForm = ({
  handleLogin,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
}) => {
  return (
    <>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">username: </label>
            <input
              required={true}
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label htmlFor="password">password: </label>
            <input
              required={true}
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
      <hr />
    </>
  );
};

export default LoginForm;
