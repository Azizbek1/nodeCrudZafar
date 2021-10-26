const express = require('express');
const router = express.Router();
const multer = require('multer');
const Book = require('../models/Book');

/* GET home page. */
router.get('/add', function(req, res, next) {
  res.render('book/book-add');
});



/* UPLOADS IMAGES */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null,  `${file.fieldname}_${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({storage}).single('image')

router.post('/add',  upload, async (req, res) => {
      const book = await new Book({
        name:req.body.name,
        number:req.body.number,
        email:req.body.email,
        price:req.body.price,
        image:req.file.filename,
      })
      await book.save(err => {
        if(err) {
          console.log(err);
        }
        else{
          res.redirect('/')
        }
      })
})




module.exports = router;
