import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {LoginComponent} from './login/login.component'
import { AlumnoComponent } from './admin/alumno/alumno.component';
import { AdminComponent } from './admin/admin.component';
import { CursoComponent } from './admin/curso/curso.component';

const APP_ROUTES: Routes = [
    { path:'', component:LoginComponent},
    { path: 'admin', component: AdminComponent ,
    children:[
        { path: 'alumno', component: AlumnoComponent },
        { path: 'curso', component: CursoComponent },
    ]
    }
   

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
