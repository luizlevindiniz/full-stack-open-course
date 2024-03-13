const loginRouter = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (request, response) => {
  const { password, username } = request.body;

  if (password === null || password === undefined) {
    return response.status(400).json({
      error: "password must not be null",
    });
  } else if (password.length < 3) {
    return response.status(400).json({
      error: "password must be at least 3 characters long",
    });
  } else if (username === null || username === undefined) {
    return response.status(400).json({
      error: "username must not be null",
    });
  }

  const user = await User.findOne({ username: username });
  const comparePassword =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user || !comparePassword) {
    return response.status(401).json({
      error: "username or password is invalid",
    });
  } else {
    const authentication = {
      username: user.username,
      userId: user._id,
      name: user.name,
    };

    const generateToken = jwt.sign(authentication, process.env.SECRET, {
      expiresIn: 60 * 60,
    });

    response.status(200).json({
      ...authentication,
      token: generateToken,
    });
  }
});

module.exports = loginRouter;
