import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnoComponent } from './alumno/alumno.component';
import { HomeComponent } from './home/home.component';
import { CursoComponent } from './curso/curso.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations:[
        AlumnoComponent,
        HomeComponent,
        CursoComponent,
        SidebarComponent,
        HeaderComponent
    ],
    imports:[
        CommonModule,
        AdminRoutingModule,
        AgGridModule.withComponents([]),
        NgbModule,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
})
export class AdminModule{}
