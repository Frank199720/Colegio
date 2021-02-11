import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  dateCurrent:Date = new Date();
  
  anio:string=this.dateCurrent.getFullYear().toString();
  constructor() { }
}
