const { auth } = require("../../utils/auth");
const { Upload } = require("../../utils/upload.Img");
const {
  addPost,
  deletePost,
  updatePost,
  getPost,
  LovePost,
  getPostUser,
  updateSold,
} = require("./post.service");
const app = require("express").Router();
app.delete("/", deletePost).put(updatePost);
app.use(auth);
app
  .route("/")
  .post(Upload("image", "/postPhoto"), addPost)
  .delete(deletePost)
  .patch(updatePost)
  .get(getPost)
  .patch(updateSold);
app.get("/getPostUser", getPostUser).post("/LovePost", LovePost);

module.exports = app;
