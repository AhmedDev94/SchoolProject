import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MailService } from 'src/app/services/mail.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myPath : any ;
  signupForm : FormGroup;
  imagePreview : any ;
  pdfFile :any ;
  errorMsg : any ;

  constructor(private emailService: MailService ,private router : Router , private formBuilder : FormBuilder , private userService : UserService ) { }

  ngOnInit() {
    this.myPath=this.router.url;
    console.log("here s the path" , this.myPath);
    if (this.myPath== '/subscription-teacher') {
      this.signupForm =this.formBuilder.group({
        firstName :["",[Validators.required , Validators.minLength(3)]],
        lastName :["",[Validators.required , Validators.minLength(4)]],
        email : ["",[Validators.required , Validators.email]],
        pwd : ["",[Validators.required , Validators.minLength(8),Validators.maxLength(12)]],
        tel : ["",[Validators.required , Validators.min(10000000)]],
        adresse : ["",[Validators.required ]],
        speciality : ["",[Validators.required ]],
        pdfFile :[""],
        role : "teacher",
        status : "nok",
        });
        
      
    }
    else if (this.myPath== '/subscription-student') {
      this.signupForm =this.formBuilder.group({
        firstName :["",[Validators.required , Validators.minLength(3)]],
        lastName :["",[Validators.required , Validators.minLength(4)]],
        email : ["",[Validators.required , Validators.email]],
        pwd : ["",[Validators.required , Validators.minLength(8),Validators.maxLength(12)]],
        tel : ["",[Validators.required , Validators.min(10000000)]],
        adresse : ["",[Validators.required ]],
        img :[""],
        role : "student"
        });
        

      
    }
    else if (this.myPath== '/subscription-parent') {
      this.signupForm =this.formBuilder.group({
        firstName :["",[Validators.required , Validators.minLength(3)]],
        lastName :["",[Validators.required , Validators.minLength(4)]],
        email : ["",[Validators.required , Validators.email]],
        pwd : ["",[Validators.required , Validators.minLength(8),Validators.maxLength(12)]],
        tel : ["",[Validators.required , Validators.min(10000000)]],
        adresse : ["",[Validators.required ]],
        studentTel: this.formBuilder.array([""], [Validators.required, Validators.min(10000000)]),
        img :[""],
        role : "parent"
        });
        

    }
    else{
      this.signupForm =this.formBuilder.group({
        firstName :["",[Validators.required , Validators.minLength(3)]],
        lastName :["",[Validators.required , Validators.minLength(4)]],
        email : ["",[Validators.required , Validators.email]],
        pwd : ["",[Validators.required , Validators.minLength(8),Validators.maxLength(12)]],
        tel : ["",[Validators.required , Validators.min(10000000)]],
        adresse : ["",[Validators.required ]],
        img :[""],
        role : "admin",
        });
        
    }
   
  }
  signup(){
    console.log("here user" , this.signupForm.value);
    this.sendEmail();   
    this.userService.signup(this.signupForm.value , this.signupForm.value.img , this.signupForm.value.pdfFile).subscribe((data)=>{
      console.log("here data after signup" , data.msg);
      if (data.msg =="0" ){
        this.errorMsg = "email exist";
      }
      else if (  data.msg== "please check your student tel" ){
        this.errorMsg = data.msg ;

      }
      else {
        console.log("hello");
        this.router.navigate(["signin"]);
      }
  
    })
  
  }
  
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ pdfFile: file });
  
    // Optionally, you can store the file object itself for further processing.
    this.pdfFile = window.URL.createObjectURL(file);
  }
  
    addStudentTel() {
      const studentTelArray = this.signupForm.get('studentTel') as FormArray;
      studentTelArray.push(this.formBuilder.control('', [Validators.required, Validators.minLength(8)]));
    }
    
  sendEmail() {
    const emailData = {
      to: this.signupForm.value.email,
      subject: 'Test Subject',
      text: 'This is a test email your signup is ok'
    };

    this.emailService.sendEmail(emailData).subscribe(
      response => {
        console.log('Email sent:', response);
      },
      error => {
        console.error('Error sending email:', error);
      }
    );
  }

}
