const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postCtrl');
const categoryCtrl=require('../controllers/addCategory');
const commentCtrl=require('../controllers/comment');

router.get('/post', postCtrl.postCtrl);
router.get('/post/detail/:id', postCtrl.postDetailCtrl);

//localhost:5000/post
router.post('/post', postCtrl.postBlock);
router.delete('/post/:postId', postCtrl.postDelete);//delete
router.put('/post/:editById', postCtrl.postEdit);//delete


//localhost:5000/category
router.post('/category', categoryCtrl.addCategory);
router.get('/category', categoryCtrl.getCategory);

router.get('/comment/:id', commentCtrl.getComment);
router.post('/comment/', commentCtrl.postComment);


// router.post('/post',emp.insertEmp);
module.exports=router;