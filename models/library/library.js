const mongoose = require('mongoose')

const librarySchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    bookname:{
        type:String,
        required:true
    },
    postedBy:{
        type:String,
        required:true
    },
    unreadBooks:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Library', librarySchema)