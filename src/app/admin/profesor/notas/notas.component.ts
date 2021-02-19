import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { Nota } from '../../interface/nota';
import { NotaService } from '../../services/nota.service';
import Swal from "sweetalert2";
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
   row:any;
   private nota: Nota = {
    cur_cod:null,
    mat_num:null,
    alu_dni:null,
    no_calificacion:null,
    no_periodo:null,
  };
  constructor(private rutaActive:ActivatedRoute, private NotaService:NotaService) {
    this.idcurso = this.rutaActive.snapshot.params.idcurso;
    this.idgrado = this.rutaActive.snapshot.params.idgrado;
    this.idseccion = this.rutaActive.snapshot.params.idseccion;
    
    //this.getData();
    
    
    
   }

  ngOnInit(): void {
   
    this.columnDefs = [
      {
        headerName: 'Codigo De Alumno',
        field: 'alu_dni',
        
       
      },
      {
        headerName: 'Apellidos y Nombres',
        field: 'alumno',
        
        
      },
      {
        headerName: 'Nro Matricula',
        field: 'mat_num',
        
        
      },
      {
        headerName: 'N1',
        field: 'Periodo1',
        editable: true,
        valueParser: this.numberValueParser,
      },
      {
        headerName: 'idN1',
        field: 'IDNota1',
        
        hide:true,
        
      },
      {
        headerName: 'N2',
        field: 'Periodo2',
        editable: true,
        valueParser: this.numberValueParser,
      },
      {
        headerName: 'idN2',
        field: 'IDNota2',
        
        hide:true,
        
      },
      {
        headerName: 'N3',
        field: 'Periodo3',
        editable: true,
        valueParser: this.numberValueParser,
      },
      {
        headerName: 'idN3',
        field: 'IDNota3',
        
        hide:true,
        
      },
      
      {
        headerName: 'PROMEDIO',
        field:'f',
        valueGetter: '(data.Periodo1 + data.Periodo2 + data.Periodo3)/ 3',
        valueFormatter: this.ajuste,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
      },
      
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 120,
      resizable: true,
      cellClass: 'align-right',
      
    };
    
  }
  ajuste(params){
    return (params.value).toFixed(2);
  }
  getData(){
    this.NotaService.getNotasByProfesor(this.idcurso,this.idgrado,this.idseccion).subscribe((data)=>{
      this.row=data;
      var rowDatax=[];
      this.row.forEach(element => {
      
        rowDatax.push({
          alu_dni: element.alu_dni,
          alumno: element.alumno,
          mat_num: element.mat_num,
          Periodo1: parseFloat(element.Periodo1),
          IDNota1: element.IDNota1,
          Periodo2: parseFloat(element.Periodo2),
          IDNota2: element.IDNota2,
          Periodo3: parseFloat(element.Periodo3),
          IDNota3:element.IDNota3,
          
        });
        console.log("sx");
      });
      this.rowData=rowDatax;
    })
  }
  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getData();
  }
  createRowData(){
    var rowData = [];
    
    console.log(this.row);
    this.row.forEach(element => {
      
      rowData.push({
        alu_dni: "Codigo Alumno",
        alumno: "Apellidos y Nombres",
        mat_num: 10,
        Periodo1: 10,
        IDNota1: 10,
        Periodo2: 10,
        IDNota2: 10,
        Periodo3: 10,
        IDNota3: 10,
        
      });
    });
    
  
  return rowData;
  }
  numberValueParser(params) {
    console.log(params.newValue);
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
      
      
     this.notas.push({
       no_id: item.IDNota1,
       cur_cod:this.idcurso,
       mat_num:'1234',
       alu_dni:'12345678',
       no_calificacion:item.Periodo1,
       no_periodo:1
     });
     this.notas.push({
       no_id: item.IDNota2,
       cur_cod:this.idcurso,
       mat_num:'1234',
       alu_dni:'12345678',
       no_calificacion:item.Periodo2,
       no_periodo:1
    });
    this.notas.push({
       no_id: item.IDNota3,
       cur_cod:this.idcurso,
       mat_num:'1234',
       alu_dni:'12345678',
       no_calificacion:item.Periodo3,
       no_periodo:1
    });
      i++;
      console.log(i);
    });
    
    console.log(JSON.stringify(this.notas));
    
    this.NotaService.updateNotas(JSON.stringify(this.notas)).subscribe((resp)=>{
     Swal.fire({
       title: 'Registro actualizado',
       text: 'Las notas se han actualizado con exito',
       icon:'success'
     })
    },
    (error)=>{
      console.log(error);
    })
     
    
  }
  restartValores(){

  }
  onCellValueChanged(event) {
    console.log('data after changes is: ', event );
     
      // rowNode.setDataValue('d', Math.floor(Math.random() * 10000));
      //  rowNode.setDataValue('e', Math.floor(Math.random() * 10000));
     if(event.data.Periodo1>20 || event.data.Periodo1<0){
      var rowNode = this.gridApi.getDisplayedRowAtIndex(event.rowIndex);
      rowNode.setDataValue('Periodo1',event.oldValue);
      console.log(rowNode);
    }
    if(event.data.Periodo2>20 || event.data.Periodo2<0){
      var rowNode = this.gridApi.getDisplayedRowAtIndex(event.rowIndex);
      rowNode.setDataValue('Periodo2',event.oldValue);
      console.log(rowNode);
    }
    if(event.data.Periodo3>20 || event.data.Periodo3<0){
      var rowNode = this.gridApi.getDisplayedRowAtIndex(event.rowIndex);
      rowNode.setDataValue('Periodo3',event.oldValue);
      console.log(rowNode);
    }
  }
}
