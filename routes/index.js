const express = require('express');
const Book = require('../models/Book');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();



/* GET home page. ASOSIY SAHIFA  */  
router.get('/', async function(req, res, next) {
  const book = await Book.find().populate('category_id');
  console.log(book);
  res.render('index', {
    books: book
  });
});





/* ======   login   ======  */
router.get('/login', async function(req, res, next) {
  res.render('login')
});




/* ======   REGISTER   ======  */
router.get('/register', async function(req, res, next) {
    res.render('register')
});


router.post('/register', async function(req, res, next) {
     const {name, pass, email} = req.body;
     const usersEmail = await User.findOne({email});
     if(usersEmail) {
       return res.redirect('/register')
     }
     const hassPass = await bcrypt.hash(pass, 12);
     const user = await new User({name, password: hassPass, email})
     await user.save();
     res.redirect('/login')
});






module.exports = router;
