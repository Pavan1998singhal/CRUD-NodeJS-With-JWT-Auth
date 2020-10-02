const express = require('express')
const router = express.Router()
const multer = require('multer')

const TestPdf = require('../../models/testingPdf/testingPdf')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assests/uploads/pdf');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const fileFilterPdf = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' ){
        cb(null, true)
    }else{
        //reject a file
        cb(null, false)
    }

};

const uploadPdf = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // accepting only upto 5mb
        files: 1        // for accepting only one pdf file
    },
    fileFilter: fileFilterPdf
});

// router.get('/', async(req,res) =>{
//     try{
//         const getAllImages = await TestImage.find()
//         res.json(getAllImages)
//     }catch(err){
//         res.json('Error'+ err)
//     }
// })

router.post('/', uploadPdf.any('myFile'), async(req, res) => {
    console.log(req.files)

    const pdf = req.files[0]
    console.log(' hello world ', pdf)
    // console.log(req.files.length)

    try{
        const testPdf = new TestPdf({
            // _id: new mongoose.Types.ObjectId(),
            bookname: req.body.bookname,
            author: req.body.author,
            pages: req.body.pages,
            bookPdf: pdf.path 
        })
    
        await testPdf.save()
        res.json('Upload successfully')

    }catch(err){
        res.json('Error'+ err)
    }

})

module.exports = router