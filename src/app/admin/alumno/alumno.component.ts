import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlumnoService } from '../services/alumno.service';
import { Departamento } from '../interface/departamento';
import { Provincia } from '../interface/provincia';
import { Distrito } from '../interface/distrito';
import { Alumno } from '../interface/alumno';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  formAlumno: FormGroup;

  createFormGroup() {
    return new FormGroup({
      codModular: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      nroMatricula: new FormControl('', [Validators.required]),
      apPaterno: new FormControl('', [Validators.required]),
      apMaterno: new FormControl('', [Validators.required]),
      nombres: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
      escala: new FormControl('', [Validators.required]),
      añoIngreso: new FormControl('', [Validators.required]),
      depAlumno: new FormControl('', [Validators.required]),
      provAlumno: new FormControl('', [Validators.required]),
      distAlumno: new FormControl('', [Validators.required]),
      lenguaMaterna: new FormControl('', [Validators.required]),
      estadoCivil: new FormControl('', [Validators.required]),
      religion: new FormControl('', [Validators.required]),
      fechaBautizo: new FormControl('', [Validators.required]),
      parroquia: new FormControl('', [Validators.required]),
      colegioProc: new FormControl(''),
      direccion: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      depDomicilio: new FormControl('', [Validators.required]),
      provDomicilio: new FormControl('', [Validators.required]),
      distDomicilio: new FormControl('', [Validators.required]),
      transporte: new FormControl('', [Validators.required]),
      tiempoDemora: new FormControl('', [Validators.required]),
      materialVivienda: new FormControl('', [Validators.required]),
      electricidad: new FormControl('', [Validators.required]),
      aguaPotable: new FormControl('', [Validators.required]),
      desague: new FormControl('', [Validators.required]),
    });
  }

  //get codEducando() { return this.formAlumno.get('codEducando'); }



  get depAlumno() { return this.formAlumno.get('depAlumno'); }

  private gridApi;
  private gridColumnApi;

  columnDefs;
  defaultColDef;
  rowData: any;
  editing = false;
  accion = "";

  departamentos: Departamento[];
  departamento: Departamento;
  provincias: Provincia[];
  provincia: Provincia;
  distritos: Distrito[];
  distrito: Distrito;
  /*alumno: Alumno = {
    department_id: null,
  };*/
  alumno: Alumno={};
  alumnoini:Alumno={};
  alumnos: Alumno[];
  dni_alumno;

  constructor(private formBuilder: FormBuilder, private modal: NgbModal, private alumnoService: AlumnoService) {
    this.columnDefs = [
      /*{
        headerName: "Nivel",
        field: 'nivel',
        sortable: true,
        checkboxSelection: true,
        suppressSizeToFit: true,
        width: 100,
      },*/
      {
        headerName: "DNI",
        field: 'alu_dni',
        sortable: true,
        minWidth: 100,
        maxWidth: 120,
        flex: 1,
        
        //width: 100,
      },
      {
        headerName: "Apellido Paterno",
        field: 'alu_apellidop',
        sortable: true,
        minWidth: 200,
        flex: 1,
      },
      {
        headerName: "Apellido Materno",
        field: 'alu_apellidom',
        sortable: true,
        minWidth: 200,
        flex: 1,
      },
      {
        headerName: "Nombres",
        field: 'alu_nombres',
        sortable: true,
        minWidth: 300,
        flex: 2,
      },
      {
        headerName: "Sexo",
        field: 'alu_sexo',
        //minWidth: 90,
        //sortable: true,
        width: 90,
      },
      
    ];
    this.defaultColDef = { resizable: true };
    this.getAlumnos();
    this.formAlumno = this.createFormGroup();
    alumnoService.getDepartamentos().subscribe((data: Departamento[]) => {
      this.departamentos = data;
      //console.log(this.departamentos);
    });
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.alumnoService.index();
  }

  opensave(contenido) {
    this.editing=false;
    this.accion='Nuevo';
    this.modal.open(contenido, { size: 'lg', backdrop: 'static', scrollable: true });
  }

  openedit(contenido) {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    this.getSelectedRows();
    if(selectedData.length > 0){
      this.editing=true;
      this.accion='Editar';
      //console.log(this.dni_alumno);
      //console.log(selectedData);
      selectedData.map((node)=>{
        this.alumno = node;
      });
      //console.log("Antes: " + this.alumno.alu_nombres);
      /*this.alumnoService.getProvincias(this.alumno.department_id).subscribe((data: Provincia[]) => {
        this.provincias = data;
      });*/
      this.departamentoD();
      this.provinciaD();
      //console.log(this.provincias);
      /*this.alumno = this.rowData.find((m:Alumno) => {
        return m.alu_dni == this.dni_alumno
      });*/
      this.modal.open(contenido, { size:"lg", backdrop: "static" });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Selecciona un alumno!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    //this.modal.open(contenido, { size: 'lg', backdrop: 'static', scrollable: true });
    //console.log(this.dni_alumno);
  }

  cerrarModal() {
    this.limpiarForm();
    this.modal.dismissAll();
  }

  guardar() {
    //if(!this.formAlumno.invalid){
      if (this.editing) {
        //console.log("despues" + this.alumno.alu_nombres);
        this.alumnoService.update(this.alumno,this.alumno.alu_dni).subscribe(data=>{
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Alumno Guardado',
            showConfirmButton: false,
            timer: 1500,
          });
          this.getAlumnos();
        },error=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A ocurrido un error!',
            showConfirmButton: false,
            timer: 1500,
          });
        });
      } else {
        //console.log(this.alumno);
        this.alumnoService.store(this.alumno).subscribe(data=>{
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Alumno Guardado',
            showConfirmButton: false,
            timer: 1500,
          });
          this.getAlumnos();
        },error=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A ocurrido un error!',
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    /*} else {
      Swal.fire({
        icon:"error",
        title:'Ocurrió un error',
        text:'Hay campos invalidos'
      });
    }*/
    this.limpiarForm();
    this.modal.dismissAll();
  }

  eliminar() {
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
          //console.log(this.dni_alumno);
          this.alumnoService.destroy(this.dni_alumno).subscribe((data)=>{
            Swal.fire({
              icon: 'success',
              title: 'Eliminado!',
              text: 'El curso ha sido eliminado',
              showConfirmButton: false,
              timer: 1500,
            });
            this.getAlumnos();
          },(error)=>{
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'A ocurrido un error!',
              showConfirmButton: false,
              timer: 1500,
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
        timer: 1500,
      });
    }
  }

  ngOnInit(): void {
    /*this.formAlumno = this.formBuilder.group({
      codigoEducando:   [,[Validators.required,Validators.minLength(3)]],
      nombre:   [,Validators.required]
    })*/
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    this.dni_alumno = selectedData.map(node=>node.alu_dni);
  }

  limpiarForm() {
    this.alumno=this.alumnoini;
    this.formAlumno.reset();
  }
  
  getAlumnos() {
    this.alumnoService.index().subscribe(
      (data) => {
        this.rowData = data;
      },
      (error) => {
        console.log("Ocurrio un error");
      }
    );
  }

  departamentoD() {
    this.alumnoService.getProvincias(this.alumno.department_id).subscribe((data: Provincia[]) => {
      this.provincias = data;
    });
    //console.log("departamento" + this.alumno.department_id);
  }

  provinciaD() {
    this.alumnoService.getDistritos(this.alumno.province_id).subscribe((data: Distrito[]) => {
      this.distritos = data;
    });
    //console.log(this.alumno.province_id);
  }

  provAlumno() {

  }
}
