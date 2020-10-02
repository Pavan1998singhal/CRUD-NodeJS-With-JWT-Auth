const mongoose = require('mongoose')

const testbookSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    bookDetail:[
        {
            bookname:{
                type:String,
                required: true
            },
            author:{
                type:String,
                required:true
            },
            pages:{
                type:Number,
                required:true,
                default:100
            }
        }
    ]
})

module.exports = mongoose.model('testBook', testbookSchema)