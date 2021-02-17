import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { Nota } from '../../interface/nota';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  
   gridApi;
   gridColumnApi;
   columnDefs;
   rowData;
   defaultColDef;
   private idcurso:number;
   private idgrado:number;
   private idseccion:string;
   private notas:Nota[]=[];
   private nota: Nota = {
    cur_cod:null,
    mat_num:null,
    alu_dni:null,
    no_calificacion:null,
    no_periodo:null,
  };
  constructor(private rutaActive:ActivatedRoute) {
    this.columnDefs = [
      {
        headerName: 'Codigo De Alumno',
        field: 'a',
        
       
      },
      {
        headerName: 'Apellidos y Nombres',
        field: 'b',
        
        
      },
      {
        headerName: 'N1',
        field: 'c',
        editable: true,
        valueParser: this.numberValueParser,
      },
      {
        headerName: 'N2',
        field: 'd',
        valueParser: this.numberValueParser,
        editable: true,
        
      },
      {
        headerName: 'N3',
        field: 'e',
        valueParser: this.numberValueParser,
        editable: true,
        
      },
      {
        headerName: 'PROMEDIO',
        field:'f',
        valueGetter: '(data.c + data.d + data.e)/ 3',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
      },
      
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 120,
      resizable: true,
      cellClass: 'align-right',
      
    };
    this.rowData = this.createRowData();
   }

  ngOnInit(): void {
    this.idcurso = this.rutaActive.snapshot.params.idcurso;
    this.idgrado = this.rutaActive.snapshot.params.idgrado;
    this.idseccion = this.rutaActive.snapshot.params.idseccion;
  }
  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  createRowData(){
    var rowData = [];
  for (var i = 0; i < 20; i++) {
    rowData.push({
      a: "Codigo Alumno"+i,
      b: "Apellidos y Nombres",
      c: 10,
      d: 10,
      e: 10,
      
    });
  }
  return rowData;
  }
  numberValueParser(params) {
    return Number(params.newValue);
  }
  formatNumber(number) {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  verJson(){
    let obj={};
    var i=0;
    this.rowData.forEach(item => {
      this.nota.cur_cod=this.idcurso;
      this.nota.mat_num='1234';
      this.nota.alu_dni='12345678';
      this.nota.no_calificacion=item.c;
      this.nota.no_periodo=1;
      console.log(this.nota);
      
     this.notas.push({
       cur_cod:this.idcurso,
       mat_num:'1234',
       alu_dni:'12345678',
       no_calificacion:item.c,
       no_periodo:1
     });
     this.notas.push({
      cur_cod:this.idcurso,
      mat_num:'1234',
      alu_dni:'12345678',
      no_calificacion:item.d,
      no_periodo:2
    });
    this.notas.push({
      cur_cod:this.idcurso,
      mat_num:'1234',
      alu_dni:'12345678',
      no_calificacion:item.e,
      no_periodo:3
    });
      i++;
      console.log(i);
    });
    for(let item in this.rowData){
        
    }
    let json=JSON.stringify(this.rowData);
    let json2=JSON.stringify(this.notas);
    
    console.log(json2);
     
    
  }
  restartValores(){

  }
  onCellValueChanged(event) {
    console.log('data after changes is: ', event );
     
      // rowNode.setDataValue('d', Math.floor(Math.random() * 10000));
      //  rowNode.setDataValue('e', Math.floor(Math.random() * 10000));
     if(event.data.c>20 || event.data.c<0){
      var rowNode = this.gridApi.getDisplayedRowAtIndex(event.rowIndex);
      rowNode.setDataValue('c',event.oldValue);
      console.log(rowNode);
    }
    if(event.data.d>20 || event.data.d<0){
      var rowNode = this.gridApi.getDisplayedRowAtIndex(event.rowIndex);
      rowNode.setDataValue('d',event.oldValue);
      console.log(rowNode);
    }
    if(event.data.e>20 || event.data.e<0){
      var rowNode = this.gridApi.getDisplayedRowAtIndex(event.rowIndex);
      rowNode.setDataValue('e',event.oldValue);
      console.log(rowNode);
    }
  }
}
