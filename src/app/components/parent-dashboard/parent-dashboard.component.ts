import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import  jwt_decode   from 'jwt-decode';
import { CoursesService } from 'src/app/services/courses.service';
import { NotesService } from 'src/app/services/notes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parent-dashboard',
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.css']
})
export class ParentDashboardComponent implements OnInit {
  parentID : any ;
  parentObj : any ;
  studentTel : any ;
  studentsTab :any ;
  notesTab: any=[] ;
  searchForm : FormGroup;
  telFound : boolean;
  errorMsg : any ;

  constructor( private formBuilder : FormBuilder, private userService : UserService ,private notesService : NotesService, private courseService : CoursesService) { }

  ngOnInit() {
    this.searchForm =this.formBuilder.group({
      studentTel : ["",[Validators.required , Validators.min(10000000)]],
      });
  
    
  }

  decodeToken(token: string) {
    return jwt_decode(token)
    ;}

    search(){
      this.notesTab = [];
      let decodedToken : any = this.decodeToken(sessionStorage.getItem("token"));
      this.parentID = decodedToken.id
      this.userService.getUserById(this.parentID).subscribe((data)=>{
        this.parentObj = data.user ;
        this.studentTel = this.searchForm.value.studentTel;
        console.log('studenTel before sent to BE',this.studentTel);
        const isStudentFound = this.parentObj.studentTel.some(student => student === this.studentTel);
if (isStudentFound) {
  this.userService.getStudentsByParents(this.studentTel).subscribe((response)=>{
    console.log("response.students",response.students);
    if (response.students.length!=0) {
      this.telFound = true ;
      this.studentsTab = response.students;
      for (let i = 0; i < this.studentsTab.length; i++) {
        this.notesTab.push(...this.studentsTab[i].notes) 
      }
      console.log("notesTab",this.notesTab)
    }
    else{
      this.telFound = false ;
      this.errorMsg = "Student Not Found"
    }
   
  })
}
else{
  this.telFound = false ;
      this.errorMsg = "Student Not Found"

}
       
      })
    
    

    }

}
