import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import  jwt_decode   from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  errorMsg : any ;
  constructor(  private formBuilder : FormBuilder, private userService : UserService , private router : Router) { }

  ngOnInit() {
    
    this.loginForm =this.formBuilder.group({
      tel : ["",[Validators.required , Validators.min(10000000)]],
      pwd : ["",[Validators.required ,Validators.minLength(8),Validators.maxLength(12)]],
      });
      
      
  }
  login(){
    console.log("here s the object " , this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe((data)=>{
      console.log("here data after login" , data);
      if (data.result) {
       
      sessionStorage.setItem("token", data.result);
      let decodedToken : any = this.decodeToken(data.result);
      console.log("here decodedToken" , decodedToken);

      if (decodedToken.role == "teacher") {
        this.router.navigate(["teacher-dashboard"]);
      }

      else if (decodedToken.role == "admin")
      {
        this.router.navigate(["admin"]);
      }
      else if(decodedToken.role == "student"){
        this.router.navigate(["student-dashboard"]);
      }
      else{
        this.router.navigate(["parent-dashboard"]);
      }
      }
      if(data.msg=='please wait for validation'){
        this.errorMsg = data.msg
      }
      else {
      this.errorMsg = "please check email / pwd"
      console.log(this.errorMsg);
      
      }
      
    });
   
    
    // this.router.navigate([""]);
    }
    decodeToken(token: string) {
      return jwt_decode(token)
      ;}

}
