const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User name sholud be there"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User must have password"],
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
