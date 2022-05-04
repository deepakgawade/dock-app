const express = require("express");
const postControllers = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router
  .route("/")
  .get(protect, postControllers.getAllPosts)
  .post(protect, postControllers.createPost);

router
  .route("/:id")
  .get(protect, postControllers.getOnePost)
  .patch(protect, postControllers.updatePost)
  .delete(protect, postControllers.deletePost);

module.exports = router;
