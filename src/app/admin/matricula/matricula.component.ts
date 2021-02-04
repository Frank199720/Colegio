import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {
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
      },
      { 
        headerName: "Nivel", 
        field: 'nivel', 
        sortable: true, 
      },
      { 
        headerName: "año", 
        field: 'año', 
        sortable: true 
      },
      { 
        headerName: "Seccion", 
        field: 'seccion', 
        sortable: true 
      },
      { 
        headerName: "Apellido Paterno", 
        field: 'apellidopaterno', 
        sortable: true,  
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

  nuevo(matricula){
    this.modal.open(matricula, {size:'lg',backdrop:'static',scrollable:true});
  }
  ngOnInit(): void {
  }

}
