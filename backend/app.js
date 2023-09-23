// IMPORT EXPRESS MODULE
const express = require("express");

const nodemailer = require('nodemailer')

//IMPORT BODY PARSER MODULE
const bodyParser = require("body-parser");
//import mongoose module
const mongoose = require("mongoose");

// import bcrypt module
const bcrypt = require("bcrypt");

//import multer module
const multer = require("multer");

// import path module
const path = require("path");

// import axios module
const axios = require("axios");

// IMPORT JSON WEBTOKEN module
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: './credentials.env' });


// import express session module
const session = require('express-session');

// CONNECT EXPRESS APP WITH DB VIA MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/projetDB");




// CREATE EXPRESS APPLICATION ,
const app = express();

// /SEND JSON RESPONSES
app.use(bodyParser.json());
// GET OBJ FROM REQUEST
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});

const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'application/pdf': 'pdf',
 }

 const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
  const isValid = MIME_TYPE[file.mimetype];
  let error = new Error("Mime type is invalid");
  if (isValid) {
  error = null;
  }
  cb(null, 'backend/images')
  },
  filename: (req, file, cb) => {
  const name = file.originalname.toLowerCase().split(' ').join('-');
  const extension = MIME_TYPE[file.mimetype];
  const imgName = name + '-' + Date.now() + '-crococoder-' + '.' + 
 extension;
  cb(null, imgName);
  }
 });
const secretKey = 'Croco2023Venus';
app.use
(session({
secret: secretKey,
}));

//models importation

