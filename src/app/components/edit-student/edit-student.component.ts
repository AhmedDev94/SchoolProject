import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  editStudentForm : FormGroup;
  student : any = {};
  id : any ;

  constructor(private userService: UserService , private router : Router , private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getUserById(this.id).subscribe((data)=>{
      console.log("here object from BE", data);
      this.student = data.user;
      console.log("hello" , this.student);
    })
  }
  validate(){
    this.userService.updateUser(this.student).subscribe((result)=>{
      console.log("here s the result after update" , result.msg) ;
      this.router.navigate(["admin"])
     })
  }

}
