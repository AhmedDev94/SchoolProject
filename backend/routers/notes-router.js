//importation express module
const express = require("express");

// IMPORT JSON WEBTOKEN module
const jwt = require('jsonwebtoken');

//// Create a new instance of an Express router to handle routes
const router = express.Router();

// Importing models for Course, Note, and User from their respective files
const Course = require("../models/course");
const Note = require("../models/note");
const User = require("../models/user");


//MIDDELWARE TO CHECK REQUEST HEADER TO LOOK FOR JWT TOKEN
function authenticateJWT(req, res, next) {
  const token = req.header('Authorization');
   console.log('Middleware called' , token)

  if (!token) return res.status(401).json({ message: 'Authentication failed' });

  jwt.verify(token, secretKey, (err, user) => {
      if (err) {
          return res.sendStatus(403);
      }

      req.user = user;
      next();
  });
}

// JWT SECRET KEY 
const secretKey = process.env.secretKey;


// add note to a student in a course api 
router.post("/", authenticateJWT, (req, res) => {
    const studentId = req.body.student;
    const courseId = req.body.course;
  
    // Check if a note with the same student and course already exists
    Note.findOne({ student: studentId, course: courseId }, (err, existingNote) => {
      if (err) {
        console.error("Error checking for existing note:", err);
        return res.json({ msg: "error" });
      }
  
      if (existingNote) {
        return res.json({ msg: "Note already exists for this student and course" });
      }
  
      // Create and save the new note
      let note = new Note(req.body);
      note.save((err, doc) => {
        User.findById(studentId).then((student)=>{
          student.notes.push(note);
          student.save();
        })
        if (err) {
          console.error("Error saving note:", err);
          return res.json({ msg: "error" });
        }
        res.json({ msg: "added successfully", note: doc });
      });
    });
  });

  //get all notes api 
  router.get("/",  authenticateJWT, (req, res) => {
    //traitement de la request
    console.log("here into BL : get all notes");
    
    Note.find().then((data) => {
      res.json({ notes: data });
    });
  });

  // delete note by id api 
   router.delete("/:id", authenticateJWT, (req, res) => {
    //traitement de la request
    let id = req.params.id;
    console.log(id);
    Note.deleteOne({ _id: id }).then((data) => {
      console.log("here data after delete ", data);
      data.deletedCount == 1
        ? res.json({ msg: "deleted with success" })
        : res.json({ msg: "Not deleted" });
    });
  });
  
//GET note by student id
  router.get("/student/dashboard/:id", authenticateJWT, (req, res) => {
    //traitement de la request
    let id = req.params.id
    console.log("here into BL : get student notes" , req.params.id );
    
    Note.find({  student : id} ).then((data) => {
      console.log("hello data",data);
      

    
      res.json({ notes: data });
    });
  });

/// Export the router  to make it accessible in other files 
  module.exports = router;