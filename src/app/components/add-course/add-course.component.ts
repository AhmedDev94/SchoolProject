import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { UserService } from 'src/app/services/user.service';
import  jwt_decode   from 'jwt-decode';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  addCourseForm : FormGroup;
  teacherOptions: any[];
  course : any ={};
  

  constructor(private userService : UserService, private CourseService : CoursesService ,private router : Router ) { }

  ngOnInit() {
   
    let decodedToken :any = this.decodeToken(sessionStorage.getItem("token"));
    console.log("here add course decoded token" ,decodedToken);
    this.course.teacher = decodedToken.id ;
    

  }
  validate(){
    this.CourseService.addcourse(this.course).subscribe((data)=>{
      data.msg;
      console.log(data.msg);
      this.router.navigate(["admin"]);

    })
  }
  decodeToken(token: string) {
    return jwt_decode(token)
    ;}

}
