import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlumnoService } from '../services/alumno.service';
import { Departamento } from '../interface/departamento';
import { Provincia } from '../interface/provincia';
import { Distrito } from '../interface/distrito';
import { Alumno } from '../interface/alumno';
import Swal from 'sweetalert2';
import { stringify } from '@angular/compiler/src/util';

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
      codModular: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      dni: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
      nroMatricula: new FormControl('', [Validators.required]),
      apPaterno: new FormControl('', [Validators.required]),
      apMaterno: new FormControl('', [Validators.required]),
      nombres: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
      escala: new FormControl('', [Validators.required]),
      añoIngreso: new FormControl('', [Validators.required, Validators.maxLength(4)]),
      depAlumno: new FormControl('', [Validators.required]),
      provAlumno: new FormControl({value: '', disabled: true}, [Validators.required]),
      distAlumno: new FormControl({value: '', disabled: true}, [Validators.required]),
      lenguaMaterna: new FormControl('', [Validators.required]),
      estadoCivil: new FormControl('', [Validators.required]),
      religion: new FormControl('', [Validators.required]),
      fechaBautizo: new FormControl('', [Validators.required]),
      parroquia: new FormControl('', [Validators.required]),
      colegioProc: new FormControl(''),
      direccion: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
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

  get codModular() { return this.formAlumno.get('codModular'); }
  get dni() { return this.formAlumno.get('dni'); }
  get nroMatricula() { return this.formAlumno.get('nroMatricula'); }
  get apPaterno() { return this.formAlumno.get('apPaterno'); }
  get apMaterno() { return this.formAlumno.get('apMaterno'); }
  get nombres() { return this.formAlumno.get('nombres'); }
  get sexo() { return this.formAlumno.get('sexo'); }
  get fechaNacimiento() { return this.formAlumno.get('fechaNacimiento'); }
  get pais() { return this.formAlumno.get('pais'); }
  get escala() { return this.formAlumno.get('escala'); }
  get añoIngreso() { return this.formAlumno.get('añoIngreso'); }
  get depAlumno() { return this.formAlumno.get('depAlumno'); }
  get provAlumno() { return this.formAlumno.get('provAlumno'); }
  get distAlumno() { return this.formAlumno.get('distAlumno'); }
  get lenguaMaterna() { return this.formAlumno.get('lenguaMaterna'); }
  get estadoCivil() { return this.formAlumno.get('estadoCivil'); }
  get religion() { return this.formAlumno.get('religion'); }
  get fechaBautizo() { return this.formAlumno.get('fechaBautizo'); }
  get parroquia() { return this.formAlumno.get('parroquia'); }
  get colegioProc() { return this.formAlumno.get('colegioProc'); }
  get direccion() { return this.formAlumno.get('direccion'); }
  get telefono() { return this.formAlumno.get('telefono'); }
  get depDomicilio() { return this.formAlumno.get('depDomicilio'); }
  get provDomicilio() { return this.formAlumno.get('provDomicilio'); }
  get distDomicilio() { return this.formAlumno.get('distDomicilio'); }
  get transporte() { return this.formAlumno.get('transporte'); }
  get tiempoDemora() { return this.formAlumno.get('tiempoDemora'); }
  get materialVivienda() { return this.formAlumno.get('materialVivienda'); }
  get electricidad() { return this.formAlumno.get('electricidad'); }
  get aguaPotable() { return this.formAlumno.get('aguaPotable'); }
  get desague() { return this.formAlumno.get('desague'); }

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
  escalaArray=['A','B','C','D','E'];


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
      /*this.provAlumno.enable();
      this.distAlumno.enable();  */
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
      console.log("Departamento" + this.alumno.department_id);
      console.log("Provincia" + this.alumno.province_id);
      console.log("Distrito" + this.alumno.district_id);
      //this.provAlumno.disable();
      /*console.log("Departamento" + this.depAlumno);
      console.log("Provincia" + this.alumno.province_id);
      console.log("Distrito" + this.alumno.district_id);*/
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
    this.provincias=null;
    this.distritos=null;
    this.provAlumno.disable();
    this.distAlumno.disable();
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
    this.provAlumno.enable();
    //console.log("departamento" + this.alumno.department_id);
  }

  provinciaD() {
    this.alumnoService.getDistritos(this.alumno.province_id).subscribe((data: Distrito[]) => {
      this.distritos = data;
    });
    this.distAlumno.enable();
    //console.log(this.alumno.province_id);
  }

  /*provAlumno() {
    
  }*/
}
