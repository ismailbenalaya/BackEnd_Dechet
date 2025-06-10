const User = require("../model/userModel");
const JWT = require("jsonwebtoken");
require("dotenv").config(); 
const crypto=require("crypto");
const nodemailer=require("nodemailer");
const { error } = require("console");
const bcrypt = require("bcrypt");



module.exports.Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).populate("roleId");

        if (!user) {
            return res.status(401).json({ message: "Email not found" });
        }

        // Ensure password verification works correctly
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate token
        const token = JWT.sign(
            { userId: user._id, role: user.roleId?.nameRole }, // Include role name
            process.env.TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ 
            success: true, 
            token: token, 
            user: { _id: user._id, email: user.email, role: user.roleId?.nameRole , name : user.name , firstname : user.firstName}, // Include role name in the response
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.verifyToken=(req,res,next)=>{
    const token= req.headers.authorisation;
    if (!token){
        return res.status(401).json({message:"unauthorized"})
    }
    const tokenWithoutBarrier = token.split(' ')[1]
    JWT.verify(tokenWithoutBarrier,process.env.TOKEN_SECRET,(error,decoded)=>{
        if (error){
            return res.status(401).json({message:"verification token failed"})
        }
        req.user=decoded
        next()
    })


}


module.exports.forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = crypto.randomBytes(20).toString("hex");
        const now = new Date();
        const expired = new Date(now.getTime() + 3600000); // Token expires in 1 hour
        user.resetToken = token;
        user.resetTokenExpire = expired;
        await user.save({ validateBeforeSave: false });

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            secure: false,
            auth: {
                user: "hamaelkhouja@gmail.com",
                pass: "xwltmupabvmigfwk", // Consider using environment variables instead of hardcoding
            },
        });

        const mailOptions = {
            from: "hamaelkhouja@gmail.com",
            to: email,
            subject: "Password Reset Request",
            text: `You requested a password reset. Click the link below to reset your password:
            http://localhost:4200/user/resetPassword/${token}
            This link will expire in one hour.`,
        };

        await transporter.sendMail(mailOptions,(error)=>{
            if (error){
                console.error("error sending email",error)
                return res.status(500).json({message:"internal server error"})
            
            }
            return res.json({message:"email sent successfully"})

        });

        res.status(200).json({ message: "Password reset email sent successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
module.exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newpassword } = req.body;

    try {
        // Check if the token exists and is still valid
        const user = await User.findOne({ 
            resetToken: token, 
            resetTokenExpire: { $gt: Date.now() } 
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Validate new password
        if (!newpassword || newpassword.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Hash the new password before saving
        user.password = await bcrypt.hash(newpassword, 10);

        user.resetToken = null;
        user.resetTokenExpire = null;

        // Save the updated user in the database, skip validation for required fields
        await user.save({ validateBeforeSave: false });

        res.status(200).json({ message: "Password reset successfully" });
    } catch (err) {
        console.error("Error resetting password:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};