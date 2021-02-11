import { Component, OnInit } from "@angular/core";
import { Matricula } from "../interface/matricula";
import { TemplateRef } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { MatriculaService } from "../services/matricula.service";
import { AlumnoService } from "../services/alumno.service";
import { Route } from "@angular/compiler/src/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-matricula",
  templateUrl: "./matricula.component.html",
  styleUrls: ["./matricula.component.css"],
})
export class MatriculaComponent implements OnInit {
  accion: string;
  nombre:string;
  apellidopaterno:string;
  apellidomaterno:string;
  id_matricula: any;
  editing: boolean;
  gridApi: any;
  columnDefs = [
    { field: "per_dni", headerName: "N° MATRICULA", width: "100" },
    { field: "alu_dni", headerName: "COD ALUMNO" },
    { field: "mat_fechar", headerName: "FECHA REGISTRO" },
    { field: "niv_descripcion", headerName: "NIVEL", resizable: true },
    { field: "gra_descripcion", headerName: "GRADO" },
    { field: "sec_letra", headerName: "SECCION", resizable: true },
    { field: "mat_anio", headerName: "AÑO ESCOLAR", resizable: true },
  ];
  rowData: any;
  matricula: Matricula = {
    mat_num: null,
    alu_dni: null,
    mat_anio: null,
    mat_fechar: null,
    niv_cod: null,
    gra_cod: null,
    sec_cod: null,
  };
  constructor(
    private modal: NgbModal,
    private matriculaService: MatriculaService,
    private alumnoService: AlumnoService,
    private router:Router
  ) {}
  openSave(modalmatricula) {
    

    this.modal.open(modalmatricula, { size: "lg", backdrop: "static" });
  }
  openEdit(modalmatricula) {
    this.getSelectedRows();
    if (this.id_matricula) {
      this.editing = true;
      console.log(this.id_matricula);
      this.accion = "Edicion de matricula";
      this.matricula = this.rowData.find((m) => {
        return m.per_dni == this.id_matricula;
      });

      this.modal.open(modalmatricula, {
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
    
      if (this.editing) {
        console.log("hola");
        console.log(this.matricula);
        this.matriculaService.editar(this.matricula).subscribe(
          (data) => {
            Swal.fire({
              icon: "success",
              title: "El registro se ha editado correctamente",
              showConfirmButton: false,
            });
            this.closeModal("modalmatricula");
            
            //this.getPersona();
          },
          (error) => {
            alert("Error al editar");
          }
        );
      } else {
        console.log("hola");
        this.matriculaService.save(this.matricula).subscribe(
          (data) => {
            Swal.fire({
              icon: "success",
              title: "El registro ha sido guardado",
              showConfirmButton: false,
            });
            this.closeModal("modalmatricula");
            
            //this.getPersona();
          },
          (error) => {
            console.log(this.matricula);
            alert("Error al guardar");
          }
        );
      }
    
  }
  closeModal(modal) {
    
    this.modal.dismissAll(modal);
  }
  ngOnInit(): void {}
  OnGridReady(params) {
    this.gridApi = params.api;
  }
  getSelectedRows() {
    const selectNode = this.gridApi.getSelectedNodes();
    const selectData = selectNode.map((node) => node.data);
    const idSelected = selectData.map((node) => node.per_dni);
    console.log(selectNode);
    this.id_matricula = idSelected[0];
    console.log(this.id_matricula);
  }
  
  eliminar() {
    this.getSelectedRows();
    if (this.id_matricula) {
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
          this.matriculaService.delete(this.id_matricula).subscribe(
            (data) => {
              Swal.fire("Deleted!", "El registro se ha eliminado", "success");
              //this.getPersona();
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
  getAlumnobyId(){
    this.alumnoService.getAlumnobyId(this.matricula.alu_dni).subscribe(
      (data) => {
        this.nombre="Gola";
        console.log(data);
      },
      (error) => {
        Swal.fire({
          title: 'Alumno inexistente',
          text: "¿Desea ir a la página de registro?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí'
        }).then((result) => {
          if (result.isConfirmed) {
            this.modal.dismissAll();
            this.router.navigateByUrl('colegio/alumno');
          }
        })
        this.matricula.alu_dni="";
        console.log("Ocurrio un error");
      }
    );
  }
}
