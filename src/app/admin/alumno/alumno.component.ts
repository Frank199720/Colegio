import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  private gridApi;
  private gridColumnApi;

  columnDefs;
  defaultColDef;
  rowData: any;

  constructor(private modal:NgbModal) {
    this.columnDefs = [
      { 
        headerName: "Nivel", 
        field: 'nivel', 
        sortable: true, 
        checkboxSelection: true,
        suppressSizeToFit: true,
        width: 100,
      },
      { 
        headerName: "Apellido Paterno", 
        field: 'apellidopaterno', 
        sortable: true, 
        checkboxSelection: true, 
      },
      { 
        headerName: "Apellido Materno", 
        field: 'apellidomaterno', 
        sortable: true 
      },
      { 
        headerName: "Nombres", 
        field: 'nombres', 
        sortable: true 
      },
    ];
    this.defaultColDef = { resizable: true };
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  OnGridReady(params ){
    this.gridApi=params.api;
  }
  /*onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    //this.rowData = this.categoriaServices.get();
    
  }*/

  ngOnInit(): void {
  }

}
