// import mongoose module
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
// create course schema (structure )
const courseSchema = mongoose.Schema({
  name: { type: String, unique: true },
  description: String,
  duration: String,
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
courseSchema.plugin(uniqueValidator);
// AFFECT MODEL NAME TO SCHEMA
const course = mongoose.model("Course", courseSchema);
// export course
module.exports = course;
