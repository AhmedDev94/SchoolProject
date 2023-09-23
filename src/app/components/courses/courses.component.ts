import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  coursesTab : any ;

  constructor(private courseService : CoursesService) { }

  ngOnInit() {

    this.courseService.getAllcourses().subscribe((data)=>{
      console.log(data);
      this.coursesTab=data.courses;
      
    })
  }

}
