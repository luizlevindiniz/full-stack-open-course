import { useState, useEffect } from "react";
const BlogForm = ({ handleNewBlog }) => {
  const defaultBlog = {
    title: "",
    author: "",
    url: "",
  };
  const [newBlog, setNewBlog] = useState(defaultBlog);

  const createNewBlog = async (event) => {
    event.preventDefault();
    try {
      await handleNewBlog(newBlog);
    } catch (err) {
      console.log(err);
    } finally {
      setNewBlog(defaultBlog);
    }
  };

  return (
    <div>
      <form onSubmit={createNewBlog}>
        <div>
          <label htmlFor="title">title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={newBlog.title}
            required
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="author">author: </label>
          <input
            type="text"
            name="author"
            id="author"
            value={newBlog.author}
            required
            onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="url">url: </label>
          <input
            type="text"
            name="url"
            id="url"
            value={newBlog.url}
            required
            onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
