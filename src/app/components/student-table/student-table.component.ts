import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
  studentsTab : any ;

  constructor(private router:Router , 
    private userService : UserService,) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData(){
    
    this.userService.getAllStudents().subscribe((response)=>{
      console.log("here response from BE" , response);
      this.studentsTab = response.students 
      ;
    });
  }
  displayStudent(id){
    this.router.navigate([`studentinfo/${id}`])
    ;}
    updateStudent(id){
      this.router.navigate([`editStudent/${id}`]);
    }
    deleteStudent(id:number){
      this.userService.deleteUser(id).subscribe((response)=>{
        console.log("here response after delete", response.msg); 
       this.reloadData();
      });
    
    }
    affectStudent(id){
      this.router.navigate([`affectstudent/${id}`])  
    }
}
