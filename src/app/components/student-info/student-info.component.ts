import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
  id : any ;
  findedStudent : any ;

  constructor(private userService : UserService , private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getUserById(this.id).subscribe((data)=>{
     
      this.findedStudent = data.user;
      console.log("here finded student", this.findedStudent);
    })
  }

}
