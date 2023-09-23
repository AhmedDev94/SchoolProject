import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-teacher',
  templateUrl: './search-teacher.component.html',
  styleUrls: ['./search-teacher.component.css']
})
export class SearchTeacherComponent implements OnInit {
  searchTeacher : FormGroup;
  user : any ={} ;
  teacher : any = [];
  showTable : any;

  constructor(private userService : UserService) { }

  ngOnInit() {
  }
  search(){
    console.log(this.user);
    this.showTable =false;
    
    this.userService.searchTeacher(this.user).subscribe((res)=>{
    console.log(res);
    if (res.result) {
      
      this.teacher = res.result ;
    console.log(this.teacher);
    this.showTable = true
    }
    else{
      this.showTable = false
    }
    
    
    

    })

  }
}
