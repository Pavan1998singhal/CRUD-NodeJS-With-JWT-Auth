const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../../models/users/users')
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


router.get('/', verifyToken , async(req, res) => {
    try{
        const { role } = req.user

        if(role !== 'admin'){
            res.json('User Role should be Admin')
        }else{
            try{
                const getAllUsers = await User.find()
                res.json(getAllUsers)
            }catch(err){
                res.json('Error', err)
            }
        }
    }catch(err){
        res.json('Error', err)
    }
})

router.post('/', verifyToken ,async(req, res) => {
    const { role } = req.user

    if(role !== 'admin'){
        res.json('User Role should be Admin')
    }else{
        try{
            const user = new User({
                username: req.body.username,
                password: req.body.password,
                role: req.body.role
            })
            const username = req.body.username

            var query = { username: username}
            const userExist = await User.find(query)

            if(userExist.length >= 1){
                res.json('User already exist')
            }else{
                await user.save()
                res.json('User Added Successfully')
            }
        }catch(err){
            res.json('Error', err)
        }
    }
})

router.patch('/:username', verifyToken, async(req, res) => {
    const { role } = req.user

    if(role !== 'admin'){
        res.json('User Role should be Admin')
    }else{
        try{
            const username = req.params.username

            var query = { username: username}
            const userExist = await User.find(query)

            if(userExist.length >= 1){

                userExist[0].username = req.body.username
                userExist[0].password = req.body.password
                userExist[0].role = req.body.role

                await userExist[0].save()
                res.json('User updated successfully !!')
            }else{
                res.json('User not exist')
            }
        }catch(err){
            res.json('Error '+ err)
        }
    }
})

router.delete('/:username', verifyToken, async(req, res) => {
    const { role } = req.user
    
    if(role !== 'admin'){
        res.json('User Role should be Admin')
    }else{
        try{
            const username = req.params.username

            var query = { username: username}
            const userExist = await User.find(query)

            if(userExist.length >= 1){
                await User.findByIdAndDelete(userExist[0].id)
                res.json('User deleted successfully !!')
            }else{
                res.json('User not exist')
            }
        }catch(err){
            res.json('Error '+ err)
        }
    }
})

module.exports = router