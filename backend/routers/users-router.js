//importation express module
const express = require("express");

//importation multer module
const multer = require("multer");

//importation express session module
const session = require('express-session');

//// Create a new instance of an Express router to handle routes
const router = express.Router();

// Importing models for Course, Note, and User from their respective files
const Course = require("../models/course");
const Note = require("../models/note");
const User = require("../models/user");



// import bcrypt module
const bcrypt = require("bcrypt");

// IMPORT JSON WEBTOKEN module
const jwt = require('jsonwebtoken');

// import path module
const path = require("path");

//path confiruration (shortcut for multer path to be used in data base)
router.use('/images', express.static(path.join('backend/images'))) ;

// Mapping MIME types to their corresponding file extensions
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/pdf': 'pdf',
}

  // Configure Multer disk storage settings for handling file uploads
 const storage = multer.diskStorage({
   // destination function determines where to save the uploaded files
    destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
    error = null;
    }
    cb(null, 'backend/images')
    },
    // destination function determines where to save the uploaded files
    filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + '-' + Date.now() + '-crococoder-' + '.' + 
   extension;
    cb(null, imgName);
    }
});

// Retrieve secret key from environment variables for session encryption
const secretKey =  process.env.secretKey;
// Configure session middleware using the retrieved secret key
router.use
(session({
secret: secretKey,
}));


// Middleware function for authenticating JSON Web Tokens (JWT)
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


// signup api 
router.post("/signup", multer({ storage: storage }).single('img'), (req, res) => {
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


// login api 
router.post("/login", (req, res) => {
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

// get all teachers api 
router.get("/teachers",authenticateJWT, (req, res) => {
  //traitement de la request
  User.find({role : "teacher"}).populate("courses").then((data) => {
    console.log("here into BL get all teachers" , data);
    res.json({ teachers: data });
  }); 
});

// get all students api 
router.get("/students",authenticateJWT, (req, res) => {
  //traitement de la request
  console.log("here into BL : get all students");
  User.find({role : "student"}).populate("courses").then((data) => {
    console.log("here into BL get all students" , data);
    res.json({ students: data });
  });
  
});

// get User by ID api 
router.get("/:id",authenticateJWT, (req, res) => {
  //traitement de la request
  console.log("here into BL : get user by id ");
  let id = req.params.id;
  User.findOne({ _id: id }).then((data) => {
    res.json({ user: data });
  });
 
  
});

//updating user information api
router.put("/",authenticateJWT, (req, res) => {
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

// delete User by ID api 
router.delete("/:id",authenticateJWT, (req, res) => {
  //traitement de la request
  let id = req.params.id;
  User.deleteOne({ _id: id }).then((data) => {
    console.log("here data after delete ", data);
    data.deletedCount == 1
      ? res.json({ msg: "deleted with success" })
      : res.json({ msg: "Not deleted" });
  });
});

//  retrieving students associated with a  api
router.get("/parents/students/:id",authenticateJWT, (req, res) => {
  //traitement de la request
  console.log("here into BL : get students by parents");
  console.log('helooooo',req.params.id);
   // Find students based on parent's phone number(s)
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

//searching for users by specialty api
router.post('/search' , (req,res)=>{
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

//Export the router  to make it accessible in other files 
module.exports = router;