const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setUser, getUser, deleteUser } = require('../services/auth');

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

    const sessionId = uuidv4();
    setUser(sessionId, user._id); 
    res.cookie('sessionId', sessionId);    
    return res.status(200).json({ message: 'Login successful' });
};

const handleGetCurrentUser = (req, res) => {
    return res.status(200).json({
        authenticated: true,
        userId: req.userId
    });
};

const handleLogout = (req, res) => {
    const sessionId = req.cookies.sessionId;
    if (sessionId) {
        deleteUser(sessionId);
    }

    res.clearCookie("sessionId");
    return res.status(200).json({ message: "Logout successful" });
};

module.exports = { handleSignup, handleLogin, handleGetCurrentUser, handleLogout };