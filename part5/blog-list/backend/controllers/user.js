const userRouter = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

userRouter.post("/", async (request, response) => {
  const { name, password, username } = request.body;

  if (password === null || password === undefined) {
    return response.status(400).json({
      error: "password must not be null",
    });
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: "password must be at least 3 characters long",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    name: name,
    passwordHash: passwordHash,
    username: username,
  });

  const newUser = await user.save();
  response.status(201).json(newUser);
});

userRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id);
  if (user) response.json(user);
  else response.status(404).end();
});

module.exports = userRouter;
