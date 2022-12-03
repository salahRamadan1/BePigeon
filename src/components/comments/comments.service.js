const AppError = require("../../utils/AppError");
const { createTryAndCatch } = require("../../utils/catchError");
const postModel = require("../homePost/post.model");
const CommentModel = require("./comments.model");
// add comment
exports.addComment = createTryAndCatch(async (req, res, next) => {
  req.body.userId = req.id;
  const comment = new CommentModel(req.body);
  await comment.save();
  res.status(200).json({ message: "success", comment });
});
// delete
exports.deleteComment = createTryAndCatch(async (req, res, next) => {
  let comment = await CommentModel.findById(req.body._id);
  if (comment.userId != req.id)
    return next(new AppError(" you not owner this comment", 201));
  await CommentModel.findByIdAndDelete(req.body._id);
  res.status(200).json({ message: "success" });
});
// update
exports.updateComment = createTryAndCatch(async (req, res, next) => {
  let comment = await CommentModel.findById(req.body._id);
  if (comment.userId != req.id)
    return next(new AppError(" you not owner this comment", 201));
  let isComment = await CommentModel.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  res.status(200).json({ message: "success", isComment });
});
// get comment for on post 
exports.getCommentPost = createTryAndCatch(async (req, res, next) => {
  let comment = await CommentModel.find(req.body.postId).populate(
    "userId",
    "firstName lastName profile_Pic -_id"
  );
  if (!comment) return next(new AppError("comment not found", 201));
  res.status(201).json({ msg: "success", comment });
});
