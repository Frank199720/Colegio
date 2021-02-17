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
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ReactiveFormsModule } from '@angular/forms';
import { PersonalComponent } from './personal/personal.component';
import { MatriculaComponent } from './matricula/matricula.component';
import { CustomdateComponent } from './shared/customdate/customdate.component';
import { NotasGenComponent } from './notas-gen/notas-gen.component';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material/material.module';
import { PrincipalComponent } from './profesor/principal/principal.component';
import { HeaderpComponent } from './profesor/principal/headerp/headerp.component';
import { SidebarpComponent } from './profesor/principal/sidebarp/sidebarp.component';
import { PerfilComponent } from './profesor/perfil/perfil.component';
import { CursosaComponent } from './profesor/cursosa/cursosa.component';
import { NotasComponent } from './profesor/notas/notas.component';

@NgModule({
    declarations:[
        AlumnoComponent,
        HomeComponent,
        CursoComponent,
        SidebarComponent,
        HeaderComponent,
        PersonalComponent,
        AdminComponent,
        MatriculaComponent,
        CustomdateComponent,
        NotasGenComponent,
        PrincipalComponent,
        HeaderpComponent,
        SidebarpComponent,
        PerfilComponent,
        CursosaComponent,
        NotasComponent
    ],
    imports:[
        CommonModule,
        AdminRoutingModule,
        AgGridModule.withComponents([]),
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        MaterialModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
})
export class AdminModule{}
