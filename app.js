const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

// make upload folder publicly so that it is accessible or get
// app.use('/assests/uploads' ,express.static('assests/uploads'))


// make images folder publicly so that it is accessible or get
app.use('/assests/uploads/images' ,express.static('assests/uploads/images'))

// make pdf folder publicly so that it is accessible or get
app.use('/assests/uploads/pdf' ,express.static('assests/uploads/pdf'))



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

    
//Route for ViewPage of Each User and like, comment, add to library option should at viewPage
const viewPageRouter = require('../CRUD_Node_WIth_JWT/routes/viewPage/viewPageByUsername')
app.use('/viewPage', viewPageRouter)


//Route for storing of array of object of books in DB  --> Testing Purpose
const testbooksRouter = require('../CRUD_Node_WIth_JWT/routes/testBook/testBook')
app.use('/testbooks', testbooksRouter)


//Route for uploading images in DB  --> Testing Purpose
const uploadImage = require('../CRUD_Node_WIth_JWT/routes/testUploadImages/testUplodeImages')
app.use('/upload/image', uploadImage)


//Route for uploading pdf in DB  --> Testing Purpose
const uploadPdf = require('../CRUD_Node_WIth_JWT/routes/testUploadPdf/testUploadPdf')
app.use('/upload/pdf', uploadPdf)


app.listen(9000, () => {
    console.log('server started at port 9000')
})