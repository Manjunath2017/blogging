const mongoose=require('mongoose');
const dotenv = require("dotenv").config();

// warning
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var url = 'mongodb://localhost:27017/nodeblog';
// var url = 'mongodb://localhost:27017/bysMean';
// mongoose.connect(process.env.DB_CONNECTION || url,{ useNewUrlParser: true }, (error)=>{

mongoose.connect(url,{ useNewUrlParser: true }, (error)=>{
    if(!error){
        console.log(' Db connected!!! \n');
    }
});
module.exports=mongoose;