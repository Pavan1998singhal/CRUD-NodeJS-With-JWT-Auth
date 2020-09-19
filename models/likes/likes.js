const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
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
    }
})

module.exports = mongoose.model('Like', likeSchema)