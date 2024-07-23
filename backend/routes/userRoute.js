const express = require("express");
const { signup, LoginUser,  } = require("../controllers/userController");
const { encryptPassword, checkUser,  } = require("../middleware/encryptPassword");
const userRouter = express.Router();

userRouter.post("/signup",encryptPassword, signup);
userRouter.post("/login", checkUser,LoginUser);



module.exports = userRouter;
