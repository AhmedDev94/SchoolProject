import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import  jwt_decode   from 'jwt-decode';
import { NotesService } from 'src/app/services/notes.service';


@Component({
  selector: 'app-student-course-table',
  templateUrl: './student-course-table.component.html',
  styleUrls: ['./student-course-table.component.css']
})
export class StudentCourseTableComponent implements OnInit {
  id : any ;
  notesTab : any ;
  coursesTab : any ;
  course : any ;

  constructor(private notesService : NotesService, private courseService : CoursesService) { }

  ngOnInit() {
    let decodedToken : any = this.decodeToken(sessionStorage.getItem("token"));
    this.id = decodedToken.id

    this.notesService.studentDashboard(this.id).subscribe((data)=>{
      this.notesTab = data.notes
      console.log("hello notes",this.notesTab);
    })
   this.courseService.getAllcourses().subscribe((data)=>{
    this.coursesTab = data.courses
    console.log("hello courses",this.coursesTab);
  })
  }
//   getCourseName(courseID) {
//     console.log('fffffff', this.coursesTab);

//     const foundCourse = this.coursesTab.find(course => course._id === courseID);

//     if (foundCourse) {
//         this.course = foundCourse.name;
//         console.log(foundCourse.name);
        
//     } else {
//         console.log('Course not found');
//     }
// }
getCourseName(courseID) {
  if (!this.coursesTab) {
      return ''; // Or handle it as needed in your template
  }

  const foundCourse = this.coursesTab.find(course => course._id === courseID);

  if (foundCourse) {
      return foundCourse.name; // Return the course name
  } else {
      console.log('Course not found');
      return ''; // Or handle it as needed in your template
  }
}

 

  decodeToken(token: string) {
    return jwt_decode(token)
    ;}

}