const Course = require("./models/course");
const Note = require("./models/note");
const User = require("./models/user");



  app.post("/users/login", (req, res) => {
    let user ;
    console.log("here into BL : login", req.body);
    User.findOne({ tel: req.body.tel }).then((doc) => {
      console.log("here doc after searching by tel" , doc);
      if (!doc) {
        res.json({msg :"please check your tel"})
      }
      else {
        user=doc ;
        return bcrypt.compare(req.body.pwd , doc.pwd)
      }
    }).then((pwdResult)=> {console.log("here pwdResult" , pwdResult)
    if (!pwdResult) {
      res.json({msg :"please check your password"})
    }
     if(user.status =='nok'){
      res.json({msg :"please wait for validation"})
     }
    else{
      let userToSend = {
         id : user._id ,
         fName : user.firstName , 
         lName : user.lastName,
         role : user.role};
         console.log("user to send" ,userToSend)
      const token = jwt.sign(userToSend, secretKey, { expiresIn:
          '1h' });
      res.json({result : token , msg : "success"})
    }})
  
  });

  // app.post("/users/signup", multer({ storage: storage }).single('img'), (req, res) => {
  //   console.log("here into BL : signup", req.body);
  //   bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
  //     console.log("here crypted pwd", cryptedPwd);
  //     req.body.pwd = cryptedPwd;
  //     if(req.file){
  //      if(req.body.role == "student"){
  //       req.body.avatar = "http://localhost:3002/images/" + req.file.filename;
  //      }
  //       else {req.body.pdfFile = "http://localhost:3002/images/" + req.file.filename;} 
  //     }
  //     if(req.body.role=='parent'){
  //       User.findOne({ $and: [{ tel: req.body.studentTel }, { role: 'student' }] }).then((doc) => {
  //         console.log("here 2nd doc after searching by studentTel" , doc);
  //         if (!doc) {
  //           res.json({msg :"please check your student tel"})
  //         }
  //       })
  //     }
  //     let user = new User(req.body);
  //     user.save((err, doc) => {
  //       console.log("here error", err);
  //       console.log("here doc", doc);
  //       if (err) {
  //         if (err.errors.email) {
  //           // msg = 0 c a d email exist
  //           res.json({ msg: "0" });
  //         }
  //       }
  //       else {
  //         res.json({ msg: "success" });
  //       }
  //     });
  //   });
  // }); 
  app.post("/users/signup", multer({ storage: storage }).single('img'), (req, res) => {
    console.log("here into BL : signup", req.body);
    bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
        console.log("here crypted pwd", cryptedPwd);
        req.body.pwd = cryptedPwd;
        if (req.file) {
            if (req.body.role == "student") {
                req.body.avatar = "http://localhost:3002/images/" + req.file.filename;
            } else {
                req.body.pdfFile = "http://localhost:3002/images/" + req.file.filename;
            }
        }

        if (req.body.role == 'parent') {
          console.log(req.body.studentTel);
          let studentTel =  req.body.studentTel;
          console.log("jjjjj" ,studentTel);
            User.find({ tel:{ $in: studentTel} }, { role: 'student' }).then((doc) => {
                console.log("here 2nd doc after searching by studentTel", doc);
                console.log("doc length",doc.length);
                if (!doc || doc.length !== studentTel.length) {
                    res.json({ msg: "please check your student tel" });
                } else {
                    let user = new User(req.body);
                    user.save((err, doc) => {
                        console.log("here error", err);
                        console.log("here doc", doc);
                        if (err) {
                            if (err.errors.email) {
                                res.json({ msg: "0" });
                            }
                        } else {
                            res.json({ msg: "success" });
                        }
                    });
                }
            });
        } else {
            let user = new User(req.body);
            user.save((err, doc) => {
                console.log("here error", err);
                console.log("here doc", doc);
                if (err) {
                    if (err.errors.email) {
                        res.json({ msg: "0" });
                    }
                } else {
                    res.json({ msg: "success" });
                }
            });
        }
    });
});

  app.get("/courses", (req, res) => {
    //traitement de la request
    console.log("here into BL : get all courses");
    
    Course.find().populate("teacher").populate("students").then((data) => {
      res.json({ courses: data });
    });
  });
  app.get("/courses/:id", (req, res) => {
    //traitement de la request
    console.log("here into BL : get course by id ");
    let id = req.params.id;
    Course.findOne({ _id: id }).then((data) => {
      res.json({ course: data });
    });
  });
 
  app.get("/courses/teacher/:id", (req, res) => {
    //traitement de la request
    console.log("here into BL : get teacher courses by id " , req.params.id );
    let id = req.params.id;
    Course.find({ teacher : id }).then((data) => {
      console.log("here data" , data)
      res.json({ courses: data });
    });
  });


  app.get("/users/teachers", (req, res) => {
    //traitement de la request
     
    User.find({role : "teacher"}).populate("courses").then((data) => {
      console.log("here into BL get all teachers" , data);
      res.json({ teachers: data });
    });
    
  });
  app.get("/users/students", (req, res) => {
    //traitement de la request
    console.log("here into BL : get all students");
    User.find({role : "student"}).populate("courses").then((data) => {
      console.log("here into BL get all students" , data);
      res.json({ students: data });
    });
    
  });

  app.get("/users/:id", (req, res) => {
    //traitement de la request
    console.log("here into BL : get user by id ");
    let id = req.params.id;
    User.findOne({ _id: id }).then((data) => {
      res.json({ user: data });
    });
   
    
  });

  app.put("/courses", (req, res) => {
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
  app.put("/users", (req, res) => {
    //traitement de la request
    console.log("here in BL : update Course");
    let newUser = req.body;
    User.updateOne({ _id: newUser._id }, newUser).then((data) => {
      console.log("here data after update", data);
      data.nModified == 1
        ? res.json({ msg: "updated with success" })
        : res.json({ msg: "Not updated" });
    });
    
  });
  app.delete("/users/:id", (req, res) => {
    //traitement de la request
    let id = req.params.id;
    User.deleteOne({ _id: id }).then((data) => {
      console.log("here data after delete ", data);
      data.deletedCount == 1
        ? res.json({ msg: "deleted with success" })
        : res.json({ msg: "Not deleted" });
    });
  });
  app.delete("/courses/:id", (req, res) => {
    //traitement de la request
    let id = req.params.id;
    Course.deleteOne({ _id: id }).then((data) => {
      console.log("here data after delete ", data);
      data.deletedCount == 1
        ? res.json({ msg: "deleted with success" })
        : res.json({ msg: "Not deleted" });
    });
  });
  app.post("/courses", (req, res) => {
    //traitement de la request
    console.log("here into BL : add course", req.body);
     //traitement de la request
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
   
app.put("/courses/:id", (req, res) => {
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
  

  app.get("/courses/:courseID/students", (req, res) => {
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
  //   app.post("/notes", (req, res) => {
  //     //traitement de la request
  //     console.log("here into BL : add note", req.body);
  //      //traitement de la request
  //   let note = new Note(req.body);
  //   note.save((err, doc) => {
  //     console.log("here err", err);
  //     console.log("here doc", doc);
  //     err ? res.json({ msg: "error" }) : res.json({ msg: "added successfully" , note : note});
  //   });
  // });


  app.post("/notes", (req, res) => {
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

  
  
  app.get("/notes", (req, res) => {
    //traitement de la request
    console.log("here into BL : get all notes");
    
    Note.find().then((data) => {
      res.json({ notes: data });
    });
  });

   app.delete("/notes/:id", (req, res) => {
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
  

  app.get("/notes/student/dashboard/:id", (req, res) => {
    //traitement de la request
    let id = req.params.id
    console.log("here into BL : get student notes" , req.params.id );
    
    Note.find({  student : id} ).then((data) => {
      console.log("hello dataaaaaaaaaaaaa",data);
      

    
      res.json({ notes: data });
    });
  });
  app.get("/users/parents/students/:id", (req, res) => {
    //traitement de la request
    console.log("here into BL : get students by parents");
    console.log('helooooo',req.params.id);
    User.find({tel: { $in: req.params.id}}).populate({
      path: 'notes',
      populate: [{
        path: 'course',
        model: 'Course'
      },  {
        path: 'student',
        model: 'User'
      }]
    }).then((data) => {
      console.log("here into get students by parent", data);
      res.json({ students: data });
    }).catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
 
  });
  app.post('/users/search' , (req,res)=>{
   console.log(req.body);
    let searchWord = req.body.speciality ;
    console.log(searchWord);
    User.find({ speciality: { $regex: searchWord, $options: 'i' } }).populate('courses').then((data)=>{
      if (data.length>0) {
        
       
        res.json( {result : data , msg : 'findedTeacher'} )
      }
    else{
      res.json({msg : 'not found'})
    }
    })
  })
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS,
      
    }
   
  });

  
  app.post('/send-email', (req, res) => {
    console.log(req.body);
    const { to, subject, text } = req.body;
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error" ,error);
        return res.status(500).json({msg : error});
      }
      res.status(200).json({ msg: 'Email sent successfully' });
    });
  });
  // ENVIRENMENT files(f westou credentials) ; comments , division 
  // const PORT = process.env.PORT || 3000;
  // app.listen(PORT, () => {
  //   console.log(`Server is running on http://localhost:${PORT}`);
  // });



  // Make app importable from another files
module.exports = app;