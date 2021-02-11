import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  RUTA_API = "http://127.0.0.1:8000/api";

  constructor(private httpClient:HttpClient) { }

  getDepartamentos(){
    return this.httpClient.get(this.RUTA_API + '/ubi_deps');
  }

  getProvincias(id){
    return this.httpClient.get(this.RUTA_API + '/ubi_provs/' + id);
  }
  getAlumnobyId(cod:string){
    return this.httpClient.get(this.RUTA_API+'/alumnos/'+cod)
  }
  getDistritos(){

  }
}
