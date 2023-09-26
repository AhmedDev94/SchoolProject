//importation express module
const express = require("express");

//// Create a new instance of an Express router to handle routes
const router = express.Router();

// IMPORT JSON WEBTOKEN module
const jwt = require('jsonwebtoken');

//introduction des modeles du DB
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

//  get all courses api
  router.get("/",authenticateJWT, (req, res) => {
    //traitement de la request
    console.log("here into BL : get all courses");
    Course.find().populate("teacher").populate("students").then((data) => {
      res.json({ courses: data });
    });
  });

// get course by id api 
  router.get("/:id",authenticateJWT, (req, res) => {
    //traitement de la request
    console.log("here into BL : get course by id ");
    let id = req.params.id;
    Course.findOne({ _id: id }).then((data) => {
      res.json({ course: data });
    });
  });

// get course by teacher api 
  router.get("/teacher/:id",authenticateJWT,(req, res) => {
    //traitement de la request
    console.log("here into BL : get teacher courses by id " , req.params.id );
    let id = req.params.id;
    Course.find({ teacher : id }).then((data) => {
      console.log("here data" , data)
      res.json({ courses: data });
    });
  });

// update course api 
  router.put("/",authenticateJWT,(req, res) => {
    //traitement de la request
    console.log("here in BL : update Course");
    let newCourse = req.body;
    Course.updateOne({ _id: newCourse._id }, newCourse).then((data) => {
      console.log("here data after update", data);
      data.nModified == 1
        ? res.json({ msg: "updated with success" })
        : res.json({ msg: "Not updated" });
    });
    
  });

// delete course by id api 
  router.delete("/:id",authenticateJWT, (req, res) => {
    //traitement de la request
    let id = req.params.id;
    Course.deleteOne({ _id: id }).then((data) => {
      console.log("here data after delete ", data);
      data.deletedCount == 1
        ? res.json({ msg: "deleted with success" })
        : res.json({ msg: "Not deleted" });
    });
  });

// add course api 
  router.post("/",authenticateJWT, (req, res) => {
    //traitement de la request
  console.log("here into BL : add course", req.body);
  let course = new Course(req.body);
  course.save((err, doc) => {
    User.findById(course.teacher).then((user)=>{
      user.courses.push(course._id) ;
      user.save()
    })
    console.log("here err", err);
    console.log("here doc", doc);
    err ? res.json({ msg: "error" }) : res.json({ msg: "added successfully" });
  });
});

//affect a course to a student api 
router.put("/:id",authenticateJWT, (req, res) => {
  //traitement de la request
  console.log("here into BL : update course", req.params.id);
try {
  User.findById(req.params.id).then((student) => {
  if (!student) {
  return res.status(404).json({ msg: "student not found" });
  }
  let newCourse = req.body;
  newCourse.students.push(req.params.id);
  Course.updateOne({ _id: newCourse._id }, newCourse).then((data) => {
    console.log("here data after update", data);
    student.courses.push(newCourse);
    student.save();
    data.nModified == 1
      ? res.json({ msg: "updated with success" })
      : res.json({ msg: "Not updated" });
  });
  });
  } catch (error) {
  res
  .status(500)
  .json({ msg: "Error updating course", error: error.msg });
  }
  });
  
// get all students of a certain course api 
  router.get("/:courseID/students",authenticateJWT, (req, res) => {
    try {
    Course.findById(req.params.courseID)
    .populate("students")
    .then((course) => {
    if (!course) {
    return res.status(404).json({ message: "Course not found" });
    }
    console.log("Course students", course.students);
    res.json({ courseStudents: course.students });
    });
    } catch (error) {
    res
    .status(500)
    .json({ message: "Error retrieving students", error: error.message });
    }
    });

//// Export the router  to make it accessible in other files 
 module.exports = router;