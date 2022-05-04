const { response } = require("express");
const Post = require("../models/postModels");

//fetch all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: "Sucess",
      results: posts.length,
      data: posts,
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail",
    });
  }
};

//fetch one post
exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: "Sucess",
      data: post,
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail",
    });
  }
};

//create new post
exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json({
      status: "Sucess",
      data: post,
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail",
    });
  }
};

//update existing post
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Sucess",
      data: post,
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail",
    });
  }
};

//delete post
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Sucess",
    });
  } catch (e) {
    res.status(400).json({
      status: "Fail",
    });
  }
};
