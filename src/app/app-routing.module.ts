/** Módulos de enrutado de Angular2 */
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {SingleComponent} from './single/single.component';
import {MultipleComponent} from './multiple/multiple.component';

// Array con las rutas de este módulo. Ninguna funcional.
const routes: Routes = [
  { path: '', redirectTo: '/single', pathMatch: 'full'},
  { path: 'single', component: SingleComponent },
  { path: 'multiple', component: MultipleComponent }
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
