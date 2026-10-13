const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitHistory: [
        {
            timestamp: {
                type: String,
                required: true
            }
        }
    ]

}, {
    timestamps: true
});

const URL = mongoose.model('URL',urlSchema);

module.exports = URL;