const express = require('express');
const router = express.Router();
const restrictToLoggedInUser = require("../middlewares/auth");
const { handleSignup, handleLogin, handleGetCurrentUser, handleLogout } = require('../controllers/user');
//signup route
router.post('/signup', handleSignup);

router.post('/login', handleLogin);
router.get('/me', restrictToLoggedInUser, handleGetCurrentUser);
router.post('/logout', handleLogout);

module.exports = router;