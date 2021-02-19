import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {
  RUTA_API = "http://127.0.0.1:8000/api";
  constructor( private htppClient:HttpClient) { }

  insertAsignacion(json:string){
    
    return this.htppClient.post(this.RUTA_API+'/ins_asigs',json);
  }
  getAsignacionByPersonal(id:string){
    return this.htppClient.get(this.RUTA_API+'/listar_asigs/'+id);
  }
  deleteAsignacion(id:string){
    return this.htppClient.delete(this.RUTA_API+'/elim_asigs/'+id);
  }
}
