const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
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
    message:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Comment', commentSchema)