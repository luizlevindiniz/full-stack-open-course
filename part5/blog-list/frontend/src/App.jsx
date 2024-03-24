import { useState, useEffect } from "react";
import BlogsList from "./components/BlogsList";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import axios from "axios";
import Notification from "./components/Notification";

const App = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const userStored = window.localStorage.getItem("user");
    if (userStored) {
      const storedUser = JSON.parse(userStored);
      setLoggedUser(storedUser);
      blogService.setToken(storedUser.token);
    }
  }, []);

  const handleLogin = async (loginObject) => {
    try {
      const userData = await axios.post("/api/login", loginObject);
      const user = userData.data;

      window.localStorage.setItem("user", JSON.stringify(user));
      setLoggedUser(user);
      blogService.setToken(user.token);
    } catch (err) {
      console.log(err);
      setNotification(err.response.data.error);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("user");
    setLoggedUser(null);
    blogService.setToken(null);
  };

  return (
    <div>
      <Notification notification={notification}></Notification>
      {loggedUser === null ? (
        <LoginForm handleLogin={handleLogin}></LoginForm>
      ) : (
        <div>
          <h1>blogs</h1>
          {`Welcome ${loggedUser.name}!`}
          <button type="submit" onClick={handleLogout}>
            logout
          </button>

          <BlogsList setNotification={setNotification}></BlogsList>
        </div>
      )}
    </div>
  );
};

export default App;
