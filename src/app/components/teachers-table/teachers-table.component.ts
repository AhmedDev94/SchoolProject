import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.css']
})
export class TeachersTableComponent implements OnInit {
  teachersTab : any =[];
   teacher : any ;

  constructor(private router:Router , 
    private userService : UserService,) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData(){
    console.log(this.teachersTab);
    this.userService.getAllTeachers().subscribe((response)=>{
      console.log("here response from BE" , response);
      this.teachersTab = response.teachers 
      ;
    });
  }
  displayTeacher(id){
    this.router.navigate([`teacherinfo/${id}`])
    ;}
    updateTeacher(id){
      this.router.navigate([`editTeacher/${id}`])  
    }
    deleteTeacher(id:number){
      this.userService.deleteUser(id).subscribe((response)=>{
        console.log("here response after delete", response.msg); 
       this.reloadData();
      });
    
    }
    validateTeacher(id){
     this.teacher = this.teachersTab.find((elt)=>{
       return elt._id == id ;
      })
      console.log("teacherrrrrrrr",this.teacher);
      
      this.teacher.status = 'ok' ;
      this.userService.updateUser(this.teacher).subscribe((response)=>{
        console.log("here response after update", response.msg); 
       this.reloadData();
      });
    }
}
