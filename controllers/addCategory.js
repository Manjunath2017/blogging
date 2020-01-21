const mongoose = require("mongoose");
const _ = require("lodash");
// const categoryModel = mongoose.model("categoryModel");
const categoryModel = require('../models/category');
var objectId = require("mongoose").Types.ObjectId;

module.exports.addCategory = (request, response) => {
  // console.log('Add Category!!!');
  var body = _.pick(request.body, ["categories"]);
  var categoryData = new categoryModel(body);
  console.log(categoryData);
  // console.log('category data', categoryData);
  categoryData
    .save()
    .then(data => {
      response.send(data).status(200);
      console.log(data);
    })
    .catch(error => {
      response.status(500).send({
        message:
          "----Some Error occured while inserting Category!!" || error.message
      });
    });
};

module.exports.getCategory = (request, response) => {
  categoryModel
    .find({}, { categories: 1, _id: 1 })
    .then(result => {
      response.send(result).status(200);
      // console.log(result);
    })
    .catch(error => {
      console.log("error While fetching category data", error);
    });
};
