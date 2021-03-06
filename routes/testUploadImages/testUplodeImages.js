const express = require('express')
const router = express.Router()
const multer = require('multer')

const TestImage = require('../../models/testingImage/testingImage')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assests/uploads/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const fileFilterImage = (req, file, cb) => {
    
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/pdf' ){
        cb(null, true)
    }else{
        //reject a file
        cb(null, false)
    }

};

const uploadImage = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,   // accepting only upto 5mb
        //file: 1     // accepting only one imahge file
    },
    fileFilter: fileFilterImage
});


router.get('/', async(req,res) =>{
    try{
        const getAllImages = await TestImage.find()
        res.json(getAllImages)
    }catch(err){
        res.json('Error'+ err)
    }
})

router.post('/', uploadImage.single('myFile') , async(req, res) => {
    console.log(req.file)

    // const bookname = req.body.bookname
    // const author = req.body.author  
    // const pages = req.body.pages
    try{
        const testImage = new TestImage({
            // _id: new mongoose.Types.ObjectId(),
            bookname: req.body.bookname,
            author: req.body.author,
            pages: req.body.pages,
            bookImage: req.file.path 
        })
    
        await testImage.save()
        res.json('Upload successfully')

    }catch(err){
        res.json('Error'+ err)
    }

})

module.exports = router