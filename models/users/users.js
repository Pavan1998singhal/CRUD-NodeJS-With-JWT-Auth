const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default: 'reader'
    }
    // we have three type of users ie; admin, member and reader.
})

module.exports = mongoose.model('User', userSchema)