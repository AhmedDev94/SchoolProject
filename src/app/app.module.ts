import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { CoursesComponent } from './components/courses/courses.component';
import { SingleCourseComponent } from './components/single-course/single-course.component';
import { SingleTeacherComponent } from './components/single-teacher/single-teacher.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { CourseTableComponent } from './components/course-table/course-table.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { TeacherInfoComponent } from './components/teacher-info/teacher-info.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { HttpClientModule } from '@angular/common/http';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { EditTeacherComponent } from './components/edit-teacher/edit-teacher.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { ParentDashboardComponent } from './components/parent-dashboard/parent-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentCourseTableComponent } from './components/student-course-table/student-course-table.component';
import { TeacherTableComponent } from './components/teacher-table/teacher-table.component';
import { TeacherCoursesComponent } from './components/teacher-courses/teacher-courses.component';
import { AffectStudentComponent } from './components/affect-student/affect-student.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TeachersComponent,
    CoursesComponent,
    SingleCourseComponent,
    SingleTeacherComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    TeacherDashboardComponent,
    AdminDashboardComponent,
    TeachersTableComponent,
    CourseTableComponent,
    StudentTableComponent,
    CourseInfoComponent,
    TeacherInfoComponent,
    StudentInfoComponent,
    EditCourseComponent,
    EditStudentComponent,
    EditTeacherComponent,
    AddCourseComponent,
    SearchTeacherComponent,
    ParentDashboardComponent,
    StudentDashboardComponent,
    StudentCourseTableComponent,
    TeacherTableComponent,
    TeacherCoursesComponent,
    AffectStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
