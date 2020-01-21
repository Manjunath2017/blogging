const mongoose = require('mongoose');
var addCategories = new mongoose.Schema({
    categories:{
        type:String,
        trim:true,
        required:true
    }
});

var category = mongoose.model('categoryModel', addCategories,'categories');
module.exports = category;