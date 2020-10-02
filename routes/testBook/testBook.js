const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../../models/users/users')
const testBook = require('../../models/testingBook/testingBook')
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


router.get('/:username', verifyToken , async(req, res) => {

    const { role } = req.user
    const { username } = req.user

    if(username != req.params.username){
        res.json('login user and param user is different')
    }
    else if(role !== 'member' ){
        res.json('User Role should be member')
    }else{
        try{

            const username = req.params.username
            const userExist = await User.find({ username: username })

            if(userExist.length >= 1){
                const bookExist = await testBook.find({ username: username })

                if(bookExist.length >= 1){
                    res.json(bookExist[0].bookDetail)
                }else{
                    res.json('No book exist')
                }
            }else{
                res.json('This user not exist')
            }
        }catch(err){
            res.json('Error '+ err)
        }
    }
})

router.post('/:username', verifyToken, async(req, res) => {

    const { role } = req.user     // req.user has user so; { role } = user.role 
    const { username } = req.user

    if(username != req.params.username){
        res.json('login user and param user is different')
    }
    else if(role !== 'member'){
        res.json('User Role should be member')
    }else{
        try{
            const username = req.params.username
            const bookname = req.body.bookname

            const userExist = await User.find({ username: username })
            if(userExist.length >= 1)
            {
                const query = { username: username, bookDetail: { $elemMatch: { bookname: bookname } } }
                const bookExist = await testBook.find(query)

                if(bookExist.length >= 1){
                    res.json('Book already exist')
                }else{
                    var bookInfo = { bookname: bookname, author: req.body.author, pages: req.body.pages }
                    try{
                        
                        await testBook.findOneAndUpdate(
                            { username: username },
                            { $push: { bookDetail: bookInfo } },
                            { upsert: true }
                        ).exec();
                        res.json('Added successfully')
                    }catch(err){
                        res.json('Error '+ err)
                    }
                }
            }else{
                res.json('This user not exist')
            }
        }catch(err){
            res.json('Error '+ err)
        }
    }
})

router.patch('/:username/:bookname', verifyToken, async(req, res) => {

    const { role } = req.user
    const { username } = req.user

    if(username != req.params.username){
        res.json('login user and param user is different')
    }
    else if(role !== 'member'){
        res.json('User Role should be member')
    }else{
        try{
            const username = req.params.username
            const userExist = await User.find({ username: username })

            if(userExist.length >= 1){

                const bookname = req.params.bookname
                const query = { username: username, bookDetail: { $elemMatch: { bookname: bookname } } }
                const bookExist = await testBook.find(query)

                if(bookExist.length >= 1){

                    var bookInfo = { bookname: req.body.bookname, author: req.body.author, pages: req.body.pages }
                    await testBook.update(
                        {
                            username: username,
                            bookDetail: { $elemMatch: { bookname: bookname } }
                        },
                        { $set: { "bookDetail.$.bookname": bookInfo.bookname , "bookDetail.$.author": bookInfo.author, "bookDetail.$.pages": bookInfo.pages} }
                    )

                    res.json('Book updated successfully!!')

                }else{
                    res.json('Book not exist')
                }
            }else{
                res.json('User not exist')
            }
        }catch(err){
            res.send('Error'+ err)
        }
    }
})

router.delete('/:username/:bookname', verifyToken, async(req, res) => {

    const { role } = req.user
    const { username } = req.user

    if(username != req.params.username){
        res.json('login user and param user is different')
    }
    else if(role !== 'member'){
        res.json('User Role should be member')
    }else{
        try{
            const username = req.params.username
            const userExist = await User.find({ username: username })

            if(userExist.length >= 1){

                const bookname = req.params.bookname
                const query = { username: username, bookDetail: { $elemMatch: { bookname: bookname } } }
                const bookExist = await testBook.find(query)

                if(bookExist.length >= 1){

                    await testBook.update(
                        {
                            username: username
                        },
                        { $pull: { "bookDetail": { bookname: bookname } } }
                    )
                    res.json('Book deleted successfully !!')

                }else{
                    res.json('Book not exist')
                }
            }else{
                res.json('User not exist')
            }
        }catch(err){
            res.send('Error'+ err)
        }
    }
})

module.exports = router