import { Component, OnInit } from '@angular/core';

//Objetos y servicios
import { Departamento } from '../interface/departamento';
import { Personal } from '../interface/personal';
import { DepartamentosService } from '../services/departamentos.service';
import { PersonalService } from '../services/personal.service';



//Complementos
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';
import { FormBuilder, FormControl, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  accion:string;
  formPersonal:FormGroup;
  id_personal:any;
  editing:boolean;
  gridApi:any;
  departamentos:Departamento[];
  //Definicion de GRID
  columnDefs=[
    {field:'per_cod',headerName:'DNI',width:'100',hide:true},
    {field:'per_dni',headerName:'DNI',width:'100'},
    {field:'per_apellidos',headerName:'APELLIDOS'},
    {field:'per_nombres',headerName: 'NOMBRES'},
    {field:'departamento',headerName:'DEPARTAMENTO',resizable: true},
    {field:'per_direccion',headerName: 'DIRECCION',resizable: true}
  ];
  rowData:any;
  //Definicion de Personal
  personal:Personal={
    per_dni:null,
    per_apellidos:null,
    per_nombres:null,
    dep_cod:null,
    per_direccion:null,
    per_estadocivil:null,
    per_telefono:null,
    per_segurosocial:null,
    per_ingreso:null,
    
  }
  personals:Personal[];
  constructor(private formBuilder:FormBuilder,private modal:NgbModal , private personalService:PersonalService , private departamentoService:DepartamentosService) {
    departamentoService.getDep().subscribe((data:Departamento[])=>{
      this.departamentos=data;
    })
    this.getPersona();
   }
  openSave(modalPersonal){
    this.editing=false;
    this.accion="Registro de personal";
    this.modal.open(modalPersonal,{size:'lg',backdrop:'static'});
  }
  openEdit(modalPersonal){
    this.getSelectedRows();
    if(this.id_personal){
      this.editing=true;
      this.accion="Edicion de personal";
      this.personalService.getPersonal().subscribe((data:Personal[])=>{
          this.personals=data;
          console.log(data);
          this.personal=this.personals.find((m)=>{return m.per_cod==this.id_personal})
          console.log(this.personal);
          this.modal.open(modalPersonal,{size:'lg',backdrop:'static',keyboard:false})
      })
      
    }else{
      Swal.fire({
        title:'Error',
        text:'Selecciona una fila',
        icon:'error'
      })
    }
  }
  Guardar(){
    if(this.editing){
      console.log('hola');
      console.log(this.personal);
        this.personalService.editar(this.personal).subscribe((data)=>{
          Swal.fire({
            icon: 'success',
            title: 'El registro se ha editado correctamente',
            showConfirmButton: false,
          })
          this.closeModal('modalPersonal');
          this.getPersona();
        },(error)=>{
          alert("Error al editar");
        })
    }else{
      console.log('hola');
      this.personalService.save(this.personal).subscribe((data)=>{
        Swal.fire({
          icon: 'success',
          title: 'El registro ha sido guardado',
          showConfirmButton: false,
        })
        this.closeModal('modalPersonal');
        this.getPersona();
      },(error)=>{
        console.log(this.personal)
        alert('Error al guardar');
      })
    }
  }
  closeModal(modal){
    this.modal.dismissAll(modal);
  }
  ngOnInit(): void {
    this.formPersonal = this.formBuilder.group({
      codPersonal:   [,[Validators.required,Validators.minLength(3)]],
      nombrePersonal:   [,[Validators.required,Validators.minLength(3)]],
      dniPersonal:   [,[Validators.required,Validators.minLength(3)]],
      direccionPersonal:   [,[Validators.required,Validators.minLength(3)]],
      telefonoPersonal:   [,[Validators.required,Validators.minLength(3)]],
      seguroPersonal:   [,[Validators.required,Validators.minLength(3)]],
      fechaPersonal:   [,Validators.required],
      depPersonal:   [,Validators.required],
      sexoPersonal:   [,Validators.required]
    })
  }
  getPersona(){
    this.personalService.getPersonal().subscribe((data)=>{
      this.rowData=data;
    },(error)=>{
      console.log("Ocurrio un error");
    });
  }
  OnGridReady(params ){
    this.gridApi=params.api;
  }
  getSelectedRows(){
    const selectNode= this.gridApi.getSelectedNodes();
    const selectData = selectNode.map(node=>node.data);
    const idSelected= selectData.map(node=>node.per_cod);
    this.id_personal=idSelected[0];
  
  }
}
