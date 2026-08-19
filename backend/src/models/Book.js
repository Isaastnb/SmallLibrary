const crypto = require("crypto");
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["available", "lent"],
        default: "available"
    },
    borrowerName: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model("Book", bookSchema);