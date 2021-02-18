import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { CursoComponent } from './curso/curso.component';
import { AdminComponent } from './admin.component';
import { PersonalComponent } from './personal/personal.component';
import { MatriculaComponent } from './matricula/matricula.component';
import { NotasGenComponent } from './notas-gen/notas-gen.component';
import { PrincipalComponent } from './profesor/principal/principal.component';
import { PerfilComponent } from './profesor/perfil/perfil.component';
import { CursosaComponent } from './profesor/cursosa/cursosa.component';
import { NotasComponent } from './profesor/notas/notas.component';

const routes:Routes=[
  {
    path:'profesor', component:PrincipalComponent,
    children:[
      { path:'perfil', component:PerfilComponent },
      { path:'cursoa', component:CursosaComponent },
      { path:'notas/:idcurso/:idgrado/:idseccion', component:NotasComponent }
    ]
  },
  {
    path:"",
    component: AdminComponent,
    children:[
      {path:'alumno' , component:AlumnoComponent},
      {path:'curso' , component:CursoComponent},
      {path:'personal' , component:PersonalComponent},
      {path:'matricula' , component:MatriculaComponent},
      
      {path:'home' , component:HomeComponent},
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
