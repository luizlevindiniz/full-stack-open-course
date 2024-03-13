import { useState, useEffect } from "react";
import BlogsForm from "./components/BlogsForm";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import axios from "axios";
import Notification from "./components/Notification";

const defaultBlog = {
  title: "",
  author: "",
  url: "",
};
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [newBlog, setNewBlog] = useState(defaultBlog);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userStored = window.localStorage.getItem("user");
    if (userStored) {
      const storedUser = JSON.parse(userStored);
      setLoggedUser(storedUser);
      blogService.setToken(storedUser.token);
    }
  }, []);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleNewBlog = async (event) => {
    event.preventDefault();

    try {
      const createdBlog = await blogService.create(newBlog);
      setBlogs(() => blogs.concat(createdBlog));
      setNotification(
        `A new blog ${createdBlog.title} by ${createdBlog.author} added.`
      );
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (err) {
      console.log(err);
      setNotification(err.response.data.error);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } finally {
      setNewBlog(defaultBlog);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    let loginObject = {
      username: username,
      password: password,
    };

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
    } finally {
      setUsername("");
      setPassword("");
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
        <LoginForm
          handlePassword={handlePassword}
          handleUsername={handleUsername}
          username={username}
          password={password}
          handleLogin={handleLogin}
        ></LoginForm>
      ) : (
        <div>
          <h2>blogs</h2>
          {`Welcome ${loggedUser.name}!`}
          <button type="submit" onClick={handleLogout}>
            logout
          </button>
          <BlogsForm
            blogs={blogs}
            newBlog={newBlog}
            setNewBlog={setNewBlog}
            handleNewBlog={handleNewBlog}
          ></BlogsForm>
        </div>
      )}
    </div>
  );
};

export default App;
