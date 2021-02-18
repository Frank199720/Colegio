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

@Component({
  selector: "app-personal",
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.css"],
})
export class PersonalComponent implements OnInit {
  accion: string;
  formPersonal: FormGroup;
  id_personal: any;
  editing: boolean;
  gridApi: any;
  departamentos: Departamento[];
  //Definicion de GRID
   
  columnDefs = [
    { field: "per_dni", headerName: "DNI", width: "100" },
    { field: "per_apellidos", headerName: "APELLIDOS" },
    { field: "per_nombres", headerName: "NOMBRES" },
    { field: "per_direccion", headerName: "DIRECCION", resizable: true },
    { field: "per_ingreso", headerName: "Fecha de Ingreso",filterParams: filterParams},
    //{ field: "dep_descripcion", headerName: "DEPARTAMENTO", resizable: true },
    { field: "dep_cod", headerName: "COD DEP", resizable: true, hide:true},  
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
  niveles:Nivel[];
  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private personalService: PersonalService,
    private departamentoService: DepartamentosService,
    private cursoService: CursoService
  ) {
    departamentoService.getDep().subscribe((data: Departamento[]) => {
      this.departamentos = data;
    });
    this.getPersona();
    cursoService.getNiveles().subscribe((data:Nivel[])=>{
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
      
    }else{
      Swal.fire({
        icon:"error",
        title:'Ocurrió un error',
        text:'Hay campos vacios'
      })
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
      //depPersonal: [, Validators.required],
      //sexoPersonal: [, Validators.required],
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
  getSelectedRows() {
    const selectNode = this.gridApi.getSelectedNodes();
    const selectData = selectNode.map((node) => node.data);
    const idSelected = selectData.map((node) => node.per_dni);
    console.log(selectNode);
    this.id_personal = idSelected[0];
    console.log(this.id_personal)
  }
  limpiarForm() {
    this.personal=this.personalini;
  }
  eliminar(){
    this.getSelectedRows();
    if(this.id_personal){
      Swal.fire({
        title: '¿Estás seguro de eliminar?',
        text: "No podras revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.personalService.delete(this.id_personal).subscribe((data)=>{
            Swal.fire(
              'Deleted!',
              'El registro se ha eliminado',
              'success'
            )
            this.getPersona();
          },(error)=>{
            alert("No se pudo eliminar");
          })
          
        }
      })
    }else{
      Swal.fire({
        title: "Error",
        text: "Selecciona una fila",
        icon: "error",
      });
    }
    
  }
  
}
var filterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    var dateParts = dateAsString.split('/');
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
