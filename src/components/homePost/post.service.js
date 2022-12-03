const AppError = require("../../utils/AppError");
const { createTryAndCatch } = require("../../utils/catchError");
const PostModel = require("./post.model");
// add post
exports.addPost = createTryAndCatch(async (req, res, next) => {
  req.body.image = req.file?.filename;
  req.body.userId = req.id;
  let post = new PostModel(req.body);
  await post.save();
  res.status(200).json({ message: "success", post });
});
// delete
exports.deletePost = createTryAndCatch(async (req, res, next) => {
  await PostModel.findByIdAndDelete(req.body._id);
  res.json({ message: "success" });
});
// update
exports.updatePost = createTryAndCatch(async (req, res, next) => {
  req.body.image = req.file?.filename;
  let post = await PostModel.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  res.status(200).json({ message: "success", post });
});
// get posts
exports.getPost = createTryAndCatch(async (req, res, next) => {
  let page = req.query.page * 1 || 1;
  if (page < 0) page = 1;
  let limit = 5;
  let skip = (page - 1) * limit;
  let post = await PostModel.find({})
    .skip(skip)
    .limit(limit)
    .populate("userId", "firstName profile_Pic Phone   -_id");
  if (post) {
    res.json({ message: "success", page: page, post });
  }
  res.json({ message: "not found" });
});
// get posts for one user
exports.getPostUser = createTryAndCatch(async (req, res, next) => {
  let post = await PostModel.find({ userId: req.id }).populate(
    "userId",
    "firstName profile_Pic   -_id"
  );
  if (post.length > 0) {
    res.status(200).json({ message: "success", post });
  } else {
    res.status(200).json({ message: " you are not have any posts" });
  }
});
// like post
exports.LovePost = createTryAndCatch(async (req, res, next) => {
  const isPost = await PostModel.findById(req.body._id);
  if (isPost) {
    let post = await PostModel.findOne({
      _id: req.body,
      up: { $in: [req.id] },
    });
    if (!post) {
      await PostModel.findByIdAndUpdate(req.body._id, {
        $push: { up: req.id },
        $inc: { count: 1 },
      });
      res.json({ message: "push", post });
    } else {
      await PostModel.findByIdAndUpdate(req.body._id, {
        $pull: { up: req.id },
        $inc: { count: -1 },
      });
      res.json({ message: "pull", post });
    }
  } else {
    res.json({ message: "post not found" });
  }
});
// update sold post
exports.updateSold = createTryAndCatch(async (req, res, next) => {
  const { sold, _id } = req.body;
  const post = await PostModel.findByIdAndUpdate(
    { _id },
    { sold },
    { new: true }
  );
  res.json({ message: "success", post });
});
