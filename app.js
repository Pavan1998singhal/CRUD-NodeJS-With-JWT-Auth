const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

const authenticateRouter = require('../CRUD_Node_WIth_JWT/routes/Authentication/authenticate')
app.use('/login', authenticateRouter)

const booksRouter = require('../CRUD_Node_WIth_JWT/routes/Books/books')
app.use('/books', booksRouter)

app.listen(9000, () => {
    console.log('server started at port 9000')
})