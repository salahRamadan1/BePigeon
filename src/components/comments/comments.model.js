const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
  title: {
    type: String,
    required: [true, "comment is required"],
    minlength: [3, " minlength is 3"],
  },
  userId: { type: Types.ObjectId, ref: "User" },
  postId: { type: Types.ObjectId, ref: "Post" },
  up: [],
});

module.exports = model("comment", schema);
