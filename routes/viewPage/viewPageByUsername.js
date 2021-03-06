const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../../models/users/users')
const Book = require('../../models/books/books')
const Like = require('../../models/likes/likes')
const Comment = require('../../models/comments/comments')
const Library = require('../../models/library/library')
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
    else if(role !== 'member' && role !== 'reader'){
        res.json('User must be member or reader')
    }else{
        try{
            
            const username = req.params.username
            const userExist = await User.find({ username: username })

            if(userExist.length >= 1){
                const allBooks = await Book.find({ username: { $ne: username }})
                res.json(allBooks)
            }else{
                res.json('This user not exist')
            }
        }catch(err){
            res.json('Error '+ err)
        }
    }
})

router.post('/like/:username', verifyToken, async(req, res) => {

    const { role } = req.user
    const { username } = req.user

    if(username != req.params.username){
        res.json('login user and param user is different')
    }
    else if(role !== 'member' && role !== 'reader'){
        res.json('User must be member or reader')
    }else{
        try{

            const username = req.params.username
            const userExist = await User.find({ username: username })

            if(userExist.length >= 1){
                const bookname = req.body.bookname
                const postedBy = req.body.postedBy

                const query = { username: postedBy, bookname: bookname }
                const bookExist = await Book.find(query)

                if(bookExist.length >= 1){

                    const query = { username: username, bookname: bookname, postedBy: postedBy }
                    const likeExist = await Like.find(query)

                    if(likeExist.length >= 1){
                        res.json('you already like this book')
                    }else{

                        const like = new Like({
                            username: username,
                            bookname: bookname,
                            postedBy: postedBy
                        })

                        await like.save()
                        res.json('You like this book')
                    }

                }else{
                    res.json('book or posted user not exist')
                }

            }else{
                res.json('This user not exist')
            }
        }catch(err){
            res.json('Error '+ err)
        }
    }
})

router.post('/comment/:username', verifyToken, async(req, res) => {

    const { role } = req.user
    const { username } = req.user

    if(username != req.params.username){
        res.json('login user and param user is different')
    }
    else if(role !== 'member' && role !== 'reader'){
        res.json('User must be member or reader')
    }else{
        try{

            const username = req.params.username
            const userExist = await User.find({ username: username })

            if(userExist.length >= 1){
                const bookname = req.body.bookname
                const postedBy = req.body.postedBy
                const message = req.body.message

                const query = { username: postedBy, bookname: bookname } 
                const bookExist = await Book.find(query)

                if(bookExist.length >= 1){
                    
                    const comment = new Comment({
                        username: username,
                        bookname: bookname,
                        postedBy: postedBy,
                        message: message
                    })

                    await comment.save()
                    res.json('comment added successfully')
            
                }else{
                    res.json('book or posted user not exist')
                }

            }else{
                res.json('This user not exist')
            }
        }catch(err){
            res.json('Error '+ err)
        }
    }
})

router.post('/addToLibrary/:username', verifyToken, async(req, res) => {

    const { role } = req.user
    const { username } = req.user

    if(username != req.params.username){
        res.json('login user and param user is different')
    }
    else if(role !== 'member' && role !== 'reader'){
        res.json('User must be member or reader')
    }else{
        try{

            const username = req.params.username
            const userExist = await User.find({ username: username })

            if(userExist.length >= 1){
                const bookname = req.body.bookname
                const postedBy = req.body.postedBy
                const unreadBooks = bookname

                const query = { username: postedBy, bookname: bookname }
                const bookExist = await Book.find(query)

                if(bookExist.length >= 1){
                    
                    const query = { username: username, bookname: bookname, postedBy: postedBy, unreadBooks: bookname }
                    const bookInLibraryExist = await Library.find(query)

                    if(bookInLibraryExist.length >= 1){
                        res.json('book already exist in library')
                    }else{

                        const library = new Library({
                            username: username,
                            bookname: bookname,
                            postedBy: postedBy,
                            unreadBooks: bookname
                        })

                        await library.save()
                        res.json('book added to library')
                    }
                }else{
                    res.json('book or posted user not exist')
                }

            }else{
                res.json('This user not exist')
            }
        }catch(err){
            res.json('Error '+ err)
        }
    }
})

module.exports = router