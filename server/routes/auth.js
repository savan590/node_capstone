const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config(); // Load environment variables from .env file

// Error handler middleware
const errorHandler = (res, error) => {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
};
router.post('/register', async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body

        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email is already registered' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10)
        const user = new User({ name, email, mobile, password: encryptedPassword });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ user: user.email}, process.env.JWT_SECRET); // Replace 'SECRET_KEY' with your own secret key

        // Return success response
        res.json({ success: true, token, user: email, name: name });
    } catch (error) {
        errorHandler(res, error);
    }
})

//login api
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email })
        if (user) {
            let hasPasswordMatched = await bcrypt.compare(password, user.password)
            if (hasPasswordMatched) {
                const jwttoken = jwt.sign(user.toJSON(), process.env.JWT_SECRET)
                res.json({ success: true, jwttoken, recruiter_name: user.name, user:email });
            } else {
                res.json({
                    status: 'FAILED',
                    message: 'Incorrect credentials! Please try again'
                })
            }
        } else {
            res.json({
                status: 'FAILED',
                message: 'User does not exist'
            })
        }
    } catch (error) {
        errorHandler(res, error);
    }
})

module.exports = router;