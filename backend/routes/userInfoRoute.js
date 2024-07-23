const express=require("express");
const { checkAuthorization } = require("../middleware/encryptPassword");
const { userInfo } = require("../controllers/userController");
const { changePassword, voteToCandidate, getCandidateVote }=require("../controllers/userinfoController");
const { getAllCandidate, getCandidateById } = require("../controllers/candidateController");

const userInfoRouter=express.Router()
userInfoRouter.get("/profile",checkAuthorization,userInfo);
userInfoRouter.put("/profile/password",checkAuthorization,changePassword);
userInfoRouter.post("/candidate/:id",checkAuthorization,voteToCandidate);
userInfoRouter.get("/vote/count",getCandidateVote);
userInfoRouter.get("/all",getAllCandidate);
userInfoRouter.get("/:id",getCandidateById);





module.exports=userInfoRouter
