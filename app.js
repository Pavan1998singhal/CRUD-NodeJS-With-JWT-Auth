const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())


// Connection with DB
const connectDB = require('../CRUD_Node_WIth_JWT/Connection/dbConnection')
connectDB.on('open', () => {
    console.log('Connected with DB!!')
})


// Route for LOGIN
const authenticateRouter = require('../CRUD_Node_WIth_JWT/routes/Authentication/authenticate')
app.use('/login', authenticateRouter)


//Route for Users
const usersRouter = require('../CRUD_Node_WIth_JWT/routes/Users/users')
app.use('/users', usersRouter)


//Route for BOOKS
const booksRouter = require('../CRUD_Node_WIth_JWT/routes/Books/books')
app.use('/books', booksRouter)


//Route for ViewPage of Each User
const viewPageRouter = require('../CRUD_Node_WIth_JWT/routes/viewPage/viewPageByUsername')
app.use('/viewPage', viewPageRouter)

app.listen(9000, () => {
    console.log('server started at port 9000')
})