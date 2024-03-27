import { useState, useEffect } from "react";
import noteService from "../services/notes";
import PropTypes from "prop-types";
import loginService from "../services/login";
const LoginForm = ({ setLoggedUser, setErrorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const payloadToLogin = {
      username: username,
      password: password,
    };
    try {
      const user = await loginService.login(payloadToLogin);
      const userWithTimeStamp = { ...user, timestamp: new Date().getTime() };

      window.localStorage.setItem(
        "loggedUser",
        JSON.stringify(userWithTimeStamp)
      );

      setLoggedUser(userWithTimeStamp);
      noteService.setToken(userWithTimeStamp.token);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  const compareTime = (past, now) => {
    // diff in hours
    return Math.abs(now - past) / (1000 * 60 * 60);
  };

  useEffect(() => {
    let existingUser = window.localStorage.getItem("loggedUser");

    if (existingUser) {
      let userToStore = JSON.parse(existingUser);
      let dateString = userToStore.timestamp;

      let diffInHours = compareTime(dateString, new Date().getTime());
      if (diffInHours >= 0.5) {
        window.localStorage.removeItem("loggedUser");
        setLoggedUser(null);
        noteService.setToken(null);
      } else {
        setLoggedUser(userToStore);
        noteService.setToken(userToStore.token);
      }
    }
  }, []);

  LoginForm.propTypes = {
    setLoggedUser: PropTypes.func.isRequired,
    setErrorMessage: PropTypes.func.isRequired,
  };

  return (
    <>
      <div>
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">username: </label>
            <input
              required={true}
              type="text"
              name="username"
              id="username"
              data-testid="username"
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
              data-testid="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" data-testid="submitFormButton">
            login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
