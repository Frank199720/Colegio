import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './admin/shared/sidebar/sidebar.component';
import { FooterComponent } from './admin/shared/footer/footer.component';
import { HeaderComponent } from './admin/shared/header/header.component';
import { LoginComponent } from './login/login.component';

//RUTAS 
import { APP_ROUTING } from './app.routes';
import { AdminComponent } from './admin/admin.component';
import { AlumnoComponent } from './admin/alumno/alumno.component';
import { CursoComponent } from './admin/curso/curso.component';
//COMPLEMENTOS
import { AgGridModule } from 'ag-grid-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    AdminComponent,
    AlumnoComponent,
    CursoComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    APP_ROUTING,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
