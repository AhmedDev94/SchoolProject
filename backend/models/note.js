const mongoose = require("mongoose");

// create note schema (structure )
const noteSchema = mongoose.Schema({

  note: String,

  evaluation: String,
  
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

// AFFECT MODEL NAME TO SCHEMA
const note = mongoose.model("Note", noteSchema);
//// Export the router  to make it accessible in other files 
module.exports = note;
