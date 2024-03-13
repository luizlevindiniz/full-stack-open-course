const blogRouter = require("express").Router();
const { Blog } = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
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
  const blogs = await Blog.findById(request.params.id);
  if (blogs) response.json(blogs);
  else response.status(404).end();
});

blogRouter.delete("/:id", async (request, response) => {
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
    await Blog.findByIdAndDelete(id);
    return response.status(204).end();
  } else {
    response
      .status(403)
      .json({ error: "you dont have permission to delete this blog post" });
  }
});

blogRouter.put("/:id", async (request, response) => {
  const updated = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );
  if (updated) response.status(200).json(updated);
  else response.status(404).end(0);
});

module.exports = blogRouter;
