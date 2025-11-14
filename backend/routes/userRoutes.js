const express = require('express');
const router = express.Router();
const User = require('./../models/User.js');
const sendEmail = require('../utils/sendEmails.js');

// Register route
router.post('/signup', async function (req, res) {
    try {
        const data = req.body;
        const { gmail } = data;

        // Step 1️⃣: Check if user already exists
        const existingUser = await User.findOne({ gmail });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            });
        }

        // Step 2️⃣: Create new user
        const newUser = new User(data);
        const response = await newUser.save();

        console.log("Data Saved");
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: response
        });

    } catch (error) {
        console.error(error);

        // Step 3️⃣: Handle MongoDB duplicate key error as a fallback
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// login route
router.post('/login', async (req, res) => {
    try {
        // extract gmail and password from request body
        const { gmail, password } = req.body;

        // find user by gmail
        const user = await User.findOne({ gmail: gmail });

        // if user does not exist or password does not match, return error
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        if (!(await user.comparePassword(password))) return res.status(401).json({ error: 'Invalid password' });

        res.json({
            success: true,
            message: "User registered successfully",
            user: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// otp generate route
router.post('/generateotp', async (req, res) => {
    try {
        // extract email from request body
        const { gmail } = req.body;

        // find the user by email
        const user = await User.findOne({ gmail: gmail });

        // if user does not exist
        if (!user) {
            return res.status(401).json({ error: 'Invalid user' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes;
        await user.save();

        await sendEmail(user.gmail, "Password Reset OTP", `Your OTP is ${otp}`);

        res.json({
            success: true,
            message: "OTP sent successfully",
            user: user
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

router.post('/passwordreset', async (req, res) => {
    const { gmail, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ gmail: gmail });
        if (!user) return res.status(400).json({ msg: "User not found" });

        if (user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ msg: "Invalid or expired OTP" });
        }

        user.password = newPassword;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.json({
            success: true,
            message: "Password reset successfully",
            user: user
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

module.exports = router;