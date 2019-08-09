let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type : String,
        trim : true
    },
    firstname : String,
    lastname : String,
    email : {
        type : String,
        trim : true
    },
    password : String,
    isVerified : {
        type : Boolean,
        default : false
    },
    role : {
        type : String,
        default: 'manager'
    },
    city : String,
    token : String,
    resetPassword : String,
    accessExpires : Date
}, { collection : 'users' });

module.exports = mongoose.model('User', userSchema);