import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { CursoComponent } from './curso/curso.component';
import { AdminComponent } from './admin.component';
import { PersonalComponent } from './personal/personal.component';
import { MatriculaComponent } from './matricula/matricula.component';

const routes:Routes=[
  {
    path:'home',
    component: HomeComponent,
    children:[
      {path:'alumno' , component:AlumnoComponent},
      {path:'curso' , component:CursoComponent},
      {path:'personal' , component:PersonalComponent},
      {path:'matricula' , component:MatriculaComponent},
      {path:'**' , redirectTo:'home'}
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AdminRoutingModule { }
