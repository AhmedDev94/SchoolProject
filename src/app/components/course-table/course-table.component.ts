import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent implements OnInit {
  coursesTab : any ;

  constructor(private router:Router , 
    private coursesService : CoursesService,) { }

  ngOnInit() {
    this.reloadData();
  }
  displayCourse(id){
    this.router.navigate([`courseinfo/${id}`])
    ;}
    updateCourse(id){
      this.router.navigate([`editCourse/${id}`]);
    }
    deleteCourse(id:number){
      this.coursesService.deletecourse(id).subscribe((response)=>{
        console.log("here response after delete", response.msg); 
       this.reloadData();
      });
    
    }
  reloadData(){
    this.coursesService.getAllcourses().subscribe((response)=>{
      console.log("here response from BE" , response);
      this.coursesTab = response.courses ;
    });
  }

}
