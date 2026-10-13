const { getUser } = require("../services/auth");


async function restrictToLoggedInUser(req, res, next) {
    const userUid = req.cookies.sessionId;
    if (!userUid) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const userId = getUser(userUid);
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    req.userId = userId;
    next();
}   

module.exports = restrictToLoggedInUser;