import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  noteURL : string = "http://localhost:3002/notes"
  constructor(private http : HttpClient) {}
  // REQUEST TO ADD team
  addnote(obj){
    return this.http.post<{msg : string , note : any }>(this.noteURL , obj)
  }; 
  // REQUEST TO GET note BY ID
  getnoteById(id){
    // return this.http.get(this.noteURL + "/" +id)
    return this.http.get<{note : any , msg : string}>(`${this.noteURL}/${id}`)
  };
  //REQUEST TO DELETE note BY ID
  deleteNote(id){
  return this.http.delete<{msg:string}>(`${this.noteURL}/${id}`)
  };
  // //REQUEST TO EDIT note
  // updateNote(obj){
  //   return this.http.put<{msg : string}>(this.noteURL,obj)
  // };
  // REQUEST TO GET ALL noteES
  getAllNotes(){
    return this.http.get<{notes : any}>(this.noteURL);
  };
  studentDashboard(id){
    return this.http.get<{notes : any}>(`${this.noteURL}/student/dashboard/${id}`);
  }
}
