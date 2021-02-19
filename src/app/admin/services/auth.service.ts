import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private Route="";
  
  constructor(private httpCLient:HttpClient) {

  }
  login(){
    
  }
}
