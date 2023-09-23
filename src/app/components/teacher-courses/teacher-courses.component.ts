import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import  jwt_decode   from 'jwt-decode';

@Component({
  selector: 'app-teacher-courses',
  templateUrl: './teacher-courses.component.html',
  styleUrls: ['./teacher-courses.component.css']
})
export class TeacherCoursesComponent implements OnInit {
  id : any ;
  coursesTab : any ;

  constructor(private courseService : CoursesService , private router : Router) { }

  ngOnInit() {
    let decodedToken :any = this.decodeToken(sessionStorage.getItem("token"));
    console.log("here teacher courses decoded token" ,decodedToken.id);
    this.id = decodedToken.id ;
    this.courseService.getTeacherCourses(this.id).subscribe((data)=>{
      console.log(data.courses);
      this.coursesTab = data.courses;
      console.log("this coursesTab",this.coursesTab)
    })
  }
  editCourse(id){
     this.router.navigate([`editCourse/${id}`])}
  displayCourse(id){ 
    this.router.navigate([`courseinfo/${id}`])
  }


  deletCourse(id){
    this.courseService.deletecourse(id).subscribe((response)=>{
    console.log("here response after delete", response.msg); 
   this.reloadData();
  });}


  displayAllStudents(id){
    this.router.navigate([`course-students/${id}`])
  }


  decodeToken(token: string) {
    return jwt_decode(token)
    ;}

    reloadData(){
      this.courseService.getTeacherCourses(this.id).subscribe((data)=>{
      console.log(data.courses);
      this.coursesTab = data.courses;
      });
    }
}
