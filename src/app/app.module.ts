import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SingleComponent} from './single/single.component';
import {MultipleComponent} from './multiple/multiple.component';
import {AppRoutingModule} from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, NavbarComponent, SingleComponent, MultipleComponent
  ],
  imports: [
    BrowserModule, HttpModule, AppRoutingModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
