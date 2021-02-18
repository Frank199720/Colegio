import { Component, OnInit } from "@angular/core";
import { Matricula } from "../interface/matricula";
import { TemplateRef } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { MatriculaService } from "../services/matricula.service";
import { AlumnoService } from "../services/alumno.service";
import { Route } from "@angular/compiler/src/core";
import { Router } from "@angular/router";
import { Grado } from "../interface/grado";
import { Seccion } from "../interface/seccion";
import { Nivel } from "../interface/nivel";
import { Alumno } from "../interface/alumno";
import { DataserviceService } from "../services/dataservice.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
@Component({
  selector: "app-matricula",
  templateUrl: "./matricula.component.html",
  styleUrls: ["./matricula.component.css"],
})
export class MatriculaComponent implements OnInit {
  formMatricula: FormGroup;
  accion: string;
  nombre: string;
  apellidopaterno: string;
  apellidomaterno: string;
  id_matricula: any;
  editing: boolean;
  grado: Grado[];
  seccion: Seccion[];
  nivel: Nivel[];
  gridApi: any;
  dateCurrent: Date = new Date();
  anio_current: string;
  current_date: string;
  columnDefs = [
    { field: "mat_num", headerName: "MATRICULA", minWidth: 140, maxWidth: 150},
    { field: "alu_dni", headerName: "DNI", flex: 1, minWidth: 110, maxWidth: 120 },
    { field: "alu_apellidop", headerName: "A. PATERNO", flex: 1, minWidth: 150, maxWidth: 160 },
    { field: "alu_apellidom", headerName: "A. MATERNO", flex: 1, minWidth: 150, maxWidth: 160 },
    { field: "alu_nombres", headerName: "NOMBRES", flex: 1, minWidth: 180, maxWidth: 250 },
    { field: "niv_descripcion", headerName: "NIVEL", flex: 1, minWidth: 100, maxWidth: 120 },
    { field: "gra_descripcion", headerName: "GRADO", flex: 1, minWidth: 100, maxWidth: 110 },
    { field: "sec_letra", headerName: "SECCION", flex: 1, minWidth: 110, maxWidth: 111},
    { field: "mat_anio", headerName: "AÑO ESCOLAR", flex: 1, minWidth: 100, maxWidth: 150 },
  ];

  defaultColDef = { resizable: true, sortable: true};

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
    private router: Router,
    private dataService: DataserviceService,
    private formBuilder: FormBuilder
  ) {
    matriculaService.getNiveles().subscribe((data: Nivel[]) => {
      this.nivel = data;
    });
    this.getMatricula();
  }

  openSave(modalmatricula) {
    this.editing=false;
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
    if (!this.formMatricula.invalid) {
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
            this.getMatricula();
            //this.getPersona();
          },
          (error) => {
            alert("Error al editar");
          }
        );
      } else {
        console.log(this.matricula);
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
    } else {
      Swal.fire({
        title: "Error",
        text: "Faltan campos que rellenar",
        icon: "error",
      });
    }
  }
  closeModal(modal) {
    this.modal.dismissAll(modal);
  }
  ngOnInit(): void {
    this.formMatricula = this.formBuilder.group({
      codEducando: ["", [Validators.required]],
      nroMatricula: ["", [Validators.required]],
      fechaRegistro: ["", [Validators.required]],
      nameStudent: ["", [Validators.required]],
      nivel: ["", [Validators.required]],
      grado: ["", [Validators.required]],
      seccion: ["", Validators.required],
      anio: ["", Validators.required],
    });
    this.getDateCurrent();
  }
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
  getAlumnobyId() {
    this.alumnoService.getAlumnobyId(this.matricula.alu_dni).subscribe(
      (data: Alumno) => {
        this.nombre =
          data.alu_apellidop.toUpperCase() +
          " " +
          data.alu_apellidom.toUpperCase() +
          " " +
          data.alu_nombres.toUpperCase();
        console.log(data);
      },
      (error) => {
        Swal.fire({
          title: "Alumno inexistente",
          text: "¿Desea ir a la página de registro?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí",
        }).then((result) => {
          if (result.isConfirmed) {
            this.modal.dismissAll();
            this.router.navigateByUrl("colegio/alumno");
          }
        });
        this.matricula.alu_dni = "";
        console.log("Ocurrio un error");
      }
    );
  }
  listaGrado() {
    this.matriculaService.getGradobyNivel(this.matricula.niv_cod).subscribe(
      (data: Grado[]) => {
        this.grado = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  listaSeccion() {
    this.matriculaService.getSeccionByGrade(this.matricula.gra_cod).subscribe(
      (data: Seccion[]) => {
        this.seccion = data;
        console.log("xd");
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getDateCurrent() {
    this.anio_current = this.dateCurrent.getFullYear().toString();
    console.log(this.dateCurrent.getDate());
    let mes =
      this.dateCurrent.getMonth() + 1 >= 10
        ? (this.dateCurrent.getMonth() + 1).toString()
        : "0" + (this.dateCurrent.getMonth() + 1).toString();
    let dia =
      this.dateCurrent.getDate() >= 10
        ? this.dateCurrent.getDate().toString()
        : "0" + this.dateCurrent.getDate().toString();
    this.matricula.mat_fechar = this.anio_current + "-" + mes + "-" + dia;

    this.matricula.mat_anio = this.dataService.anio;
  }
  getMatricula(){
    this.matriculaService.getMatricula().subscribe(
      (data) => {
        this.rowData = data;
      console.log(data);

      },
      (error) => {
        console.log("Ocurrio un error");
      }
    );
  }
  
}
