import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { AsignacionService } from '../../services/asignacion.service';

@Component({
  selector: 'app-cursosa',
  templateUrl: './cursosa.component.html',
  styleUrls: ['./cursosa.component.css']
})
export class CursosaComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;


  private gridApi;
  private gridColumnApi;
  idPersonal:string;
  columnDefs;
  defaultColDef;
  rowData;
  idCurso;
  idSeccion;
  idGrado;
  datos=[{
    Curso: 'curso',
    Grado: 'Grado',
    Seccion: 'Seccion',
    Alumnos: 'Alumnos',
  }];
  constructor(private router:Router , private asignacionService:AsignacionService) { 
    this.idPersonal=localStorage.getItem('token');
    this.columnDefs = [
    { field: "per_dni", headerName: "DNI", width: "100", hide: true },
    { field: "cur_cod", headerName: "Codigo Curso", hide: true },
    { field: "sec_cod", headerName: "Codigo seccion", hide: true },
    { field: "grad_cod", headerName: "Codigo Grado", hide: true },
    { field: "cur_descripcion", headerName: "Curso" },
    { field: "gra_descripcion", headerName: "Grado" },
    { field: "sec_letra", headerName: "Seccion" },
    ];
    this.defaultColDef = { resizable: true };
    this.asignacionService.getAsignacionByPersonal(this.idPersonal).subscribe((data)=>{
      this.rowData=data;
    });
  }
  onSelectionChanged(params) {
    var selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
    this.idCurso = selectedRows[0].cur_cod;
    this.idGrado= selectedRows[0].gra_cod;
    this.idSeccion=selectedRows[0].sec_cod;
    
  }
  ngOnInit(): void {
  }

  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    
    //this.rowData = this.alumnoService.index();
  }

  registrar(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    //this.datos = selectedData.map(node=>node.alu_dni);
    console.log(selectedData[0]);
    const ruta= "colegio/profesor/notas/"+this.idCurso+"/"+this.idGrado +"/"+this.idSeccion;
    this.router.navigateByUrl(ruta);
    
  }

}
