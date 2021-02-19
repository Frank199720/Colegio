import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno } from '../interface/alumno';
import { AluDomicilio } from '../interface/alu-domicilio';

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

  getDistritos(id){
    return this.httpClient.get(this.RUTA_API + '/ubi_dists/' + id);
  }

  getAlumnobyId(cod:string){
    return this.httpClient.get(this.RUTA_API+'/alumnos/'+cod);
  }
  
  index(){
    return this.httpClient.get(this.RUTA_API+'/alumnos');
  }
  
  store(alumno:Alumno){
    return this.httpClient.post(this.RUTA_API+'/alumnos', alumno);
  }

  storeDomicilio(adomicilio:AluDomicilio){
    return this.httpClient.post(this.RUTA_API+'/domicilio', adomicilio);
  }
  
  show(id){
    return this.httpClient.get(this.RUTA_API+'/alumnos/' + id);
  }

  showDomicilio(id){
    return this.httpClient.get(this.RUTA_API+'/domicilio/' + id);
  }

  update(alumno:Alumno, id){
    return this.httpClient.put(this.RUTA_API+'/alumnos/' + id, alumno);
  }

  updateDomicilio(adomicilio:AluDomicilio, id){
    return this.httpClient.put(this.RUTA_API+'/domicilio/' + id, adomicilio);
  }

  destroy(id){
    return this.httpClient.delete(this.RUTA_API+'/alumnos/' + id);
  }
}
