const mongoose = require('mongoose');
const getCommentDB = mongoose.model('commentDB');
const _ =require('lodash');
var ObjectId=require('mongoose').Types.ObjectId;
module.exports.getComment=(request, response)=>{
    console.log('comment', request.params.id);
    getCommentDB.find({"comment_id":request.params.id})
        .then(result=>{
            response.send(result);
            // console.log(result);
        })
        .catch(error=>{
            console.log("error------------",error);
        })
}

module.exports.postComment=(request, response)=>{
    // console.log('comment', request.body.comment_id);
    var bodyData = _.pick(request.body,['comment_id', 'email', 'body', 'date']);
    bodyData=new getCommentDB(bodyData);
    // console.log(bodyData);
    bodyData
        .save()
        .then(result=>{
            response.send(result);
        })
        .catch(error=>{
            console.log("error------------",error);
        })
}