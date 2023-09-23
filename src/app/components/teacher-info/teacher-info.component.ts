import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teacher-info',
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.css']
})
export class TeacherInfoComponent implements OnInit {
  id : any ;
  findedTeacher : any ;

  constructor(private userService : UserService , private activatedRoute : ActivatedRoute) { }


  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getUserById(this.id).subscribe((data)=>{
      console.log("here object from BE", data);
      this.findedTeacher = data.user;
      console.log("here s findedTeacher" , this.findedTeacher);
    })
  }
  

}
