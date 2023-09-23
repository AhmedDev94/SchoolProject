import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import  jwt_decode   from 'jwt-decode';
import { CoursesService } from 'src/app/services/courses.service';
import { NotesService } from 'src/app/services/notes.service';


@Component({
  selector: 'app-teacher-table',
  templateUrl: './teacher-table.component.html',
  styleUrls: ['./teacher-table.component.css']
})
export class TeacherTableComponent implements OnInit {
  // evaluateStudent : FormGroup
  studentsTab : any ;
  studentList : any ;
  id : any ;
  course : any ;
  showForm = false ;
  note : any ={};
  notesTab : any ;

  
  

  constructor(private router:Router , 
    private coursesService : CoursesService, private route:ActivatedRoute , private notesService : NotesService  ) { }

  ngOnInit() {

    this.id =this.route.snapshot.paramMap.get('id');
    let decodedToken : any = this.decodeToken(sessionStorage.getItem("token"));
    this.note.course = this.id;
    this.note.teacher = decodedToken.id ;

    console.log('here note ' , this.note);

    this.notesService.getAllNotes().subscribe((data)=>{
      console.log("here all notes from DB" , data.notes);
      this.notesTab = data.notes;
      console.log(this.notesTab);
    })


     this.coursesService.getcourseById(this.id).subscribe((response)=>{
      console.log("here response from BE" , response.course.name);
      this.course = response.course
      
      console.log('hello',this.course);
    });


    this.coursesService.getStudentsByCourse(this.id).subscribe((data)=>{
      console.log("here data from get student by course", data.courseStudents);
      this.studentsTab = data.courseStudents ; 
    })
  }
  
  giveEvaluation(studentId){
  const hasNote = !!this.getNoteForStudent(studentId); // Check if there is a note
  const hasEvaluation = !!this.getEvaluationForStudent(studentId); // Check if there is an evaluation

  // Show the form only if there is no note or no evaluation
    this.showForm = !hasNote || !hasEvaluation;
   

    console.log("ffffffffffffffffff",this.showForm);
    
    this.note.student= studentId ;
      
    }
  decodeToken(token: string) {
    return jwt_decode(token)
    ;}
    getNoteForStudent(studentId) {
      
      const note = this.notesTab.find(note => note.student === studentId && note.course ===this.course._id);
      return note ? note.note : ''
    }
    getEvaluationForStudent(studentId) {
      
      const note = this.notesTab.find(note => note.student === studentId && note.course ===this.course._id);
     
      return note ? note.evaluation : '';
    }

  validate(){
    console.log('notee' , this.note);
    this.showForm =false;
    this.notesService.addnote(this.note).subscribe((data)=>{
    console.log('here add response from BE',data.msg , data.note) ;
    this.notesTab.push(data.note);
    })
     
    console.log('refresh',this.id);
  this.router.navigate([`course-students/${this.id}`])
   
  }

  delete(courseId,studentId) {
     const note = this.notesTab.find(note => note.student === studentId && note.course === courseId);
    if (note && note._id) {
      const noteId = note._id;
      console.log("Note ID to delete:", noteId);
    
       
    this.notesService.deleteNote(noteId).subscribe(
      (data) => {
        console.log(data.msg);
        this.notesTab = this.notesTab.filter(n => n._id !== noteId);
    
        
   
      },
    );
  }
  else {
    console.log("not found");
    
 
 }
 this.router.navigate([`course-students/${this.id}`])
}
  
}
