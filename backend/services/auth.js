const sessionIdtoUserIdMap = new Map();

function setUser(id, userId) {
    sessionIdtoUserIdMap.set(id, userId);
}

function getUser(id) {
    return sessionIdtoUserIdMap.get(id);
}

function deleteUser(id) {
    sessionIdtoUserIdMap.delete(id);
}

module.exports = {
    setUser,
    getUser,
    deleteUser
};