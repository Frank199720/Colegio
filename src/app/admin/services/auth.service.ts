import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private Route="http://127.0.0.1:8000/api";
  
  constructor(private httpCLient:HttpClient) {

  }
  login(login:string , password:string){

    return this.httpCLient.get(this.Route+'/'+login+'/'+password);
  }
  
}
