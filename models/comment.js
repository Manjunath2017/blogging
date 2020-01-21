const mongoose = require('mongoose');
var commentSchema=new mongoose.Schema({
    comment_id:{
        type:"String",
        trim:"true",
    },
    email:{
        type:"String",
        trim:"true",
    },
    body:{
        type:"String",
        trim:"true",
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const commentDB = mongoose.model('commentDB', commentSchema, 'comment');
module.exports = commentDB;
// commentDb = expoted
// commentSchema = schema variable name
// comment = DB collection name
