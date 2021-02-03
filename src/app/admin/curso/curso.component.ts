import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Curso } from '../interface/curso';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  
  // formCurso:FormGroup = this.formBuilder.group({
  //   codigo:   [,[Validators.required,Validators.minLength(3)]],
  //   nombre:   [,Validators.required]
  // })
  // campoEsValido(campo:string){
  //   console.log(this.formCurso.controls[campo].errors)
  //   return this.formCurso.controls[campo].touched
  //  }
  curso:Curso={
    CUR_DESCRIPCION:null,
    CUR_ABR:null,
  };
  rowData:any;
  columnDefs =[
    { field:'producto_id',resizable:true},
    { field:'descripcion',resizable:true},
    
    { field:'categoria'},
  
    { field:'unidad'},
    { field:'precio'},
    { field:'cantidad'},
    
  ];
  //variables de control
  gridApi:any;
  cursos:Curso[];
  edit:boolean;
  id_curso:any;
  

  constructor(private modal:NgbModal) { }
  saveCurso(){
    
  //  if(this.formCurso.invalid){
  //   this.formCurso.markAllAsTouched();
  //    return;
  //  }
  }
  opensave(contenido){
    this.modal.open(contenido,{size:'lg'});
    this.edit=true;
  }
  openedit(contenido){
    this.getSelectedRows();
    if(this.id_curso){
      this.edit=true;
    }else{
      alert("Seleccione una fila");
    }
  }
  eliminar(){

  }
  OnGridReady(params ){
    this.gridApi=params.api;
  }
  getSelectedRows(){
    const selectNode= this.gridApi.getSelectedNodes();
    const selectData = selectNode.map(node=>node.data);
    const idSelected= selectData.map(node=>node.producto_id);
    this.id_curso=idSelected[0];
  
  }
  ngOnInit(): void {
  }

}
