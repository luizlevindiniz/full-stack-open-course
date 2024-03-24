import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, setBlogWasDeleted }) => {
  console.log("blog render");
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const removeButtonStyle = {
    backgroundColor: "blue",
    borderRadius: 5,
  };

  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleRemove = async () => {
    try {
      let deletedBlog = await blogService.del(blog.id);
      if (deletedBlog === 204) {
        setBlogWasDeleted(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLikes = async () => {
    let updatedLikes = likes + 1;
    setLikes(updatedLikes);

    let blogPayload = {
      user: blog.user[0].id,
      likes: updatedLikes,
      url: blog.url,
      author: blog.author,
      title: blog.title,
    };

    try {
      await blogService.update(blogPayload, blog.id);
    } catch (err) {
      console.log(err);
    }
  };

  const detailedView = (blog) => {
    return (
      <div>
        <p>{blog.url}</p>
        <p>
          {likes}
          <button type="button" onClick={handleLikes}>
            like
          </button>
        </p>
        {blog.user && blog.user.length > 0 && <p>{blog.user[0].name}</p>}
        <button type="button" style={removeButtonStyle} onClick={handleRemove}>
          remove
        </button>
      </div>
    );
  };

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
  };

  return (
    <>
      <div style={blogStyle}>
        {blog.title} - {blog.author}
        <button
          style={{ marginLeft: 3 }}
          type="button"
          onClick={handleShowDetails}
        >
          {showDetails ? "hide" : "view"}
        </button>
        {showDetails && detailedView(blog)}
      </div>
    </>
  );
};

Blog.displayName = "Blog";
export default Blog;
