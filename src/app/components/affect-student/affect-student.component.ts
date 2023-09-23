import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-affect-student',
  templateUrl: './affect-student.component.html',
  styleUrls: ['./affect-student.component.css']
})
export class AffectStudentComponent implements OnInit {
  coursesTab : any ;
  affectStudent : FormGroup;
  courseID : any ;
  course : any = {};
  studentID


  constructor(private courseService : CoursesService , private router : Router , private route : ActivatedRoute ) { }

  ngOnInit() {
    this.courseService.getAllcourses().subscribe((data)=>{
      this.coursesTab = data.courses;
      this.studentID = this.route.snapshot.paramMap.get("id");
      console.log("student iddddddd",this.studentID);
      
      
    })
  }
  validate(){
//  this.courseService.getcourseById(this.courseID).subscribe((data)=>{
//   console.log("data." ,data); 
//   this.course = data.course
//   this.course.students.push(this.studentID) ; 
//   console.log(this.course);
  
//  this.courseService.updatecourse(this.course).subscribe((data)=>{
//   data.msg
//  })
//  })
this.courseService.getcourseById(this.courseID).subscribe((data)=>{
    console.log("data." ,data); 
    this.course = data.course;
    this.courseService.affectStudent(this.course , this.studentID).subscribe((data)=>{
      console.log("response for update" ,data.msg);   
    })    
   })  
  }
  getCourseID(event){
    this.courseID =  event.target.value
    console.log("here course id" , this.courseID);
  }

}
