const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const allUsers = require('../../models/users/users')
const acessTokenSecret = 'youracessTokenSecret'

router.post('/', (req, res) => {
    const { username, password } = req.body

    const user = allUsers.find(u => {
        return u.username === username && u.password === password
    })

    if(user){
        jwt.sign({
            username: user.username,
            role: user.role
        }, acessTokenSecret , (err, accessToken) => {
            res.json({
                accessToken
            })
        })
    }else{
        res.send('Username and Password not match')
    }
})


module.exports = router
