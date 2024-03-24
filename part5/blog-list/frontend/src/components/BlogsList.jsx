import { useState, useEffect, useRef } from "react";
import Blog from "./Blog";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
import BlogForm from "./BlogForm";
const BlogsList = ({ setNotification }) => {
  console.log("blog list render");
  const [blogs, setBlogs] = useState([]);
  const [blogWasDeleted, setBlogWasDeleted] = useState(false);

  const formVisibilityRef = useRef();

  const handleNewBlog = async (newBlog) => {
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
      formVisibilityRef.current.toggleFormVisibility();
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(
        blogs.sort(function (a, b) {
          if (a.likes > b.likes) {
            return -1;
          }
          if (a.likes < b.likes) {
            return 1;
          }
          return 0;
        })
      );
      setBlogWasDeleted(false);
    });
  }, [blogWasDeleted]);

  return (
    <div>
      <h3>create new</h3>
      <Togglable buttonLabel={"open form"} ref={formVisibilityRef}>
        <BlogForm handleNewBlog={handleNewBlog}></BlogForm>
      </Togglable>
      <br />
      <h3>listed</h3>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            setBlogWasDeleted={setBlogWasDeleted}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogsList;
