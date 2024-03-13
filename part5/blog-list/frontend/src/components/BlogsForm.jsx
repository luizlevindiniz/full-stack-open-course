import Blog from "./Blog";
const BlogsForm = ({ blogs, newBlog, setNewBlog, handleNewBlog }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
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
      <br />
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsForm;
