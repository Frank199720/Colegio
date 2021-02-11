import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlumnoService } from '../services/alumno.service';
import { Departamento } from '../interface/departamento'

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  private gridApi;
  private gridColumnApi;

  columnDefs;
  defaultColDef;
  rowData: any;

  departamentos:Departamento[];
  departamento:Departamento;

  
  formAlumno:FormGroup;
  constructor(private formBuilder:FormBuilder,private modal:NgbModal, private alumnoService:AlumnoService) {
    this.columnDefs = [
      { 
        headerName: "Nivel", 
        field: 'nivel', 
        sortable: true, 
        checkboxSelection: true,
        suppressSizeToFit: true,
        width: 100,
      },
      { 
        headerName: "Apellido Paterno", 
        field: 'apellidopaterno', 
        sortable: true, 
        checkboxSelection: true, 
      },
      { 
        headerName: "Apellido Materno", 
        field: 'apellidomaterno', 
        sortable: true 
      },
      { 
        headerName: "Nombres", 
        field: 'nombres', 
        sortable: true 
      },
    ];
    this.defaultColDef = { resizable: true };
    alumnoService.getDepartamentos().subscribe((data:Departamento[])=>{
      this.departamentos = data;
      console.log(this.departamentos);
    });
   }

   onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  OnGridReady(params ){
    this.gridApi=params.api;
  }
  saveCurso(){
    
    
   }
   opensave(contenido){
     this.modal.open(contenido,{size:'lg',backdrop:'static',scrollable:true});
     
   }
   cerrarModal(contenido){
     this.modal.dismissAll();
   }
   openedit(contenido){
     
   }
   eliminar(){
 
   }
  ngOnInit(): void {
    this.formAlumno = this.formBuilder.group({
      codigoEducando:   [,[Validators.required,Validators.minLength(3)]],
      nombre:   [,Validators.required]
    })
  }

  provAlumno(){
    
  }
}
