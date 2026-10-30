const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/me", async (request, response) => {
  const user = await User.findById(request.user.id);
  response.json(user);
});

userRouter.post("/", async (request, response) => {
  const { name, username, password } = request.body;

  if (password.length < 8) {
    return response
      .status(400)
      .json({ message: "Password must be longer than 8 characters" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name,
    username,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = userRouter;
