import { useState, useContext } from "react";
import UserContext from "./UserContext";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, setBlogWasDeleted }) => {
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

  const { id, title, author, url, likes, user } = blog;

  const [showDetails, setShowDetails] = useState(false);
  const [blogLikes, setBlogLikes] = useState(likes);
  const currentUser = useContext(UserContext);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleRemove = async () => {
    const proceedToDelete = confirm(
      "Are you sure you want to delete this blog?"
    );

    if (proceedToDelete) {
      try {
        let deletedBlog = await blogService.del(blog.id);
        if (deletedBlog === 204) {
          setBlogWasDeleted(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLikes = async () => {
    let updatedLikes = blogLikes + 1;
    setBlogLikes(updatedLikes);

    let blogPayload = {
      user: user[0].id,
      likes: updatedLikes,
      url: url,
      author: author,
      title: title,
    };

    try {
      await blogService.update(blogPayload, id);
    } catch (err) {
      console.log(err);
    }
  };

  const detailedView = (blog) => {
    return (
      <div className="details">
        <p>{blog.url}</p>
        <p>
          <span className="numberOfLikes">{blogLikes}</span>
          <button type="button" onClick={handleLikes} className="likeButton">
            like
          </button>
        </p>
        {user && user.length > 0 && <p>{user[0].name}</p>}
        {user[0].name === currentUser.username && user.length > 0 && (
          <button
            type="button"
            style={removeButtonStyle}
            onClick={handleRemove}
            className="removeButton"
          >
            remove
          </button>
        )}
      </div>
    );
  };

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
  };

  return (
    <div style={blogStyle} className="singleBlog">
      {title} - {author}
      <button
        style={{ marginLeft: 3 }}
        type="button"
        onClick={handleShowDetails}
        className="showDetails"
      >
        {showDetails ? "hide" : "view"}
      </button>
      {showDetails && detailedView(blog)}
    </div>
  );
};

Blog.displayName = "Blog";
export default Blog;
