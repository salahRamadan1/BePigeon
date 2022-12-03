const app = require("express").Router();
const { auth } = require("../../utils/auth");
const {   Upload } = require("../../utils/upload.Img");
const {
  signUp,
  signIn,
  updateUser,
  confirmEmail,
  changeProfilePic,
  getInfoUser,
} = require("./user.service");
app
  .post("/signUp", signUp)
  .post("/signIn", signIn)
  .put("/updateUser", updateUser)
  .get("/verify/:token", confirmEmail)
  .patch('/changeProfilePic' ,   Upload('profile_Pic' , '/proFile'), changeProfilePic )
  .get('/userInfo' , getInfoUser) 
module.exports = app;
