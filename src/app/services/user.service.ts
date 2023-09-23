import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userURL : string = "http://localhost:3002/users"

  constructor( private http : HttpClient) {}

   
  login(obj){
    return this.http.post<{result : any , msg : string}>(this.userURL + "/login",obj);
  }

  signup(obj :any , img : File , pdfFile : File ,){
    let fData = new FormData();
    if (obj.role =="student"){
    fData.append("img" , img);
    fData.append("firstName" , obj.firstName);
    fData.append("lastName" , obj.lastName);
    fData.append("email" , obj.email);
    fData.append("pwd" , obj.pwd);
    fData.append("adresse" , obj.adresse);
    fData.append("tel" , obj.tel);
    fData.append("role" , obj.role);
    }
    else if (obj.role =="teacher"){
    fData.append("img" , pdfFile);
    fData.append("firstName" , obj.firstName);
    fData.append("lastName" , obj.lastName);
    fData.append("email" , obj.email);
    fData.append("pwd" , obj.pwd);
    fData.append("adresse" , obj.adresse);
    fData.append("tel" , obj.tel);
    fData.append("role" , obj.role);
    fData.append("status" , obj.status);
    fData.append("speciality" , obj.speciality);
    }
    else if (obj.role =="parent"){
      fData.append("firstName" , obj.firstName);
      fData.append("lastName" , obj.lastName);
      fData.append("email" , obj.email);
      fData.append("pwd" , obj.pwd);
      fData.append("adresse" , obj.adresse);
      fData.append("tel" , obj.tel);
      fData.append("role" , obj.role);
      fData.append("studentTel" , obj.studentTel);
    }
    else{
      fData.append("firstName" , obj.firstName);
      fData.append("lastName" , obj.lastName);
      fData.append("email" , obj.email);
      fData.append("pwd" , obj.pwd);
      fData.append("adresse" , obj.adresse);
      fData.append("tel" , obj.tel);
      fData.append("role" , obj.role);
    

    }
    console.log("here obj",obj);
    
   if (obj.role=="parent") {
    return this.http.post<{msg : string}>(this.userURL + "/signup",obj);
   }
   else{
    return this.http.post<{msg : string}>(this.userURL + "/signup",fData);
   }
 
  }
  // REQUEST TO GET user BY ID
  getUserById(id){
    // return this.http.get(this.userURL + "/" +id)
    return this.http.get<{user : any , msg : string}>(`${this.userURL}/${id}`)
  };
  //REQUEST TO DELETE user BY ID
  deleteUser(id){
  return this.http.delete<{msg:string}>(`${this.userURL}/${id}`)
  };
  //REQUEST TO EDIT user
  updateUser(obj){
    return this.http.put<{msg : string}>(this.userURL,obj)
  };
  // REQUEST TO GET ALL useres
  getAllTeachers(){
    return this.http.get<{teachers : any}>(this.userURL +'/teachers');
  };
  getAllStudents(){
    return this.http.get<{ students : any}>(this.userURL + '/students');
  };
  getStudentsByParents(id){
    return this.http.get<{ students : any}>( `${this.userURL}/parents/students/${id}`);
  };
  searchTeacher(obj){
    return this.http.post<{result : any , msg : string}>(this.userURL +"/search",obj);

  }



}
