const express = require('express');
const router = express.Router();
const multer = require('multer');
const Book = require('../models/Book');
const fs = require('fs');
const Category = require('../models/Category');

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




/* GET home page. */
router.get('/add', async function(req, res, next) {
  const category = await Category.find();
  res.render('book/book-add', {
    category
  });
});



/* ADD BOOK */
router.post('/add',  upload, async (req, res) => {
      console.log(req.body.category)
      const book = await new Book({
        name:req.body.name,
        number:req.body.number,
        email:req.body.email,
        price:req.body.price,
        image:req.file.filename,
        category_id: req.body.category
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



/* EDIT BOOK */
router.get('/edit/:id', async (req, res, next) => {
    const id = req.params.id;
    Book.findById(id, (err, book) => {
      if(err)
         console.log(err);
      else{
         if(book == null) {
           res.redirect('/');
         }else{
           res.render('book/book-edit', {
               book
           })
         }
      }   
    })
})

/* ================   EDIT POST    ================ */
router.post('/update/:id', upload, async (req, res) => {
   const id = req.params.id
   let new_images = '';
   if(req.file){
      new_images = req.file.filename
      try{
        fs.unlinkSync(`./uploads/${req.body.old_image}`)
      }catch(err){
        console.log(err)
      }
   }
   else{
    new_images = req.body.old_image
   }
   await Book.findByIdAndUpdate(id, {
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
    price: req.body.price,
    image: new_images
   }, (err, data) => {
      if(err) 
       console.log(err)
       else{
         res.redirect('/')
       }
   })
})


/* ================  DELETE    ================ */
router.get('/delete/:id', async (req, res) => {
  const id = req.params.id
  await Book.findByIdAndRemove(id, (err, data) => {
    if(data.image != '') {
       try{
        fs.unlinkSync(`./uploads/${data.image}`)
       } 
       catch(err) {
         console.log(err);
       }
    }
    if(err) {
      console.log(err)
    }
    else{
      res.redirect('/')
    }
  })
})

module.exports = router;
