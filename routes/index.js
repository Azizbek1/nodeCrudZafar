const express = require('express');
const Book = require('../models/Book');
const router = express.Router();





/* GET home page. ASOSIY SAHIFA  */  
router.get('/', async function(req, res, next) {
  const book = await Book.find();
  res.render('index', {
    books: book
  });
});

module.exports = router;
