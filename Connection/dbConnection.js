const mongoose = require('mongoose')

const url = 'mongodb://localhost/BookAppDB'

mongoose.connect(url, {useNewUrlParser:true})

const con = mongoose.connection

// con.on('open', ()=> {
//     console.log('connected with DB!!')
// })

module.exports = con