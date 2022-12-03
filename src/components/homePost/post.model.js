const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: {
    type: String,
    minlength: [3, " minlength is 3"],
  },
  sold: {
    type: String,
    default: "unsold",
  },
  price: {
    type: Number,
  },
  image: String,
  userId: { type: Types.ObjectId, ref: "User" },
  up: [{ type: Types.ObjectId, ref: "User" }],
  count: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Post", schema);
