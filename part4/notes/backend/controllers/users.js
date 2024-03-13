const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("notes", {
    important: 1,
    content: 1,
  });
  response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id);
  if (user) response.json(user);
  else response.status(404).end();
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

usersRouter.delete("/:id", async (request, response) => {
  await User.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

usersRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: bcrypt.hash(body.passwordHash),
  });

  const updatedUser = await User.findByIdAndUpdate(request.params.id, user, {
    new: true,
  });
  response.json(updatedUser);
});

module.exports = usersRouter;
