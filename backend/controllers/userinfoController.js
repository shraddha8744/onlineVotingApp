const bcrypt = require('bcrypt');
const User = require("../model/user");
const Candidate = require('../model/candidate');

// Change password function
const changePassword = async (req, res) => {
    console.log(req.body.id);
    try {
        const { id, currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(404).json({
                success: false,
                message: "All fields required",
            });
        }

        // Find user by id
        const userData = await User.findById(id);
        console.log(userData);
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Compare current password with stored password
        const match = await bcrypt.compare(currentPassword, userData.password);
        if (match) {
            // Hash the new password
            const saltRounds = 6;
            const hash = await bcrypt.hash(newPassword, saltRounds);
            userData.password = hash;
            await userData.save();
            res.json({
                success: true,
                message: "Password updated successfully",
            });
        } else {
            res.status(401).json({
                success: false,
                message: "Current password does not match",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// User voting function
const voteToCandidate = async (req, res) => {
    try {
        const userId = req.body.id;
        const candidateId = req.params.id;

        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(400).json({
                success: false,
                message: "Candidate not found",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.isVoted) {
            return res.status(400).json({
                success: false,
                message: "You have already voted",
            });
        }

        if (user.role === "admin") {
            return res.status(400).json({
                success: false,
                message: "Admin not allowed to vote",
            });
        }

        // Update the candidate's vote count and add user to votes
        candidate.votes.push({ user: userId });
        candidate.voteCount++;
        await candidate.save();

        // Update the user's voting status
        user.isVoted = true;
        await user.save();

        return res.json({
            success: true,
            message: "Vote saved successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Get candidate vote count
const getCandidateVote = async (req, res) => {
    try {
        const voteCount = await Candidate.find().sort({ voteCount: "desc" });
        const response = voteCount.map((data) => {
            return {
                party: data.party,
                count: data.voteCount,
            };
        });

        return res.json({
            success: true,
            message: "Fetched all vote counts",
            data: response,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { changePassword, voteToCandidate, getCandidateVote };
