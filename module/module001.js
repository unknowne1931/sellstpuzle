const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    like : String,
    time : String,
    comments :String,
    name : String
});

module.exports = mongoose.model('Meti_data', LikeSchema)