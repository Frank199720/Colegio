import { Component, OnInit } from "@angular/core";

//Objetos y servicios
import { Departamento } from "../interface/departamento";
import { Personal } from "../interface/personal";
import { DepartamentosService } from "../services/departamentos.service";
import { PersonalService } from "../services/personal.service";
import { CursoService } from "../services/curso.service";

//Complementos
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AgGridAngular } from "ag-grid-angular";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import Swal from "sweetalert2";
import { CursosaComponent } from "../profesor/cursosa/cursosa.component";
import { Nivel } from "../interface/nivel";
import { MatriculaService } from "../services/matricula.service";
import { Grado } from "../interface/grado";
import { Seccion } from "../interface/seccion";
import { Asignacion } from '../interface/asignacion';
import { elementEventFullName } from "@angular/compiler/src/view_compiler/view_compiler";
import { stringify } from '@angular/compiler/src/util';
import { Curso } from '../interface/curso';
import { ThisReceiver } from "@angular/compiler";
import { AsignacionService } from '../services/asignacion.service';

@Component({
  selector: "app-personal",
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.css"],
})
export class PersonalComponent implements OnInit {
  accion: string;
  seccionid;
  formPersonal: FormGroup;
  id_personal: any;
  editing: boolean;
  gridApi: any;
  gridApiAsignacion: any;
  curso:Curso[];
  departamentos: Departamento[];
  idPersona:string;
  grado: Grado[];
  seccion: Seccion[];
  private asignacion:Asignacion;
  private asignacionArray:Asignacion[]=[];
  private idCurso: string;
  cursoid:number;
  gradoid: number;
  
  //Definicion de GRID
  columnAsignacion = [
    { field: "per_dni", headerName: "DNI", width: "100", hide: true },
    { field: "cur_cod", headerName: "Codigo Curso", hide: true },
    { field: "sec_cod", headerName: "Codigo seccion", hide: true },
    { field: "cur_descripcion", headerName: "Curso" },
    { field: "gra_descripcion", headerName: "Grado" },
    { field: "sec_letra", headerName: "Seccion" },
  ];
  rowAsignacion: any;
  columnDefs = [
    { field: "per_dni", headerName: "DNI", width: "100" },
    { field: "per_apellidos", headerName: "APELLIDOS" },
    { field: "per_nombres", headerName: "NOMBRES" },
    { field: "per_direccion", headerName: "DIRECCION", resizable: true },
    {
      field: "per_ingreso",
      headerName: "Fecha de Ingreso",
      filterParams: filterParams,
    },
    //{ field: "dep_descripcion", headerName: "DEPARTAMENTO", resizable: true },
    { field: "dep_cod", headerName: "COD DEP", resizable: true, hide: true },
  ];
  rowData: any;

