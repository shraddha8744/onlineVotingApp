const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");




const encryptPassword=(req,res,next)=>{
    const saltRounds=8

    const {username,email,password,address}=req.body
    if (!username || !email || !password || !address) {
        return res.json({
            success: false,
            message: "All fields are required",
        });
    }

    bcrypt.hash(password, saltRounds).then(function(hash) {
        req.body.password=hash
        next()
        
    })

}

const User=require("../model/user")

const checkUser = async (req, res, next) => {
    const { aadharcardNumber, password } = req.body;

    if (!aadharcardNumber || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    try {
        const userData = await User.findOne({ aadharcardNumber: aadharcardNumber });

        if (!userData) {
            return res.status(404).json({ 
                success: false,
                message: "User not found",
            });
        }

        const match = await bcrypt.compare(password, userData.password);

        if (match) {
            req.body=userData
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "Password does not match",
            });
        }
    } catch (error) {
        console.error("Error checking user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const checkAuthorization = (req, res, next) => {
    if (!req.headers) {
        return res.status(400).json({
            status: "Failed",
            message: "Headers are missing in the request"
        });
    }

    const authorizationToken = req.headers.authorization;

    if (!authorizationToken) {
        return res.status(401).json({
            status: "Failed",
            message: "Authorization token is required"
        });
    }

    try {
        const decoded = jwt.verify(authorizationToken,process.env.JSON_TOKEN_KEY);
        req.body.id = decoded.id;
        next();
    } catch (err) {
        console.error("JWT verification error:", err);
        return res.status(401).json({
            status: "Failed",
            message: "Invalid authorization token"
        });
    }
};




module.exports={
    checkUser,
        encryptPassword,
        checkAuthorization
    
}

