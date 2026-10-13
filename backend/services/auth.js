const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured. Add it to backend/.env.");
}

function generateToken(userId) {
    return jwt.sign({ userId: userId.toString() }, jwtSecret, {
        expiresIn: "1d",
    });
}

function verifyToken(token) {
    return jwt.verify(token, jwtSecret);
}

module.exports = {
    generateToken,
    verifyToken,
};