  //Definicion de Personal
  personal: Personal = {
    per_dni: null,
    per_apellidos: null,
    per_nombres: null,
    //dep_cod: null,
    per_direccion: null,
    per_estadocivil: null,
    per_telefono: null,
    per_segurosocial: null,
    per_ingreso: null,
  };
  personalini: Personal = {
    per_dni: null,
    per_apellidos: null,
    per_nombres: null,
    //dep_cod: null,
    per_direccion: null,
    per_estadocivil: null,
    per_telefono: null,
    per_segurosocial: null,
    per_ingreso: null,
  };
  personals: Personal[];
  niveles: Nivel[];
  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private personalService: PersonalService,
    private departamentoService: DepartamentosService,
    private cursoService: CursoService,
    private matriculaService: MatriculaService,
    private asignacionService:AsignacionService
  
  ) {
    // departamentoService.getDep().subscribe((data: Departamento[]) => {
    //   this.departamentos = data;
    // });
    this.getPersona();
    cursoService.getNiveles().subscribe((data: Nivel[]) => {
      this.niveles = data;
    });
  }
  openSave(modalPersonal) {
    this.editing = false;
    this.accion = "Registro de personal";
    this.formPersonal.reset();
    this.modal.open(modalPersonal, { size: "lg", backdrop: "static" });
  }
  openEdit(modalPersonal) {
    this.getSelectedRows();
    if (this.id_personal) {
      this.editing = true;
      console.log(this.id_personal);
      this.accion = "Edicion de personal";
      this.personal = this.rowData.find((m) => {
        return m.per_dni == this.id_personal;
      });

      this.modal.open(modalPersonal, {
        size: "lg",
        backdrop: "static",
        keyboard: false,
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Selecciona una fila",
        icon: "error",
      });
    }
  }
  Guardar() {
    if (!this.formPersonal.invalid) {
      if (this.editing) {
        console.log("hola");
        console.log(this.personal);
        this.personalService.editar(this.personal).subscribe(
          (data) => {
            Swal.fire({
              icon: "success",
              title: "El registro se ha editado correctamente",
              showConfirmButton: false,
            });
            this.closeModal("modalPersonal");
            this.limpiarForm();
            this.getPersona();
          },
          (error) => {
            alert("Error al editar");
          }
        );
      } else {
        console.log("hola");
        this.personalService.save(this.personal).subscribe(
          (data) => {
            Swal.fire({
              icon: "success",
              title: "El registro ha sido guardado",
              showConfirmButton: false,
            });
            this.closeModal("modalPersonal");
            this.limpiarForm();
            this.getPersona();
          },
          (error) => {
            console.log(this.personal);
            alert("Error al guardar");
          }
        );
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Ocurrió un error",
        text: "Hay campos vacios",
      });
    }
  }
  closeModal(modal) {
    this.limpiarForm();
    this.modal.dismissAll(modal);
  }
  ngOnInit(): void {
    this.formPersonal = this.formBuilder.group({
      codPersonal: [, [Validators.required]],
      nombrePersonal: [, [Validators.required]],
      dniPersonal: [, [Validators.required]],
      direccionPersonal: [, [Validators.required]],
      telefonoPersonal: [, [Validators.required]],
      seguroPersonal: [, [Validators.required]],
      fechaPersonal: [, Validators.required],
      nivel: [, Validators.required],
      sexoPersonal: [, Validators.required],
    });
  }
  getPersona() {
    this.personalService.getPersonal().subscribe(
      (data) => {
        this.rowData = data;
      },
      (error) => {
        console.log("Ocurrio un error");
      }
    );
  }
  OnGridReady(params) {
    this.gridApi = params.api;
  }
  OnGridReadyAsignacion(params) {
    this.gridApiAsignacion = params.api;
  }
  getSelectedRows() {
    const selectNode = this.gridApi.getSelectedNodes();
    const selectData = selectNode.map((node) => node.data);
    const idSelected = selectData.map((node) => node.per_dni);
    console.log(selectNode);
    this.id_personal = idSelected[0];
    console.log(this.id_personal);
  }
  limpiarForm() {
    this.personal = this.personalini;
  }
  eliminar() {
    this.getSelectedRows();
    if (this.id_personal) {
      Swal.fire({
        title: "¿Estás seguro de eliminar?",
        text: "No podras revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.personalService.delete(this.id_personal).subscribe(
            (data) => {
              Swal.fire("Deleted!", "El registro se ha eliminado", "success");
              this.getPersona();
            },
            (error) => {
              alert("No se pudo eliminar");
            }
          );
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Selecciona una fila",
        icon: "error",
      });
    }
  }
  asignarCurso(modal) {
  
    this.asignacionService.getAsignacionByPersonal(this.idPersona).subscribe((data)=>{
      this.rowAsignacion=data;
    })
    this.modal.open(modal, { size: "lg", backdrop: "static" });
    this.listaGrado();
  }
  listaGrado() {
    this.matriculaService.getGradobyNivel(parseFloat(this.idCurso)).subscribe(
      (data: Grado[]) => {
        this.grado = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  listaSeccion() {
    this.matriculaService.getSeccionByGrade(this.gradoid).subscribe(
      (data: Seccion[]) => {
        this.seccion = data;
        this.seccionid=null;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onSelectionChanged(params) {
    var selectedRows = this.gridApi.getSelectedRows();
    
    this.idCurso = selectedRows[0].niv_cod;
    this.idPersona = selectedRows[0].per_dni;
  }
  addItems(addIdex) {
    var newItems = [this.createNewRowData()];
    var res = this.gridApiAsignacion.applyTransaction({
      add: newItems,
    });
    this.printResult(res);
    this.getRowData();
    
    this.cursoid=null;
    //this.seccionid=null;
  }
  createNewRowData() {
    console.log(this.grado);
    let descripcion_grado:Grado;
    let descripcion_seccion:Seccion;
    let descripcion_curso:Curso;
    this.grado.forEach(element => {
      if(element.gra_cod==this.gradoid)
        descripcion_grado=element;
    });
    console.log(this.seccionid)
    this.seccion.forEach(element => {
      if(element.sec_cod==this.seccionid)
      descripcion_seccion=element;
    });
    this.curso.forEach(element => {
      if(element.cur_cod==this.cursoid)
      descripcion_curso=element;
    });
 
    var newData = {
      per_dni: this.idPersona,
      cur_cod: descripcion_curso.cur_cod,
      sec_cod: descripcion_seccion.sec_cod,
      cur_descripcion: descripcion_curso.cur_descripcion,
      gra_descripcion: descripcion_grado.gra_descripcion,
      sec_letra: descripcion_seccion.sec_letra
    };
    
    return newData;
  }
  printResult(res) {
    
    if (res.add) {
      res.add.forEach(function (rowNode) {
        
      });
    }
    if (res.remove) {
      res.remove.forEach(function (rowNode) {
        console.log("Removed Row Node", rowNode);
      });
    }
    if (res.update) {
      res.update.forEach(function (rowNode) {
        console.log("Updated Row Node", rowNode);
      });
    }
  }
  getRowData() {
    var rowData = [];
    this.gridApiAsignacion.forEachNode(function (node) {
      rowData.push(node.data);
      console.log('xd');
    });
    console.log(rowData);
  }
  GuardarAsignacion(){
    var rowDatax = [];
    
    this.gridApiAsignacion.forEachNode(function (node) {
      rowDatax.push(node.data);
      
    });
    console.log()
    rowDatax.forEach(element => {
      this.asignacionArray.push({
        per_dni:this.idPersona,
        cur_cod:element.cur_cod,
        sec_cod:element.sec_cod
      })
    });
    console.log(JSON.stringify(this.asignacionArray) );
    // this.asignacionService.deleteAsignacion(this.idPersona).subscribe((data)=>{
      
    // })
    this.asignacionService.deleteAsignacion(this.idPersona).subscribe((data)=>{
      this.asignacionService.insertAsignacion(JSON.stringify(this.asignacionArray)).subscribe(
        (data)=>{
          console.log(data)
        },
        (error)=>{
          console.log(error);
        }
      )
    })
    this.asignacionArray=[];
  }
  actualizarCurso(){
    console.log(this.gradoid);
    this.cursoService.getCursoByGrado(this.gradoid).subscribe(
      (data: Curso[]) => {
        this.curso = data;
        
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

var filterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    var dateParts = dateAsString.split("/");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
};
