const Candidate = require("../model/candidate");
const User = require("../model/user");

// Create candidate
const createCandidate = async (req, res) => {
    try {
        const userId = req.body.id;
        const userData = await User.findById(userId);

        if (userData.role === "admin") {
            const { candidateName, party, age } = req.body;

            if (!candidateName || !party || !age) {
                return res.json({
                    success: false,
                    message: "All fields required",
                });
            }

            // Create new candidate using candidate model
            const newCandidate = new Candidate(req.body);
            const response = await newCandidate.save();

            if (response) {
                return res.json({
                    success: true,
                    message: "Candidate created successfully",
                    data: response,
                });
            } else {
                return res.json({
                    success: false,
                    message: "Candidate not created",
                });
            }
        } else {
            return res.json({
                success: false,
                message: "You are not admin",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Update candidate detail
const changeCandidateDetail = async (req, res) => {
    try {
        const userId = req.body.id; // admin ID should be in req.body
        const userData = await User.findById(userId);

        if (userData.role === "admin") {
            const candidateId = req.params.id; // candidate ID should be in req.body
            const updateData = req.body;

            const response = await Candidate.findByIdAndUpdate(candidateId, updateData, { new: true });

            if (response) {
                return res.json({
                    success: true,
                    message: "Candidate updated successfully",
                    data: response,
                });
            } else {
                return res.json({
                    success: false,
                    message: "Candidate not updated",
                });
            }
        } else {
            return res.json({
                success: false,
                message: "You are not admin",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

//delet candidate by id

const deleteCandidate = async (req, res) => {
    try {
        const userId = req.body.id; // admin ID should be in req.body
        const userData = await User.findById(userId);

        if (userData.role === "admin") {
            const candidateId = req.params.id; // candidate ID should be in req.body

            const response = await Candidate.findOneAndDelete(candidateId)

            if (response) {
                return res.json({
                    success: true,
                    message: "Candidate deleted successfully",
                });
            } else {
                return res.json({
                    success: false,
                    message: "Candidate not deleted",
                });
            }
        } else {
            return res.json({
                success: false,
                message: "You are not admin",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
//get all candidate
const getAllCandidate = async (req, res) => {
    try {
        // 
            const response = await Candidate.find({})

            if (response) {
                return res.json({
                    success: true,
                    message: "Candidate find successfully",
                    data:response

                });
            } else {
                return res.json({
                    success: false,
                    message: "Candidate not found",
                });
            }
    
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
//get candidate by candidate id
const getCandidateById = async (req, res) => {
    const candidateId = req.params.id;
    try {
      const response = await Candidate.findById(candidateId);
  
      if (response) {
        return res.json({
          success: true,
          message: "Candidate found successfully",
          data: response,
        });
      } else {
        return res.json({
          success: false,
          message: "Candidate not found",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  
module.exports = {
    createCandidate,
    changeCandidateDetail,
    deleteCandidate,
    getAllCandidate,
    getCandidateById
};
