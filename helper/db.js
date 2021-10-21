const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        console.log(`Mongoga Ulandik`)
    }).catch(err => {
        console.log(err)
    })
}