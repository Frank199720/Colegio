import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  
  formAlumno:FormGroup;
  constructor(private formBuilder:FormBuilder,private modal:NgbModal) {
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

}
