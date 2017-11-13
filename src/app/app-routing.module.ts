/** Módulos de enrutado de Angular2 */
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {StudentComponent} from './student/student.component';
import {SubjectComponent} from './subject/subject.component'

// Array con las rutas de este módulo. Ninguna funcional.
const routes: Routes = [
  { path: '', redirectTo: '/subject',pathMatch: 'full'},
  { path: 'student', component: StudentComponent },
  { path: 'subject', component: SubjectComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes) // configuración para el módulo raíz
  ],
  exports: [
    RouterModule // se importará desde el módulo padre
  ]
})
export class AppRoutingModule { }