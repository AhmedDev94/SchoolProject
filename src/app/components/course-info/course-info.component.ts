import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {
  
  id: any;
  findedCourse: any;

  constructor(private courseService : CoursesService , private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    // GET ID FROM PATH
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.courseService.getcourseById(this.id).subscribe((data)=>{
      console.log("here object from BE", data);
      this.findedCourse = data.course;
    })
  }

}
