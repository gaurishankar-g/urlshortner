const mongoose = require("mongoose");

async function connectDB(dbUrl) {
    return mongoose.connect(dbUrl)
}

module.exports = {connectDB};