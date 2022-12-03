const express = require("express");
const { dbConnect } = require("./src/dbConnection/connection");
const AppError = require("./src/utils/AppError");
const app = express();
const gloBalErrors = require("./src/utils/globalError");
const cors = require('cors')
app.use(cors())
require("dotenv").config();
const port = process.env.PORT;

app.use(express.static("uploads"));
app.use(express.json());

app.use("/user", require("./src/components/user/user.Api"));
app.use("/post", require("./src/components/homePost/post.api"));
app.use("/comment", require("./src/components/comments/comments.api"));


dbConnect();
app.all("*", (req, res, next) => {
  next(
    new AppError(` can't find this route :${req.originalUrl} on server `, 404)
  );
});
app.use(gloBalErrors);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
