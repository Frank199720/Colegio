import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-cursosa',
  templateUrl: './cursosa.component.html',
  styleUrls: ['./cursosa.component.css']
})
export class CursosaComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;


  private gridApi;
  private gridColumnApi;
  columnDefs;
  defaultColDef;
  rowData;
  datos=[{
    Curso: 'curso',
    Grado: 'Grado',
    Seccion: 'Seccion',
    Alumnos: 'Alumnos',
  }];
  constructor() { 
    this.columnDefs = [
      {
        headerName: "Curso",
        field: 'Curso',
        sortable: true,
        /*minWidth: 100,
        maxWidth: 120,
        flex: 1,*/
        
        //width: 100,
      },
      {
        headerName: "Grado",
        field: 'Grado',
        sortable: true,
        /*minWidth: 200,
        flex: 1,*/
      },
      {
        headerName: "Seccion",
        field: 'Seccion',
        sortable: true,
        /*minWidth: 200,
        flex: 1,*/
      },
      {
        headerName: "# Alumnos",
        field: 'Alumnos',
        sortable: true,
        /*minWidth: 300,
        flex: 2,*/
      },
    ];
    this.defaultColDef = { resizable: true };
  }

  ngOnInit(): void {
  }

  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData=this.datos;
    //this.rowData = this.alumnoService.index();
  }

  registrar(){
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    //this.datos = selectedData.map(node=>node.alu_dni);
    console.log(selectedData[0]);
  }

}
