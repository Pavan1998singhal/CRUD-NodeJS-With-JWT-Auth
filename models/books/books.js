// const books = [
//     {
//         "author": "KLP Mishra",
//         "country": "India",
//         "language": "English",
//         "pages": 300,
//         "title": "Chemistry Book",
//         "year": 1998
//     },
//     {
//         "author": "M - 1",
//         "country": "India",
//         "language": "English",
//         "pages": 280,
//         "title": "Math Book",
//         "year": 1959
//     },
//     {
//         "author": "How to Crack Coding Interview",
//         "country": "US",
//         "language": "English",
//         "pages": 380,
//         "title": "Algo Book",
//         "year": 1999
//     }
// ]

const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
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
    },
    username:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Book', bookSchema)