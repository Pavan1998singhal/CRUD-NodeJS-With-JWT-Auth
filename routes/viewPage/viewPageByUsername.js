const express = require('express')
const jwt = require('jsonwebtoken')
const { route } = require('../Books/books')
const router = express.Router()

const User = require('../../models/users/users')
const Book = require('../../models/books/books')
const acessTokenSecret = 'youracessTokenSecret'


const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if(authHeader){
        const token = authHeader.split(' ')[1]

        jwt.verify(token, acessTokenSecret, (err, user) => {
            if(err){
                res.send(403)
            }else{
                req.user = user
                next()
            }
        })
    }
}

router.get('/:username', verifyToken, async(req, res) => {

    const { role } = req.user
    const { username } = req.user

    if(username != req.params.username){
        res.json('login user and param user is different')
    }

    if(role !== 'member' && role !== 'reader'){
        res.json('User must be member or reader')
    }else{
        try{
            
            const username = req.params.username
            const userExist = await User.find({ username: username })

            if(userExist.length >= 1){
                const allBooks = await Book.find()
                res.json(allBooks)
            }else{
                res.json('This user not exist')
            }
        }catch(err){
            res.json('Error '+ err)
        }
    }
})

module.exports = router