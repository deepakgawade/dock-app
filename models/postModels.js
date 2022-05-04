const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Post must have title"],
  },
  body: {
    type: String,
    required: [true, "post must have body"],
  },
});

const post = mongoose.model("Post", postSchema);

module.exports = post;
