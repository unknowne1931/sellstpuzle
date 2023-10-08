const mongoose = require('mongoose');

const UserinfoSchema = new mongoose.Schema({
    name : String,
    username :String,
    email : String,
    picture : String,
    role: {
        default: 'user',
        type : String
    }
    
});
 
module.exports = mongoose.model('User_info', UserinfoSchema)