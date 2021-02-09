import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personal } from '../interface/personal';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  RUTA_API = "http://127.0.0.1:8000/api";
  constructor(private httpCliente:HttpClient) {

   }
  getPersonal(){
    return this.httpCliente.get(this.RUTA_API+'/personals');
  }
  save(personal:Personal){
    return this.httpCliente.post(this.RUTA_API+'/personals',personal);
  }
  editar(personal:Personal){
    return this.httpCliente.put(this.RUTA_API+'/personals/'+personal.per_dni,personal);
  }
  delete(per_Cod){
    return this.httpCliente.delete(this.RUTA_API+'/personals/'+per_Cod)
  }
}
