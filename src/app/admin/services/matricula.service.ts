import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matricula } from '../interface/matricula';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  RUTA_API = "http://127.0.0.1:8000/api";
  constructor(private httpCliente:HttpClient) {
  

  }
  getMatricula(){
    return this.httpCliente.get(this.RUTA_API+'/matriculas');
  }
  save(matricula:Matricula){
    return this.httpCliente.post(this.RUTA_API+'/matriculas',matricula);
  }
  editar(matricula:Matricula){
    return this.httpCliente.put(this.RUTA_API+'/matriculas/'+matricula.mat_num,matricula);
  }
  delete(matr_cod){
    return this.httpCliente.delete(this.RUTA_API+'/matriculas/'+matr_cod)
  }
  getNiveles(){
    return this.httpCliente.get(this.RUTA_API + '/niveles');
  }
  getGradobyNivel(codNivdel:number){
    return this.httpCliente.get(this.RUTA_API + '/grados/'+codNivdel);
  }
  getSeccionByGrade(codSeccion:number){
    return this.httpCliente.get(this.RUTA_API + '/secciones/'+codSeccion);
  }
}
