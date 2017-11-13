import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {StudentComponent} from './student/student.component';
import {SubjectComponent} from './subject/subject.component';
import {AppRoutingModule} from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, NavbarComponent, StudentComponent, SubjectComponent
  ],
  imports: [
    BrowserModule, HttpModule, AppRoutingModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
