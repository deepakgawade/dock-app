const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashPass = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username: username,
      password: hashPass,
    });
    req.session.user = newUser;
    res.status(201).json({
      status: "Success",
      data: newUser,
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail",
    });
    console.log(e);
  }
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: "User not found",
      });
    }
    const istrue = await bcrypt.compare(password, user.password);
    console.log(istrue);
    if (istrue) {
      req.session.user = user;
      res.status(200).json({
        status: "Success",
        data: "user succesfully oged in",
      });
    } else {
      res.status(400).json({
        status: "Fail",
        data: "Entered wrong password",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "Fail",
    });
    console.log(e);
  }
};
