const User = require('../models/user');
const { generateToken } = require('../services/auth');

const cookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
};

//signup controller
const handleSignup = async (req, res) => {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });
    return res.status(201).json({ message: 'User created successfully' });
};

//login controller
const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    res.cookie("token", token, cookieOptions);
    return res.status(200).json({ message: 'Login successful' });
};

const handleGetCurrentUser = (req, res) => {
    return res.status(200).json({
        authenticated: true,
        userId: req.userId
    });
};

const handleLogout = (req, res) => {
    res.clearCookie("token", cookieOptions);
    return res.status(200).json({ message: "Logout successful" });
};

module.exports = { handleSignup, handleLogin, handleGetCurrentUser, handleLogout };