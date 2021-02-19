import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  RUTA_API = "http://127.0.0.1:8000/api";
  constructor(private htppClient : HttpClient) { }
  getNotasByProfesor(idcurso:number,idgrado:number,idseccion){
  return this.htppClient.get(this.RUTA_API+'/listar_notas/'+idcurso+'/'+idgrado+'/'+idseccion)

  }
  updateNotas(json:string){
    return this.htppClient.post(this.RUTA_API+'/act_notas',json);
  }
}