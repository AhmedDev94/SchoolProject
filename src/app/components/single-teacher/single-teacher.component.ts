import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-teacher',
  templateUrl: './single-teacher.component.html',
  styleUrls: ['./single-teacher.component.css']
})
export class SingleTeacherComponent implements OnInit {
  @Input () X : any ;
  constructor() { }

  ngOnInit() {
  }

}
