import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  editCourseForm : FormGroup;
  course : any = {};
  id : any ;

  constructor(private CourseService: CoursesService , private router : Router , private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.CourseService.getcourseById(this.id).subscribe((data)=>{
      console.log("here object from BE", data);
      this.course = data.course;
      console.log("here s findedTeacher" , this.course);
    })
  }
  validate(){
    this.CourseService.updatecourse(this.course).subscribe((result)=>{
      console.log("here s the result after update" , result.msg) ;
      this.router.navigate(["teacher-dashboard"])
     })
  }
}
