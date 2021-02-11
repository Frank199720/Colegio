import { Component, OnInit } from '@angular/core';
import { Curso } from '../interface/curso';

@Component({
  selector: 'app-notas-gen',
  templateUrl: './notas-gen.component.html',
  styleUrls: ['./notas-gen.component.css']
})
export class NotasGenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  curso:Curso={
    niv_cod:null,
    cur_abreviatura:null,
    cur_descripcion:null
  };
}
