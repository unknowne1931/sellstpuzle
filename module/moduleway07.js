const mongoose = require('mongoose');

const data07Schema = new mongoose.Schema({
    qno: Number,
    Question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    answer: String
});

module.exports = mongoose.model('Data07', data07Schema)