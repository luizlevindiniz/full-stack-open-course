const blogRouter = require("express").Router();
const { Blog } = require("../models/blog");
const { User } = require("../models/user");
const { userExtractor } = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogRouter.post("/", userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;

  const createdByUser = request.user;

  if (!createdByUser) {
    return response
      .status(400)
      .json({ message: "token is invalid or expired!" });
  }

  const blog = new Blog({
    title: title,
    url: url,
    likes: likes,
    author: author,
    user: createdByUser._id,
  });
  const newBlog = await blog.save();
  createdByUser.blogs = createdByUser.blogs.concat(blog._id);
  await createdByUser.save();

  response.status(201).json(newBlog);
});

blogRouter.get("/:id", async (request, response) => {
  const blogs = await Blog.findById(request.params.id).populate("user");
  if (blogs) response.json(blogs);
  else response.status(404).end();
});

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const id = request.params.id;

  const owner = request.user;
  if (!owner) {
    return response.status(400).json({ message: "user not found!" });
  }

  const blogToDelete = await Blog.findById(id);
  if (!blogToDelete) {
    return response.status(204).end();
  }

  if (blogToDelete.user.toString() === owner.id.toString()) {
    await blogToDelete.deleteOne();
    owner.blogs = owner.blogs.filter(
      (b) => b._id.toString() !== blogToDelete._id.toString()
    );
    await owner.save();
    return response.status(204).json({ message: "blog deleted" });
  } else {
    response
      .status(403)
      .json({ error: "you dont have permission to delete this blog post" });
  }
});

blogRouter.put("/:id", userExtractor, async (request, response) => {
  const authenticatedUser = request.user;

  if (!authenticatedUser) {
    return response
      .status(400)
      .json({ message: "token is invalid or expired!" });
  }

  const blogUserID = request.body.user;
  const blogUser = await User.findById(blogUserID);

  if (!blogUser) {
    return response.status(400).json({ message: "user not found!" });
  }

  const updated = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );

  if (updated) response.status(200).json(updated);
  else response.status(404).end(0);
});

module.exports = blogRouter;
