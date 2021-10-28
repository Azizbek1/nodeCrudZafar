const express = require('express');
const router = express.Router();
const Category = require('../models/Category');



/* GET home page. */
router.get('/add', function(req, res, next) {
  res.render('category/categ-add');
});



/* GET home page. */
router.post('/add', async function(req, res, next) {
    const categ = await new Category({name: req.body.name})
    await categ.save(err => {
      if(err) {
        console.log(err);
      }
      else{
        res.redirect('/')
      }
  })
});



module.exports = router;
