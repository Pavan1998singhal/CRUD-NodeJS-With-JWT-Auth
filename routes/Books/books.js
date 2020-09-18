const express = require('express')
const jwt = require('jsonwebtoken')
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


router.get('/:username', verifyToken , async(req, res) => {

    const { role } = req.user

    if(role !== 'member'){
        res.json('Access Denied')
    }else{
        try{

            const username = req.params.username
            const userExist = await User.find({ username: username })

            if(userExist.length >= 1){
                const bookExist = await Book.find({ username: username })

                if(bookExist.length >= 1){
                    res.json(bookExist)
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

    if(role !== 'member'){
        res.json('Access Denied')
    }else{
        try{
            const username = req.params.username
            const bookname = req.body.bookname

            const userExist = await User.find({ username: username })
            if(userExist.length >= 1)
            {
                const query = { bookname: bookname, username: username }
                const bookExist = await Book.find(query)

                if(bookExist.length >= 1){
                    res.json('Book already exist')
                }else{

                    const book = new Book({
                        bookname: req.body.bookname,
                        author: req.body.author,
                        pages: req.body.pages,
                        username: username
                    })

                    await book.save()
                    res.json('Book added successfully')
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

    if(role !== 'member'){
        res.json('Access Denied !!')
    }else{
        try{
            const username = req.params.username
            const userExist = await User.find({ username: username })

            if(userExist.length >= 1){

                const bookname = req.params.bookname
                const query = { bookname: bookname, username: username }
                const bookExist = await Book.find(query)

                if(bookExist.length >= 1){

                    bookExist[0].bookname = req.body.bookname
                    bookExist[0].author = req.body.author
                    bookExist[0].pages = req.body.pages

                    await bookExist[0].save()
                    res.json('Book updated successfully !!')

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

    if(role !== 'member'){
        res.json('Access Denied !!')
    }else{
        try{
            const username = req.params.username
            const userExist = await User.find({ username: username })

            if(userExist.length >= 1){

                const bookname = req.params.bookname
                const query = { bookname: bookname, username: username }
                const bookExist = await Book.find(query)

                if(bookExist.length >= 1){

                    await Book.findByIdAndDelete(bookExist[0].id)
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