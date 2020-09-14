// const users = [
//     {
//         username: 'pavan',
//         password: '123',
//         role: 'admin'
//     },
//     {
//         username: 'singhal',
//         password: '456',
//         role: 'admin'
//     },
//     {
//         username: 'kushwah',
//         password: '234',
//         role: 'member'
//     }
// ]

// module.exports = users


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
    // we have three type of user ie; admin, member and reader.
})

module.exports = mongoose.model('User', userSchema)