const mongoose = require("mongoose");
const commentModel = require("./comment");
var postSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    // required: true,
    trim: true
  },
  author: {
    type: String,
    trim: true
  },
  body: {
    type: String,
    // required:true,
    trim: true
  },
  mainimage: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
//middleware, delete comments of particular post
// postSchema.pre('remove', async function(next) {
//   await console.log("commentModel"+ "pre Middleware!");
//   next();
// });
//"find" is the keyWord, we can add "remove, save" too insted
postSchema.pre("find", function(next) {
  //working
  // console.log("Hello middleware");
  next();
});

//statics, can create own function (deleteComment)
postSchema.statics.deleteComment = async id => {
  //working
  // console.log("remove middleware");
  // const particularPost = this;
  const deletedResult = await commentModel
    .deleteMany({ comment_id: id })
    return deletedResult;
};

// project to export
var postDB = mongoose.model("posts", postSchema); //registered schema
                           //posts is a collection Name
module.exports = postDB;
