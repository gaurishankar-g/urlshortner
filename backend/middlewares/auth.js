const { verifyToken } = require("../services/auth");


function restrictToLoggedInUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const payload = verifyToken(token);
        req.userId = payload.userId;
        return next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

module.exports = restrictToLoggedInUser;