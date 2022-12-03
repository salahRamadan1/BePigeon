const { auth } = require("../../utils/auth");
const {
  addComment,
  deleteComment,
  updateComment,
  getCommentPost,
} = require("./comments.service");
const app = require("express").Router();
app.use(auth);
app
  .route("/")
  .post(addComment)
  .delete(deleteComment)
  .put(updateComment)
  .get(getCommentPost);

module.exports = app;
