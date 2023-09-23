// import mongoose module
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
// create user schema (structure )
const userSchema = mongoose.Schema({
    firstName : String ,
    lastName : String,
    email :{ type : String, unique : true},
    pwd : {type : String ,},
    tel :  {type :String ,  unique : true},
    role : String ,
    speciality : String ,
    studentTel : [String] , 
    status : String , 
    avatar : String ,
    adresse : String ,
    pdfFile : String ,
    courses :  [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
      ],
      notes :  [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Note",
        },
      ],
});
userSchema.plugin(uniqueValidator);
// AFFECT MODEL NAME TO SCHEMA 
const user = mongoose.model("User", userSchema);
 // export user
 module.exports = user ;