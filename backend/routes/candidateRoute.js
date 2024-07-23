
const express=require("express");
const { checkAuthorization } = require("../middleware/encryptPassword");
const { createCandidate, changeCandidateDetail, deleteCandidate } = require("../controllers/candidateController");
const candidateRoute=express.Router()
candidateRoute.use(checkAuthorization)
candidateRoute.post("/create",createCandidate);
candidateRoute.put("/:id",changeCandidateDetail);
candidateRoute.delete("/:id",deleteCandidate);



module.exports=candidateRoute
