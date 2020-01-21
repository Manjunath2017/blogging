const mongoose = require("mongoose");
// const getBlogDB = mongoose.model("project"); // exported variable from mongoose Schema model
const getBlogDB = require("../models/posts");
var ObjectId = require("mongoose").Types.ObjectId;
const _ = require("lodash");
const fs = require("fs");
var transporter = require("../auth/nodeMailer");
var transporter = transporter.transporterAuth; // call transporterAuth()
const redis = require("redis");
const client  = redis.createClient();

// .........get...........
var getPostResult = [];
module.exports.postCtrl = async (request, response) => {
  //find by author
  // await getBlock.find({author:'David Villa'})
  var ITEM_PER_PAGE = parseInt(request.query.item);
  // console.log(ITEM_PER_PAGE, "ITEM_PER_PAGE");
  var page = parseInt(request.query.pageNo);

  if (typeof page === "number") {
    // console.log((page - 1) * ITEM_PER_PAGE);
    // console.log("True");
  } else {
    console.log("False");
  }

  await getBlogDB
    .find({})
    .sort({ date: -1 }) //sort by recent data
    .skip((page - 1) * ITEM_PER_PAGE) //no. of page to be skipeed
    .limit(ITEM_PER_PAGE) //number of page to be appear on screen
    .then(data => {
      // console.log(data,noOfProduct);
      // data = [total=noOfProduct, ...data];
      // data = [...data];

      // console.log(data);
      response.status(200).send(data);
    })
    .catch(error => {
      console.log(error);
    });

  // console.log(`No. of products ${noOfProduct}`);
  // console.log(`post data ${getPostResult}`);
};

//...........postBlock.............
module.exports.postBlock = (request, response) => {
  // var body=_.pick(request.body,['title','category','author','body','mainimage','date']);
  // var postBlogData = new getBlogDB(body);

  //working
  // var image=request.files.mainimage;
  // var imageName=Date.now()+request.files.mainimage.name;
  // image.mv('./uploads/'+imageName);
  // console.log(image,'image \n\n' ,imageName ,'imageNmae');

  const postBlogData = new getBlogDB({
    title: request.body.title,
    category: request.body.category,
    author: request.body.author,
    body: request.body.body,
    mainimage: Date.now() + request.files.mainimage.name,
    date: request.body.date
  });

  //     var onj=(Object.keys(request.files).length)
  // console.log(obj);
  if (Object.keys(request.files).length === 1) {
    //it contain file

    postBlogData
      .save()
      .then(data => {
        var ObjectImage = request.files.mainimage; // contain entire file name
        var imageName = postBlogData.mainimage; // call object line no 32 store Data and only image name
        ObjectImage.mv(`${process.cwd()}/client/public/uploads/` + imageName);

        //send mail to user
        transporter
          .sendMail({
            to: "torresmanju94@gmail.com",
            from: "blogger@blog.com",
            subject: "Blog Posted",
            html: "<h1> Your blog was successfully posted! </h1>"
          })
          .catch(error => {
            console.log("error in sending mail", err);
          });
        //.....................

        response.status(200).send(data);
      })
      .catch(error => {
        response.status(500).send({
          message:
            "---server side--- Some error occurred while inserting data" ||
            error.message
        });
      });
  }
};

// .....................find by ID...............
var getPostDetail = [];
module.exports.postDetailCtrl =  (request, response) => {
var id=request.params.id;
  if (!ObjectId.isValid(id)) {
    return response.status(400).send(`ID: ${id} not found`);
  }
  client.get(id, async (error, value)=>{
    if(value){
      // console.log('Serving from Cache!');
      response.send(value)
    }else{
      try{
        const result = await getBlogDB.findById(id);
        // console.log('Serving from mongoDB!');
        client.set(id, JSON.stringify(result));
        response.send(result);
      }catch(error){
        console.log("error----------- \n \n", error); 
      }
    }
  })
  // await getBlogDB
  //   .findById(id)
  //   .then(data => {
  //     client.set(`${id}`, data);
  //     response.status(200).send(data);
  //     getPostDetail = data;
  //   })
  //   .catch(error => {
  //     console.log("error------"); 
  //   });
};

//delete
module.exports.postDelete = async (request, response) => {
  // console.log('remove');
  // getBlogDB.deleteOne({_id:request.params.postId});

  var id = request.params.postId;
  // console.log(id);
  if (!ObjectId.isValid(id)) {
    return response.status(400).send(`Cannot Delete, ID: ${id} not found`);
  }
  console.log("findByIdAndRemove -after middleware", id);
  // await getBlogDB.remove()
  //   .then(result=>{
  //     console.log(result);
  //   });
  var image;
  const imageName = await getBlogDB.find({ '_id': id })
    .select('mainimage -_id')
    .then(result => {
      image = result[0].mainimage;
      // console.log(image, 'result \n\n\n\n ', image);
    })
  // console.log(`${process.cwd()}/client/public/uploads/${image}`);


  const deletedResult = await getBlogDB.deleteComment(id);
  // console.log(deletedResult.deletedCount);
  if (deletedResult.deletedCount >= 0) {
    // console.log(deletedResult.deletedCount);
    await getBlogDB
      // .findByIdAndRemove({ _id: id }) // _id is attribute name // id is from router
      .findByIdAndRemove({ _id: id }) // _id is attribute name in db // id is params.id (URL)
      .then(result => {
        try {
          fs.unlinkSync(`${process.cwd()}/client/public/uploads/${image}`);
          // console.log('Image Deleted!');
        } catch (error) {
          console.log(error.message);
        }
        response.send(result);
        // console.log("deleted-------------------");
      })
      .catch(error => {
        response.send(`error--------------${error}`);
      });
  }
};

//PUT
module.exports.postEdit = (request, response) => {
  const id=request.params.editById
  // console.log("postId", id, "----", request.body);
  if (!ObjectId.isValid(id))
    return response
      .status(400)
      .send(`Manju No record with given id : ${request.params.editById}`);
  //  findByIdAndUpdate(req.params._id,{$set:emp},{new:true},
  getBlogDB
    .findOneAndUpdate(
      { _id: id },
      { $set: request.body },
      { new: true }
    ) // findByIdAndUpdate equivalent findOneAndUpdate The {new: true} option in the findByIdAndUpdate() method is used to return the modified document to the then() function instead of the original.
    .then(result => {
      client.set(id, JSON.stringify(result));
      response.send(result);
      // console.log("result", result);
    })
    .catch(error => {
      console.log("----------------error---in---edit------", error);
    });
};
