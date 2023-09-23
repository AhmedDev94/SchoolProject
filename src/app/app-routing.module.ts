import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { TeacherInfoComponent } from './components/teacher-info/teacher-info.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { EditTeacherComponent } from './components/edit-teacher/edit-teacher.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { ParentDashboardComponent } from './components/parent-dashboard/parent-dashboard.component';
import { AffectStudentComponent } from './components/affect-student/affect-student.component';
import { TeacherTableComponent } from './components/teacher-table/teacher-table.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path :"", component : HomeComponent},
  {path :"a", component : HomeComponent},
  {path :"signin", component : LoginComponent},
  {path :"subscription-teacher", component : SignupComponent},
  {path :"subscription-student", component : SignupComponent},
  {path :"subscription-parent", component : SignupComponent},
  {path :"subscription-admin", component : SignupComponent},
  {path :"admin", component : AdminDashboardComponent , canActivate: [AuthGuard]},
  {path :"courseinfo/:id", component : CourseInfoComponent},
  {path :"studentinfo/:id", component : StudentInfoComponent},
  {path :"teacherinfo/:id", component : TeacherInfoComponent},
  {path :"editCourse/:id", component : EditCourseComponent},
  {path :"editTeacher/:id", component : EditTeacherComponent},
  {path :"editStudent/:id", component : EditStudentComponent},
  {path :"addCourse", component : AddCourseComponent},
  {path :"searchTeacher", component : SearchTeacherComponent},
  {path :"teacher-dashboard", component : TeacherDashboardComponent},
  {path :"student-dashboard", component : StudentDashboardComponent},
  {path :"parent-dashboard", component : ParentDashboardComponent},
  {path :"affectstudent/:id", component : AffectStudentComponent},
  {path :"course-students/:id", component : TeacherTableComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
