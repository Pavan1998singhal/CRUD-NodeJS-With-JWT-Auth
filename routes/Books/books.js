const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const allBooks = require('../../models/books/books')
const acessTokenSecret = 'youracessTokenSecret'

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if(authHeader){
        const token = authHeader.split(' ')[1]

        jwt.verify(token, acessTokenSecret, (err, user) => {
            if(err){
                res.send(403)
            }else{
                // res.json({
                //     message:'success',
                //     user
                // })
                req.user = user
                next()
            }
        })
    }
}

router.get('/', verifyToken , (req, res) => {
    res.json(allBooks)
})

router.post('/', verifyToken, (req, res) => {

    const { role } = req.user   // req.user has user so; { role } = user.role 

    if(role !== 'admin'){
        res.json('Access Denied')
    }else{
        const book = req.body
        allBooks.push(book)

        res.send('Book Added Successfully')
    }
})

module.exports = router