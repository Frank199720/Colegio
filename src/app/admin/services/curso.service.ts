import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from '../interface/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  RUTA_API = "http://127.0.0.1:8000/api";

  constructor(private httpCliente:HttpClient) { }

  getNiveles(){
    return this.httpCliente.get(this.RUTA_API + '/niveles');
  }

  index(){
    return this.httpCliente.get(this.RUTA_API + '/cursos');
  }

  store(curso:Curso){
    return this.httpCliente.post(this.RUTA_API+'/cursos', curso);
  }

  show(id){
    return this.httpCliente.get(this.RUTA_API+'/cursos/' + id);
  }

  update(curso:Curso, id){
    return this.httpCliente.put(this.RUTA_API+'/cursos/' + id, curso);
  }

  destroy(id){
    return this.httpCliente.delete(this.RUTA_API+'/cursos/' + id);
  }
}
