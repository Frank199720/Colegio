import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Curso } from '../interface/curso';
import { Nivel } from '../interface/nivel';
import { CursoService } from '../services/curso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  @ViewChild('gridApi') gridApi: AgGridAngular;
  
  
  /*campoEsValido(campo:string){
    console.log(this.formCurso.controls[campo].errors)
    return this.formCurso.controls[campo].errors && this.formCurso.controls[campo].touched 
  }*/

  createFormGroup(){
    return new FormGroup({
      descripcion: new FormControl('',[Validators.required]),
      abreviatura: new FormControl('',[Validators.required, Validators.maxLength(2)]),
      nivel: new FormControl('',[Validators.required])
    });
  }

  get descripcion() { return this.formCurso.get('descripcion'); }
  get abreviatura() { return this.formCurso.get('abreviatura'); }
  get nivel() { return this.formCurso.get('nivel'); }

  formCurso:FormGroup;

  curso:Curso={
    cur_descripcion:null,
    cur_abreviatura:null,
    niv_cod:null
  };
  rowData:any;
  columnDefs =[
    { 
      headerName: "CODIGO", 
      field: 'cur_cod', 
      checkboxSelection: true, 
      suppressSizeToFit: true,
      width: 100,
    },
    { 
      headerName: "CURSO", 
      field: 'cur_descripcion',  
    },
    { 
      headerName: "NIVEL", 
      field: 'niv_descripcion',
    },
  ];
  defaultColDef = { resizable: true, sortable: true };
  //variables de control
  //gridApi;
  gridColumnApi;

  cursos:Curso[];
  niveles:Nivel[];
  edit:boolean;
  id_curso:any;
  editing: boolean=false;
  

  constructor(private modal:NgbModal, private cursoServices:CursoService) {
    this.cursoServices.getNiveles().subscribe((data:Nivel[])=>{
      this.niveles=data;
    });
    this.cursoServices.index().subscribe((data)=>{
      this.rowData=data;
    });
    this.formCurso = this.createFormGroup();
  }
  
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.cursoServices.index();
  }

  /*onSubmit() {
  
    console.warn(this.formCurso.value);
  }*/
  /*saveCurso(){
    
   if(this.formCurso.invalid){
    this.formCurso.markAllAsTouched();
     return;
   }
  }*/

  opensave(contenido){
    this.modal.open(contenido,{size:'lg'});
    this.edit=true;
  }

  openedit(contenido){
    const selectedNodes = this.gridApi.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if(selectedData.length > 0){
      this.editing = true;
      this.curso = this.rowData.find((m) => {
        return m.cur_cod = this.id_curso;
      });
      this.modal.open(contenido, {size:"lg"});
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Selecciona un curso!',
      })
    }
  }

  eliminar(){

  }

  guardar(){
    if(this.formCurso.valid){
      if (this.editing) {
        
      }
      else{
        this.cursoServices.store(this.curso).subscribe((data)=>{
          Swal.fire(
            'Curso Guardado',
            '',
            'success'
          )
        },(error)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A ocurrido un error!',
          })
        });
      }
      this.modal.dismissAll();
      this.formCurso.reset();
    }
  }

  cerrar(){
    this.modal.dismissAll();
  }

  ngOnInit(): void {
  }

  getSelectedRows() {
    /*const selectedNodes = this.gridApi.api.getSelectedRows();
    const selectedData = selectedNodes.map(node => node.data );
    const selectedDataStringPresentation = selectedData.map(node => node.cur_descripcion + ' ' + node.niv_descripcion).join(', ');

    alert(`Selected nodes: ${selectedDataStringPresentation}`);
    const selectedRow = this.gridApi.api.getSelectedRows();*/
    const selectedNodes = this.gridApi.api.getSelectedRows();
    alert(selectedNodes.toString());
  }

}
