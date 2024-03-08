const blogRouter = require("express").Router();
const { Blog } = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const newBlog = await blog.save();
  response.status(201).json(newBlog);
});

blogRouter.get("/:id", async (request, response) => {
  const blogs = await Blog.findById(request.params.id);
  if (blogs) response.json(blogs);
  else response.status(404).end();
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
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
