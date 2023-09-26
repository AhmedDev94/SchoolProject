// IMPORT EXPRESS MODULE
const express = require("express");

//IMPORT NODEMAILER MODULE
const nodemailer = require('nodemailer')

//IMPORT BODY PARSER MODULE
const bodyParser = require("body-parser");

//import mongoose module
const mongoose = require("mongoose");

// import path module
const path = require("path");

//import dot.env file
require('dotenv').config({ path: './credentials.env' });

// CONNECT EXPRESS APP WITH DB VIA MONGOOSE
const DB_PORT = process.env.DB_PORT
mongoose.connect(`${DB_PORT}`);

// CREATE EXPRESS APPLICATION ,
const app = express();

// /SEND JSON RESPONSES
app.use(bodyParser.json());
// GET OBJ FROM REQUEST
app.use(bodyParser.urlencoded({ extended: true }));

// declaration des routes des fichiers de retraitement
const noteRouter = require('./routers/notes-router');
const courseRouter = require('./routers/courses-router');
const userRouter = require('./routers/users-router');


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


// setting up nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS,
      
    }
   
  });

  //retraitement de la requette du nodemailer

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
 
//configuration des routes de retraitement avec les adresses des api 
app.use('/notes' , noteRouter);
app.use('/courses' ,courseRouter);
app.use('/users' , userRouter);

  // Make app importable from another files
module.exports = app;