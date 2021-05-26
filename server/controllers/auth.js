const User = require("../models/user");

exports.addOrUpdateUser = async (req, res, next) => {
  const currentUser = req.currentUser;
  const { name, email, picture } = currentUser;
  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );
  console.log(user);
  if (user) {
    console.log("user", user);
    res.json(user);
  } else {
    const newUser = await new User({
      name,
      email,
      picture,
    }).save();
    console.log("newuser", newUser);
    res.json(newUser);
  }
};

exports.getCurrrentUser = (req, res, next) => {
  const user = req.currentUser;

  User.find({ email: user.email })
    .then((user) => {
      console.log(user);
      res.json(user);
    })
    .catch((err) => {
      res.sendStatus(400).json({ err });
    });
};
