import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
 
  courseURL : string = "http://localhost:3002/courses"
  constructor(private http : HttpClient) {}
  // REQUEST TO ADD team
  addcourse(obj){
    return this.http.post<{msg : string , course : any }>(this.courseURL , obj)
  }; 
  // REQUEST TO GET course BY ID
  getcourseById(id){
    // return this.http.get(this.courseURL + "/" +id)
    return this.http.get<{course : any , msg : string}>(`${this.courseURL}/${id}`)
  };

  getStudentsByCourse(courseID){
    // return this.http.get(this.courseURL + "/" +id)
    return this.http.get<{courseStudents : any , msg : string}>(`${this.courseURL}/${courseID}/students`)
  };
  //REQUEST TO DELETE course BY ID
  deletecourse(id){
  return this.http.delete<{msg:string}>(`${this.courseURL}/${id}`)
  };
  //REQUEST TO EDIT course
  updatecourse(obj){
    return this.http.put<{msg : string}>(this.courseURL,obj)
  };
  // REQUEST TO GET ALL courseES
  getAllcourses(){
    return this.http.get<{courses : any}>(this.courseURL);
  };
  getStudentCourses(id){
    return this.http.get<{courses : any}>(`${this.courseURL}/student/${id}`);
  }
  getTeacherCourses(id){
    return this.http.get<{courses : any}>(`${this.courseURL}/teacher/${id}`);
  }
  affectStudent(obj, id){
    return this.http.put<{msg : string}>(`${this.courseURL}/${id}`,obj)

  }
}

