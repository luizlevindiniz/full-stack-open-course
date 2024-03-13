const LoginForm = ({
  username,
  handleUsername,
  password,
  handlePassword,
  handleLogin,
}) => {
  return (
    <>
      <h2>Login</h2>
      <div>
        <form onSubmit={handleLogin}>
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
