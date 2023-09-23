import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {

  editTeacherForm : FormGroup;
  teacher : any = {};
  id : any ;

  constructor(private userService: UserService , private router : Router , private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getUserById(this.id).subscribe((data)=>{
      console.log("here object from BE", data);
      this.teacher = data.user;
      console.log("hello" , this.teacher);
    })
  }
  validate(){
    this.userService.updateUser(this.teacher).subscribe((result)=>{
      console.log("here s the result after update" , result.msg) ;
      this.router.navigate(["admin"])
     })
  }

}
