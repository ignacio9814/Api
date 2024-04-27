const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;