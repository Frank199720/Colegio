import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Curso } from '../interface/curso';
import { Nivel } from '../interface/nivel';
import { CursoService } from '../services/curso.service';
import Swal from 'sweetalert2';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

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
      suppressSizeToFit: true,
      width: 120,
    },
    { 
      headerName: "ABREV.", 
      field: 'cur_abreviatura',
      width: 100,
    },
    { 
      headerName: "CURSO", 
      field: 'cur_descripcion',
      flex: 3,
      minWidth: 200,
    },
    { 
      headerName: "NIVEL",
      field: 'niv_descripcion',
      filter: 'agMultiColumnFilter',
      rowGroup: true,
      minWidth: 150,
      flex: 1,
    },
  ];
  autoGroupColumnDef = {
    headerName: 'NIVEL',
    field: 'niv_descripcion',
    flex: 1,
    minWidth: 250,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true
    }
  };
  defaultColDef = { resizable: true, sortable: true};

  gridApi;
  gridColumnApi;

  cursos:Curso[];
  niveles:Nivel[];
  id_curso:any;
  editing: boolean=false;
  accion:string;

  constructor(private modal:NgbModal, private cursoServices:CursoService, private http:HttpClient) {
    this.cursoServices.getNiveles().subscribe((data:Nivel[])=>{
      this.niveles=data;
    });
    this.getCursos();
    this.formCurso = this.createFormGroup();
  }
  
  /*onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }*/

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    //this.rowData = this.cursoServices.index();
  }

  getCursos(){
    this.cursoServices.index().subscribe((data)=>{
      this.rowData = data;
    },(error)=>{
      console.log('Error:' + error);
    });
  }

  opensave(contenido){
    this.modal.open(contenido,{size:'lg'});
    this.accion='Agregar curso';
  }

  openedit(contenido){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    this.getSelectedRows();
    if(selectedData.length > 0){
      this.editing=true;
      this.accion='Editar curso';
      this.curso = this.rowData.find((m) => {
        return m.cur_cod == this.id_curso
      });
      this.modal.open(contenido, { size:"lg", backdrop: "static" });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Selecciona un curso!',
        showConfirmButton: false,
        timer: 1800,
      });
    }
  }

  eliminar(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if(selectedData.length > 0){
      this.getSelectedRows();
      Swal.fire({
        title: 'Esta seguro?',
        text: "Esta acción no sera reversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminalo!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.cursoServices.destroy(this.id_curso).subscribe((data)=>{
            Swal.fire({
              icon: 'success',
              title: 'Eliminado!',
              text: 'El curso ha sido eliminado',
              showConfirmButton: false,
              timer: 1500,
            });
            this.getCursos();
          },(error)=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'A ocurrido un error!',
              showConfirmButton: false,
              timer: 1800,
            });
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Selecciona un curso!',
        showConfirmButton: false,
        timer: 1800,
      });
    }
  }

  guardar(){
    if (this.editing) {
      this.cursoServices.update(this.curso, this.id_curso).subscribe((data)=>{
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Curso Guardado',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getCursos();
      },(error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'A ocurrido un error!',
          showConfirmButton: false,
          timer: 1800,
        });
      });
    }
    else{
      this.cursoServices.store(this.curso).subscribe((data)=>{
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Curso Guardado',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getCursos();
      },(error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'A ocurrido un error!',
          showConfirmButton: false,
          timer: 1800,
        });
      });
    }
    this.modal.dismissAll();
    this.formCurso.reset();
  }

  cerrar(){
    this.modal.dismissAll();
    this.formCurso.reset();
  }

  ngOnInit():void {
    //this.rowData2 = this.http.get('https://www.ag-grid.com/example-assets/small-row-data.json');
    //this.rowData2 = this.cursoServices.index();
    //this.rowData2 = this.http.get('https://www.ag-grid.com/example-assets/olympic-winners.json');
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    this.id_curso = selectedData.map(node=>node.cur_cod);
  }
}