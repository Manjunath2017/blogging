const mongoose = require('mongoose');
const getBlog = mongoose.model('project'); // exported variable from mongoose Schema model
var ObjectId=require('mongoose').Types.ObjectId;
const _ = require('lodash');

// .........get...........
var getPostResult=[];
module.exports.postCtrl =async (request , response)=>{
    //find by author 
    // await getBlock.find({author:'David Villa'})
    await getBlog.find({}).sort({date:1})
          .then((data)=>{
                response.send(data);
                getPostResult=data;
          })
          .catch((error)=>{
              console.log(error);
          });
// console.log(`post data ${getPostResult}`);
}

//...........postBlock.............
module.exports.postBlock=(request,response)=>{
    // var body=_.pick(request.body,['title','category','author','body','mainimage','date']);
    // var postBlogData = new getBlog(body);
  
    //working
    // var image=request.files.mainimage;
    // var imageName=Date.now()+request.files.mainimage.name;
    // image.mv('./uploads/'+imageName);
    // console.log(image,'image \n\n' ,imageName ,'imageNmae');

    const postBlogData= new getBlog({
        title:request.body.title,
        category:request.body.category,
        author:request.body.author,
        body:request.body.body,
        mainimage:Date.now()+request.files.mainimage.name,
        date:request.body.date
    });    
    // var imageName= postBlogData.mainimage;
    // console.log('request.files.mainimage-------', imageName);
    // console.log('\n \n-----',postBlogData);
        postBlogData.save()
        .then(data=>{
        response
            .send(data)
            .status(200)                
            var ObjectImage=request.files.mainimage; 
                // console.log(ObjectImage);           
            ObjectImage.mv('./uploads/'+Date.now+ObjectImage);
        })
        .catch(error=>{
            response
                .status(500)
                .send({
                    message:"---server side--- Some error occurred while inserting data"|| error.message
                });
        });
    }
 

// .....................find by ID...............
var getPostDetail=[];
module.exports.postDetailCtrl = async (request , response)=>{
    // console.log('hello post Blog',request.params.id);
    // response.send(request.params.id)
    await getBlog.findById(request.params.id)
          .then((data)=>{
                response.send(data);
                getPostDetail=data;
          })
          .catch((error)=>{
              console.log('error' );
          });
}