import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {
  RUTA_API="http://127.0.0.1:8000/api";
  constructor(private httpClient:HttpClient) { }
  getDep(){
    return this.httpClient.get(this.RUTA_API+'/departamentos');
  }
}
